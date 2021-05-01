const types = {
	AUTH_ON_REGISTER_SUCCESS: '[Auth] Register completed successfully',
	AUTH_ON_REGISTER_FAIL: '[Auth] Register failed',
	AUTH_ON_LOGIN_SUCCESS: '[Auth] Login completed successfully',
	AUTH_ON_LOGIN_FAIL: '[Auth] Login failed',
	AUTH_SET_USER: '[Auth] Set the authenticated user ',
	AUTH_LOGOUT: '[Auth] Log out the session',
	UI_SHOW_ALERT: '[UI] Show an alert',
	UI_CLEAR_ALERT: '[UI] Clear alerts',
	UI_SET_LOADING: '[UI] Set the loading value',
	FILE_ON_UPLOAD_SUCCESS: '[File] File uploaded successfully',
	FILE_ON_UPLOAD_FAIL: '[File] File upload failed',
	LINK_ON_CREATE_SUCCESS: '[Link] Link created successfully',
	LINK_ON_CREATE_FAIL: '[Link] Link create failed',
	APP_UNSET_STATE: '[App] Unset the state to the initial value',
	APP_SET_PASSWORD: '[App] Set the password of a file',
	APP_SET_DOWNLOADS: '[App] Set the number of downloads allowed per file',
};

export default types;
