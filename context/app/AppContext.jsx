import { createContext, useReducer } from 'react';
import types from '../../types';
import appReducer from './appReducer';
import apiClient from '../../config/axios';

export const AppContext = createContext();

const initialState = {
	message: null,
	loading: false,
	filename: '',
	fileOriginalName: '',
	downloads: '1',
	password: '',
	user: null,
	url: '',
};

export const AppProvider = ({ children }) => {
	const [state, dispatch] = useReducer(appReducer, initialState);

	const closeAlert = () => {
		dispatch({
			type: types.UI_CLEAR_ALERT,
		});
	};

	const showAlert = (msg) => {
		dispatch({
			type: types.UI_SHOW_ALERT,
			payload: msg,
		});
		window.setTimeout(closeAlert, 3000);
	};

	const uploadFile = async (acceptedFiles) => {
		dispatch({
			type: types.UI_SET_LOADING,
			payload: true,
		});
		const file = acceptedFiles[0];
		const formData = new FormData();
		formData.append('file', file);
		try {
			const resp = await apiClient.post('/files', formData);
			dispatch({
				type: types.FILE_ON_UPLOAD_SUCCESS,
				payload: {
					filename: resp.data.file,
					fileOriginalName: file.path,
				},
			});
		} catch {
			dispatch({
				type: types.FILE_ON_UPLOAD_FAIL,
			});
		} finally {
			dispatch({
				type: types.UI_SET_LOADING,
				payload: false,
			});
		}
	};

	const createLink = async () => {
		const { downloads } = state;
		if (isNaN(+downloads) || +downloads < 1 || +downloads > 50) {
			showAlert(
				'El límite de descargas debe ser un número de entre 1 a 50'
			);
			return;
		}
		const data = {
			filename: state.filename,
			originalName: state.fileOriginalName,
			downloads: state.downloads,
			password: state.password,
		};
		try {
			const resp = await apiClient.post('/links', data);
			dispatch({
				type: types.LINK_ON_CREATE_SUCCESS,
				payload: resp.data.url,
			});
		} catch (err) {
			dispatch({
				type: types.LINK_ON_CREATE_FAIL,
				payload: err.response.data.msg,
			});
		}
	};

	const resetApp = () => {
		dispatch({
			type: types.APP_UNSET_STATE,
		});
	};

	const setPassword = (password) => {
		dispatch({
			type: types.APP_SET_PASSWORD,
			payload: password,
		});
	};

	const setDownloads = (downloads) => {
		dispatch({
			type: types.APP_SET_DOWNLOADS,
			payload: downloads,
		});
	};

	return (
		<AppContext.Provider
			value={{
				alertMessage: state.message,
				loading: state.loading,
				filename: state.filename,
				fileOriginalName: state.fileOriginalName,
				downloads: state.downloads,
				password: state.password,
				user: state.user,
				url: state.url,
				showAlert,
				uploadFile,
				createLink,
				resetApp,
				setPassword,
				setDownloads,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};
