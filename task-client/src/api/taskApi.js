import axios from "axios";

const GETURL = "https://mren-task-app.onrender.com/api/v1/lists/"
const URL = "https://mren-task-app.onrender.com/api/v1/tasks/"



export function getData(id) {
    return new Promise((resolve) =>
      axios(GETURL+id+"/tasks").then((res) => resolve({ data: res.data }))
      
    );
    
  }
  export const addTask = (newTask) => {
    return new Promise((resolve) =>
      axios.post(URL, newTask).then((res) => resolve(newTask))
    );
  };

  export const delTask = (id) => {
    return new Promise((resolve) =>
      axios.delete(URL + id).then((res) => resolve({ data: res.data }))
    );
  };  
  
  export const upTask = (newTask, id) => {
    return new Promise((resolve) =>
      axios.patch(URL+ id, newTask).then((res) => resolve({ data: res.data }))
    );
    };