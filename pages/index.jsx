import { useContext, useEffect } from 'react';
import Layout from '../components/Layout';
import { AuthContext } from '../context/auth/AuthContext';

function Home() {
	const { getAuthUser } = useContext(AuthContext);

	useEffect(() => {
		getAuthUser();
	}, []);

	return (
		<Layout>
			<h1>Home</h1>
		</Layout>
	);
}

export default Home;
