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
