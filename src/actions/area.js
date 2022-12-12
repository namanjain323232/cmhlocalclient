import axios from "axios";
const ROOT_URL = 'http://localhost:5000';

export const addArea =  async ( authtoken) =>  {
    const res = await axios.get(`${ROOT_URL}/api/areas`, 
    {headers: {authtoken}});   
    // history.push("/admin/categories/arealist");
  };

  export const fetchAreas =  async () =>  {
    return await axios.get(`${ROOT_URL}/api/areas/list`);     
   };

   export const fetchCities= async () =>  {
     return await axios.get(`${ROOT_URL}/api/areas/listcities`);
   }

   export const fetchCounties= async (city) => {
     console.log(city);
     const res=  await axios.get(`${ROOT_URL}/api/areas/listcounties/${city}`);
     console.log("IN fetch county",res);
     return res;
   }