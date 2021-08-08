import { useContext, useRef } from 'react';
import Link from 'next/link';
import { AppContext } from '../context/app/AppContext';
import Layout from '../components/Layout';
import Dropzone from '../components/Dropzone';
import Alert from '../components/Alert';

function Home() {
	const { alertMessage, url } = useContext(AppContext);

	const urlRef = useRef();

	const copyURL = async () => {
		const fileURL = `${window.location.origin}/links/${url}`;
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
								value={`${window.location.origin}/links/${url}`}
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
								<h2 className="text-3xl font-sans font-bold text-gray-800 my-4">
									Compartir archivos de forma sencilla y
									eficiente
								</h2>
								<p className="text-lg leading-loose">
									<span className="text-red-500 font-bold">
										Comparte
									</span>{' '}
									tus recursos y/o material de clase de manera
									más ágil y eficaz
								</p>
							</div>
						</div>
					</>
				)}
			</div>
		</Layout>
	);
}

export default Home;
