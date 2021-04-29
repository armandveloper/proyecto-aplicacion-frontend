import { createContext, useReducer } from 'react';
import apiClient from '../../config/axios';
import authToken from '../../config/auth';
import types from '../../types';
import authReducer from './authReducer';

export const AuthContext = createContext();

const initialState = {
	token:
		typeof window !== 'undefined'
			? window.localStorage.getItem('nodesend:token') || null
			: null,
	isAuthenticated: false,
	user: null,
	message: null,
};

export const AuthProvider = ({ children }) => {
	const [state, dispatch] = useReducer(authReducer, initialState);

	const register = async (data) => {
		try {
			const resp = await apiClient.post('/users', data);
			dispatch({
				type: types.AUTH_ON_REGISTER_SUCCESS,
				payload: resp.data.msg,
			});
		} catch (err) {
			dispatch({
				type: types.AUTH_ON_REGISTER_FAIL,
				payload: err.response.data.msg,
			});
		}
	};

	const login = async (data) => {
		try {
			const resp = await apiClient.post('/auth', data);
			const { token } = resp.data;
			window.localStorage.setItem('nodesend:token', token);
			dispatch({
				type: types.AUTH_ON_LOGIN_SUCCESS,
				payload: token,
			});
		} catch (err) {
			dispatch({
				type: types.AUTH_ON_LOGIN_FAIL,
				payload: err.response.data.msg,
			});
		}
	};

	const getAuthUser = async () => {
		try {
			const token = window.localStorage.getItem('nodesend:token');
			if (token) {
				authToken(token);
			}
			const resp = await apiClient.get('/auth');
			dispatch({
				type: types.AUTH_SET_USER,
				payload: resp.data.user || null,
			});
		} catch (err) {
			console.log(err);
			dispatch({
				type: types.AUTH_ON_LOGIN_FAIL,
				payload: 'Ocurrió un error inesperado',
			});
		}
	};

	const logout = () => {
		localStorage.removeItem('nodesend:token');
		dispatch({
			type: types.AUTH_LOGOUT,
		});
	};

	return (
		<AuthContext.Provider
			value={{
				isAuthenticated: state.isAuthenticated,
				user: state.user,
				message: state.message,
				dispatch,
				register,
				login,
				getAuthUser,
				logout,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
