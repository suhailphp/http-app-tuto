import axios from "axios";

axios.interceptors.response.use(null,error=>{
  const expecedError = error.response && error.response.status >= 400 && error.response.status < 500;
  console.log(expecedError)
  if(!expecedError){
    alert('An unexpected error occured!')
    console.log('Error Logging:',error)
  }
  return Promise.reject(error)
})

export default{
    get:axios.get,
    delete:axios.delete,
    put:axios.put,
    post:axios.post,
}