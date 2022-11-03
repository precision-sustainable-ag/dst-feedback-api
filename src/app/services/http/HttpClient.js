const axios = require('axios');



class HttpClient {


    static post(url, data){

        return axios.post(url, data);

    }
    
}

module.exports = {
    HttpClient
}