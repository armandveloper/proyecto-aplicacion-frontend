import types from '../../types';

const authReducer = (state, action) => {
	switch (action.type) {
		case types.AUTH_ON_REGISTER_SUCCESS:
			return { ...state, message: action.payload };
		case types.AUTH_ON_REGISTER_FAIL:
			return { ...state, message: action.payload };
		case types.AUTH_ON_LOGIN_SUCCESS:
			return { ...state, token: action.payload, isAuthenticated: true };
		case types.AUTH_ON_LOGIN_FAIL:
			return { ...state, message: action.payload };
		case types.AUTH_SET_USER:
			return {
				...state,
				user: action.payload,
				isAuthenticated: action.payload !== null,
			};
		case types.AUTH_LOGOUT:
			return {
				token: null,
				isAuthenticated: false,
				user: null,
				message: null,
			};
		case types.UI_CLEAR_ALERT:
			return { ...state, message: null };
		default:
			return state;
	}
};

export default authReducer;
