import apiClient from './axios';

const authToken = (token) => {
	if (token) {
		apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
	} else {
		delete apiClient.defaults.headers.common['Authorization'];
	}
};

export default authToken;
