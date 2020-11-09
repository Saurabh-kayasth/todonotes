import React from 'react';
import TodoModel from '../../Data/TodoModel';

let initialState = {tasks: []};

export const TasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'get': {
      const todoModel = new TodoModel();
      const tasks = todoModel.getTasks();
      return {...state, tasks: [...tasks]};
    }
    case 'add': {
      return {...state, tasks: [...state.tasks, action.payload]};
    }
    case 'delete': {
      return {
        ...state,
        tasks: [...state.tasks.filter((item) => item.id !== action.payload)],
      };
    }
    default:
      return [...state];
  }
};
