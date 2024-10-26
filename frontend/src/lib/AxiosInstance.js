import axios from "axios"; 

const AxiosInstance = axios.create({
  baseURL : process.env.NEXT_BASE_URL ,
  headers: {
//  Authorization: `<Your Auth Token>`,
   " Content-Type": "application/json",
    
  }, 

});

export default AxiosInstance;