import { AppProvider } from '../context/app/AppContext';

function MyApp({ Component, pageProps }) {
	return (
			<AppProvider>
				<Component {...pageProps} />
			</AppProvider>
	);
}

export default MyApp;
