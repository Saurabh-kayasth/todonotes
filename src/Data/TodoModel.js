import {Component} from 'react';
// import {DialogTitle} from 'react-native-paper/lib/typescript/src/components/Dialog/DialogTitle';

const Realm = require('realm');

// Define your models and their properties
// const FolderSchema = {};
const TaskSchema = {
  name: 'TASK',
  primaryKey: 'id',
  properties: {
    id: 'int',
    taskName: 'string',
    dateTime: 'date',
    isDone: 'int',
    description: 'string',
    subTodos: {type: 'list', objectType: 'SUBTASK'},
  },
};

const SubTaskSchema = {
  name: 'SUBTASK',
  primaryKey: 'id',
  properties: {
    id: 'int',
    taskId: 'int',
    subTaskName: 'string',
    dateTime: 'date',
    isDone: 'int',
  },
};

const NotesSchema = {
  name: 'NOTES',
  primaryKey: 'id',
  properties: {
    id: 'int',
    noteName: 'string',
    dateTime: 'date',
    isFav: 'int',
    description: 'string',
  },
};

// const SettingSchema = {
//   name: 'WPCSettings',
//   properties: {
//     lazyLoad: 'string',
//   },
// };

export default class TodoModel extends Component {
  constructor(props) {
    super(props);
    Realm.open();

    // Realm.deleteFile();
  }
  // Add New Folder
  addTask(taskObj) {
    let realm = new Realm({schema: [TaskSchema, SubTaskSchema, NotesSchema]});
    // taskObj.id = new Date().getTime();
    console.log('===========main===============');
    console.log(taskObj);
    realm.write(() => {
      realm.create('TASK', taskObj, true);
    });
    // this.addSubTask(taskObj.id, subTaskObj);
  }

  // Add New File
  addSubTask(taskId, subTaskObj) {
    let realm = new Realm({schema: [TaskSchema, SubTaskSchema, NotesSchema]});
    for (let i = 0; i < subTaskObj.length; i++) {
      subTaskObj[i].taskId = taskId;
      realm.write(() => {
        realm.create('SUBTASK', subTaskObj[i], true);
      });
    }
    console.log('===========sub===============');
    console.log(subTaskObj);

    console.log('success');
  }

  // get only folders
  getTasks() {
    let realm = new Realm({schema: [TaskSchema, SubTaskSchema, NotesSchema]});
    const folders = realm.objects('TASK');
    return folders;
  }

  // get files only for given folder id
  getSubTasksWithTaskId(folderId) {
    let realm = new Realm({schema: [TaskSchema, SubTaskSchema, NotesSchema]});
    const files = realm.objects('SUBTASK').filtered('taskId = $0', folderId);
    return files;
  }

  // number of files inside folder
  getNumberOfSubTasksFromTaskId(folderId) {
    let realm = new Realm({schema: [TaskSchema, SubTaskSchema, NotesSchema]});
    const tasks = realm.objects('SUBTASK').filtered('taskId = $0', folderId);
    const doneTasks = realm
      .objects('SUBTASK')
      .filtered('taskId = $0 AND isDone = $1', folderId, 1);
    return [tasks.length, doneTasks.length];
  }

  // delete folder and files inside it
  deleteTaskWithId(folderId) {
    console.log('FOLDER ID ================== ', folderId);
    let realm = new Realm({schema: [TaskSchema, SubTaskSchema, NotesSchema]});
    realm.write(() => {
      const folder = realm.objects('TASK').filtered('id == $0', folderId);
      const files = realm.objects('SUBTASK').filtered('taskId == $0', folderId);
      realm.delete(folder);
      realm.delete(files);
    });
  }

  changeOnlyMainTaskStatusWithId(taskId, status) {
    let realm = new Realm({schema: [TaskSchema, SubTaskSchema, NotesSchema]});
    const file = realm.objects('TASK').filtered('id == $0', taskId);
    realm.write(() => {
      file[0].isDone = status;
    });
  }

  // change main task status
  changeMainTaskStatusWithId(taskId, status) {
    let realm = new Realm({schema: [TaskSchema, SubTaskSchema, NotesSchema]});
    const file = realm.objects('TASK').filtered('id == $0', taskId);
    realm.write(() => {
      file[0].isDone = status;
    });
    this.changeAllSubTaskStatusWithId(taskId, status);
  }

  // change All subtask status
  changeAllSubTaskStatusWithId(subTaskId, status) {
    let realm = new Realm({schema: [TaskSchema, SubTaskSchema, NotesSchema]});
    const file = realm.objects('SUBTASK').filtered('taskId == $0', subTaskId);
    realm.write(() => {
      for (let i = 0; i < file.length; i++) {
        file[i].isDone = status;
      }
    });
  }

  // change subtask status
  changeSubTaskStatusWithId(subTaskId, status) {
    let realm = new Realm({schema: [TaskSchema, SubTaskSchema, NotesSchema]});
    const file = realm.objects('SUBTASK').filtered('id == $0', subTaskId);
    realm.write(() => {
      file[0].isDone = status;
    });
  }

  //NOTES APP
  // Add notes
  addNotes(noteObj) {
    let realm = new Realm({schema: [TaskSchema, SubTaskSchema, NotesSchema]});
    realm.write(() => {
      realm.create('NOTES', noteObj, true);
    });
  }

  //getNotes
  getNotes() {
    let realm = new Realm({schema: [TaskSchema, SubTaskSchema, NotesSchema]});
    const notes = realm.objects('NOTES');
    return notes;
  }

  // Delete notes with id list
  deleteNotes(idList) {
    let realm = new Realm({schema: [TaskSchema, SubTaskSchema, NotesSchema]});
    realm.write(() => {
      for (let i = 0; i < idList.length; i++) {
        const note = realm.objects('NOTES').filtered('id == $0', idList[i]);
        realm.delete(note);
      }
    });
  }

  //updateNotes
  updateNotes(noteObj) {
    console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>');
  }

  // Save notes as favourites
  saveFavNotes(idList, status) {
    let realm = new Realm({schema: [TaskSchema, SubTaskSchema, NotesSchema]});
    realm.write(() => {
      for (let i = 0; i < idList.length; i++) {
        const note = realm.objects('NOTES').filtered('id == $0', idList[i]);
        note[0].isFav = status;
      }
    });
  }
}
