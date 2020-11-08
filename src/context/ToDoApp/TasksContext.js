import React from 'react';
// import DataModel from '../../Data/DataModel';
import TodoModel from '../../Data/TodoModel';
// export const Context = createContext();

let initialState = {tasks: []};

export const TasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'get': {
      const todoModel = new TodoModel();
      const tasks = todoModel.getTasks();
      console.log('get folders .....', tasks);
      return {...state, tasks: [...tasks]};
    }
    case 'add': {
      console.log('adding folder..............', action.payload);
      // action.payload.id = state.folders.length + 1;
      return {...state, tasks: [...state.tasks, action.payload]};
    }
    case 'update': {
      // console.log('update folder..............', action.payload);
      // action.payload.id = state.folders.length + 1;
      console.log('+++++++++++++++++++++++++');
      const index = state.tasks.findIndex(
        (todo) => todo.id === action.payload.id,
      );
      const newArray = [...state.tasks];
      // console.log(newArray[index]);
      newArray[index].isDone = action.payload.isDone;
      // const tt = {
      //   ...state,
      //   tasks: state.tasks.map((item) =>
      //     item.id === action.payload.id
      //       ? {...state, isDone: action.payload.isDone}
      //       : {...state.tasks},
      //   ),
      // };
      // task.id === action.payload.id
      //   ? {...task, isDone: action.payload.isDone}
      //   : task,

      // let temp = [...state.tasks];
      // for (let i = 0; i < temp.length; i++) {
      //   if (temp[i].id === action.payload.id) {
      //     temp[i].isDone = action.payload.isDone;
      //   }
      // }
      // console.log(newArray);
      return {
        ...state, //copying the orignal state
        tasks: newArray, //reassingning todos to new array
      };
      // {
      //   ...state,
      //   tasks: [
      //     ...state.tasks,
      //     {
      //       ...state.tasks[action.payload.id],
      //       isDone: action.payload.isDone,
      //     },
      //   ],
      // };
    }
    case 'delete': {
      console.log('in action ', action.payload);
      return {
        ...state,
        tasks: [...state.tasks.filter((item) => item.id !== action.payload)],
      };
    }
    default:
      return [...state];
  }
};
