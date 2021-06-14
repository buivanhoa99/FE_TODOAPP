import axiosClient from './base'
const baseURL = "/TodoItems";
 const cityApi = {
    GetAllItems :  ()=>{
        const url = baseURL;
        return axiosClient.get(url);
    },
    AddItem :  (data)=>{
        const url = baseURL;
        return axiosClient.post(url,data);
    },
    DeleteItem : id =>{
        const url = baseURL+"/"+id;
        return axiosClient.delete(url);
    },
    ChangeStatusItem : (data)=>{
        const url = baseURL+ "/status";
        return axiosClient.patch(url,data);
    }



}
export default cityApi;
