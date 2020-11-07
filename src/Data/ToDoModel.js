import {Component} from 'react';
import {DialogTitle} from 'react-native-paper/lib/typescript/src/components/Dialog/DialogTitle';

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
    subTodos: {type: 'list', objectType: 'SUBTODO'},
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

// const SettingSchema = {
//   name: 'WPCSettings',
//   properties: {
//     lazyLoad: 'string',
//   },
// };

export default class DataModel extends Component {
  constructor(props) {
    super(props);
    Realm.open();

    // Realm.deleteFile();
  }
  // Add New Folder
  addTask(taskObj, subTaskObj) {
    let realm = new Realm({schema: [TaskSchema, SubTaskSchema]});
    realm.write(() => {
      realm.create('TODO', taskObj, true);
    });
    this.addSubTask(taskObj.taskId, subTaskObj);
  }

  // Add New File
  addSubTask(taskId, subTaskObj) {
    console.log(subTaskObj);
    let realm = new Realm({schema: [TaskSchema, SubTaskSchema]});
    subTaskObj.taskId = taskId;
    realm.write(() => {
      realm.create('SUBTODO', subTaskObj, true);
    });
  }

  // get only folders
  getTasks() {
    let realm = new Realm({schema: [TaskSchema, SubTaskSchema]});
    const folders = realm.objects('TODO');
    return folders;
  }

  // get files only for given folder id
  getSubTasksWithTaskId(folderId) {
    let realm = new Realm({schema: [TaskSchema, SubTaskSchema]});
    const files = realm.objects('SUBTASK').filtered('taskId = $0', folderId);
    return files;
  }

  // number of files inside folder
  getNumberOfFilesFromFolderId(folderId) {
    let realm = new Realm({schema: [TaskSchema, SubTaskSchema]});
    const files = realm.objects('SUBTASK').filtered('taskId = $0', folderId);
    return files.length;
  }

  // delete folder and files inside it
  deleteTaskWithId(folderId) {
    console.log('FOLDER ID ================== ', folderId);
    let realm = new Realm({schema: [TaskSchema, SubTaskSchema]});
    realm.write(() => {
      const folder = realm.objects('TASK').filtered('id == $0', folderId);
      const files = realm.objects('SUBTASK').filtered('taskId == $0', folderId);
      realm.delete(folder);
      realm.delete(files);
    });
  }

  // change main task status
  changeMainTaskStatusWithId(taskId, status) {
    let realm = new Realm({schema: [TaskSchema, SubTaskSchema]});
    realm.write(() => {
      const file = realm.objects('TASK').filtered('id == $0', taskId);
      file.isDone = status;
    });
    this.changeAllSubTaskStatusWithId(taskId, status);
  }

  // change All subtask status
  changeAllSubTaskStatusWithId(subTaskId, status) {
    let realm = new Realm({schema: [TaskSchema, SubTaskSchema]});
    realm.write(() => {
      const file = realm.objects('SUBTASK').filtered('taskId == $0', subTaskId);
      file.isDone = status;
    });
  }

  // change subtask status
  changeSubTaskStatusWithId(subTaskId, status) {
    let realm = new Realm({schema: [TaskSchema, SubTaskSchema]});
    realm.write(() => {
      const file = realm.objects('SUBTASK').filtered('id == $0', subTaskId);
      file.isDone = status;
    });
  }
}
