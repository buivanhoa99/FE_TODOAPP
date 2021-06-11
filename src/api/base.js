import axios from 'axios'
const axiosClient = axios.create({
  baseURL : "https://localhost:44310/api",

  timeout: 3000,
  headers : {
    'content-type' : "application/json-patch+json"
  },
})
  axiosClient.interceptors.request.use(async (config)=>{
    return config;
  })

  axiosClient.interceptors.response.use((response)=>{
    if (response && response.data){
      return response.data
    }
    return response;
  },err=>{
    return Promise.reject(err.response);
  })

  export default axiosClient;
