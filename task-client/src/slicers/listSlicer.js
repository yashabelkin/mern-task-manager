import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getData, addList, delList, upList } from "../api/listApi";


const initialState = {
  lists: [],
  status: 'idle',

};

export const getAsync = createAsyncThunk(
  "listApi/getData",
  async () => {
    const response = await getData();
    return response.data.data;
    
  }
);

export const addListAsync = createAsyncThunk(
  "listApi/addList",
  async (newList) => {
    console.log(newList)
    const response =  await addList(newList);
    
    return response;
  });

export const deleteListAsync = createAsyncThunk(
  "listApi/delList",
  async (list) => {
    console.log(list);
    await delList(list.id);
    return list.id;
  });
 
export const updateListAsync = createAsyncThunk(
  "listApi/upList",
  async (newList) => {
    let newBody = {
      name: newList.name,
    };   
    let id = newList.id
    const response = await upList(newBody, id);
    return response;
  });  

export const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(getAsync.pending, (state,action) => {
      state.status = 'loading'
  }) 
    .addCase(getAsync.fulfilled, (state,action) => {
        state.lists = action.payload
        state.status = 'succeeded'
    }) 
    .addCase(addListAsync.fulfilled, (state, action) => {
      console.log(action.payload)
      state.lists.push(action.payload);
    })
    .addCase(deleteListAsync.fulfilled, (state, action) => {
      console.log(action.payload)
    state.lists = state.lists.filter(x=> x.id !==  action.payload);
  })
  .addCase(updateListAsync.fulfilled, (state, action) => {
    console.log(action.payload);
    let updatedList = state.lists.find(
      (list) => list.id === action.payload.id
    );
    updatedList.name = action.payload.name
      });
  },
});

export const selectStatus = (state) => state.list.status;
export const selectLists = (state) => state.list.lists;
export default listSlice.reducer;