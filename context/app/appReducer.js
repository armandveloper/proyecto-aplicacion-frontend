import types from '../../types';

const appReducer = (state, action) => {
	switch (action.type) {
		case types.UI_SHOW_ALERT:
			return { ...state, message: action.payload };
		case types.UI_CLEAR_ALERT:
			return { ...state, message: null };
		case types.UI_SET_LOADING:
			return { ...state, loading: action.payload };
		case types.FILE_ON_UPLOAD_SUCCESS:
			return { ...state, ...action.payload };
		case types.FILE_ON_UPLOAD_FAIL:
			return {
				...state,
				message:
					'Ocurrió un error al subir el archivo. Intente de nuevo',
			};
		case types.LINK_ON_CREATE_SUCCESS:
			return { ...state, url: action.payload };
		case types.APP_SET_PASSWORD:
			return { ...state, password: action.payload };
		case types.APP_SET_DOWNLOADS:
			return { ...state, downloads: action.payload };
		case types.APP_UNSET_STATE:
			return {
				...state,
				message: null,
				loading: false,
				filename: '',
				fileOriginalName: '',
				downloads: 1,
				password: null,
				user: null,
				url: '',
			};
		default:
			return state;
	}
};

export default appReducer;
