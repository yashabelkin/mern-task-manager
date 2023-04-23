import { configureStore } from '@reduxjs/toolkit';
import listReducer from './slicers/listSlicer'
import modalReducer from './slicers/modalSlicer'
import taskReducer from './slicers/taskSlicer'

export const store = configureStore({
  reducer: {
    list:listReducer,
    task:taskReducer,
    modal:modalReducer
  },
});
