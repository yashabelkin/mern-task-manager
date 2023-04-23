    import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getData, addTask, delTask, upTask } from "../api/taskApi";


const initialState = {
  tasks: [],
  status: 'idle',
};

export const getAsync = createAsyncThunk(
  "taskApi/getData",
  async (id) => {
    const response = await getData(id.id);
    return response.data.data;
    
  }
);

export const addTaskAsync = createAsyncThunk(
  "taskApi/addTask",
  async (newTask) => {
    const response =  await addTask(newTask);
    return response;
  });

export const deleteTaskAsync = createAsyncThunk(
  "taskApi/delTask",
  async (task) => {
    console.log(task);
    await delTask(task.id);
    return task.id;
  });
 
export const updateTaskAsync = createAsyncThunk(
  "taskApi/upList",
  async (newTask) => {
    
    let id = newTask.id
    const response = await upTask(newTask, id);
    return response;
  });  

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(getAsync.pending, (state, action) => {
      state.status = 'loading'
  }) 
    .addCase(getAsync.fulfilled, (state,action) => {
        state.tasks = action.payload
        state.status = 'success'
    }) 
    .addCase(addTaskAsync.fulfilled, (state, action) => {
      console.log(action.payload)
      state.tasks.push(action.payload);
    })
    .addCase(deleteTaskAsync.fulfilled, (state, action) => {
      console.log(action.payload)
    state.tasks = state.tasks.filter(x=> x.id !==  action.payload);
  })
  .addCase(updateTaskAsync.fulfilled, (state, action) => {
    console.log(action.payload.data.data.doc.id);
    let updatedTask = state.tasks.find(
      (task) => task.id === action.payload.data.data.doc.id
    );
    console.log(updatedTask)
    updatedTask.completed = action.payload.completed
      });
  },
});

export const selectStatus = (state) => state.task.status;
export const selectTasks = (state) => state.task.tasks;
export default taskSlice.reducer;