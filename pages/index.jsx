import { useContext, useEffect, useRef } from 'react';
import Link from 'next/link';
import { AuthContext } from '../context/auth/AuthContext';
import { AppContext } from '../context/app/AppContext';
import Layout from '../components/Layout';
import Dropzone from '../components/Dropzone';
import Alert from '../components/Alert';

function Home() {
	const { getAuthUser, isAuthenticated } = useContext(AuthContext);

	const { alertMessage, url } = useContext(AppContext);

	const urlRef = useRef();

	useEffect(() => {
		const token = window.localStorage.getItem('nodesend:token');
		if (token) {
			getAuthUser();
		}
	}, []);

	const copyURL = async () => {
		const fileURL = `${process.env.CLIENT_URL}/links/${url}`;
		try {
			if (window.navigator.clipboard) {
				return await window.navigator.clipboard.writeText(fileURL);
			}
			if (urlRef.current) {
				urlRef.current.select();
				window.document.execCommand('copy');
				window.getSelection().removeAllRanges();
			}
		} catch (err) {
			console.log('Error al copiar: ', err.message);
		}
	};

	return (
		<Layout>
			<div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
				{url ? (
					<div className="px-2">
						<p className="text-center text-2xl mt-10">
							<span className="text-center font-bold text-red-700 text-3xl uppercase">
								Tu URL es:
							</span>{' '}
							<textarea
								className="mt-2 bg-transparent focus:outline-none block w-full text-center"
								ref={urlRef}
								type="url"
								value={`${process.env.CLIENT_URL}/links/${url}`}
								readOnly={true}
							/>
						</p>
						<button
							type="button"
							onClick={copyURL}
							className="bg-red-500 hover:bg-gray-900 w-full p-2 text-white cursor-pointer uppercase font-bold mt-8 sm:mt-0 text-center focus:outline-none"
						>
							Copiar enlace
						</button>
					</div>
				) : (
					<>
						{alertMessage && <Alert message={alertMessage} />}
						<div className="lg:flex md:shadow-lg p-5 bg-white rounded-lg py-10">
							<Dropzone />
							<div className="md:flex-1 mb-3 mx-2 lg:mt-0">
								<h2 className="text-4xl font-sans font-bold text-gray-800 my-4">
									Compartir archivos de forma sencilla y
									privada
								</h2>
								<p className="text-lg leading-loose">
									<span className="text-red-500 font-bold">
										NodeSend
									</span>{' '}
									te permite compartir archivos con cifrado de
									extremo a extremo
								</p>
								{!isAuthenticated && (
									<Link href="/register" as="/registro">
										<a className="text-red-500 font-bold text-lg hover:text-red-700">
											Crea una cuenta gratuita para
											compartir archivos de hasta 100 MB
										</a>
									</Link>
								)}
							</div>
						</div>
					</>
				)}
			</div>
		</Layout>
	);
}

export default Home;
