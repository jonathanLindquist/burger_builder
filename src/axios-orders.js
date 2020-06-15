import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://burger-builder-backend-159db.firebaseio.com/'
});

export default instance;