import axios from "axios"; 

const AxiosInstance = axios.create({
  baseURL : "http://127.0.0.1:8080/" ,
  headers: {
//  Authorization: `<Your Auth Token>`,
   " Content-Type": "application/json",
    
  }, 

});

export default AxiosInstance;