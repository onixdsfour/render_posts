import Api from '../api/Api'

const JsonPlaceHolder =  async (path , method, obj) => {
       
    let url = `https://jsonplaceholder.typicode.com/`;     
    
    return Api(url+=`${path}`, method, obj)
    
}

export default JsonPlaceHolder;