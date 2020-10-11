import axios from 'axios';

const eaBaseUrl = `http://localhost:3000/api`;

const eaApi = axios.create({
    baseURL: eaBaseUrl,
  });

const api = {
    register: (document: string, dateString: string) => {
        return eaApi.post('/register', {
            id: document,
            dob: dateString
          })
    }
}

export default api;