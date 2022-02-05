import axios from 'axios'
export default{
    async asyncFunc()
    {
        return await axios.get('api/me')
            .then(response => {
                if(response.data.api_status == 200)
                {
                    return {
                        'status' : true,
                        'message' : response.data.message
                    }
                    console.log(status)
                    resolve(response)
                }
                else if(response.data.api_status == 401){
                    return {
                        'status' : false,
                        'message' : response.data.message
                    }
                    resolve(response)
                }

            })
            .catch(error => {
                console.log(error.response.data)
            })
    }
};
