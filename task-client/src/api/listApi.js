import axios from "axios";

const URL = "https://mren-task-app.onrender.com/v1/lists/"

export function getData() {
    return new Promise((resolve) =>
      axios(URL).then((res) => resolve({ data: res.data }))
      
    );
    
  }
  export const addList = (newList) => {
    return new Promise((resolve) =>
      axios.post(URL, newList).then((res) => resolve(newList))
    );
  };

  export const delList = (id) => {
    return new Promise((resolve) =>
      axios.delete(URL + id).then((res) => resolve({ data: res.data }))
    );
  };  
  
  export const upList = (newList, id) => {
    return new Promise((resolve) =>
      axios.patch(URL+ id, newList).then((res) => resolve({ data: res.data }))
    );
    };