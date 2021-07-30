import { useCallback, useContext } from 'react';
import { useDropzone } from 'react-dropzone';
import { AppContext } from '../context/app/AppContext';
import Form from './Form';

function Dropzone() {
	const { loading, showAlert, uploadFile, createLink } = useContext(
		AppContext
	);


	const onDropRejected = () => {
		const text = 'El límite es de hasta 50 MB';
		showAlert(text);
	};

	const onDropAccepted = useCallback(uploadFile, []);

	const {
		getRootProps,
		getInputProps,
		isDragActive,
		acceptedFiles,
	} = useDropzone({
		onDropAccepted,
		onDropRejected,
		maxSize: 1024 * 1024 * 50,
	});

	const fileList = acceptedFiles.map((file) => (
		<li
			key={file.lastModified}
			className="bg-white flex-1 p-3 mb-4 shadow-lg rounded"
		>
			<p className="font-bold text-xl">{file.path}</p>
			<p className="text-sm text-gray-500">
				{(file.size / 1024 / 1024).toFixed(2)} MB
			</p>
		</li>
	));

	return (
		<div className="md:flex-1 mb-3 mx-2 flex flex-col items-center justify-center border-dashed border-gray-300 border-2 bg-gray-100 px-4">
			{acceptedFiles.length > 0 ? (
				<div className="mt-10 w-full">
					<h4 className="text-2xl font-bold text-center mb-4">
						Archivos
					</h4>
					<ul>{fileList}</ul>
					<Form />
					{loading ? (
						<p className="my-10 text-center text-gray-600">
							Subiendo Archivo...
						</p>
					) : (
						<button
							type="button"
							className="bg-blue-700 w-full py-3 rounded-lg text-white my-10 hover:bg-blue-800"
							onClick={createLink}
						>
							Crear enlace
						</button>
					)}
				</div>
			) : (
				<div {...getRootProps()} className="dropzone w-full py-32">
					<input {...getInputProps()} className="h-100 " />
					<div className="text-center">
						{isDragActive ? (
							<p className="text-2xl text-gray-600">
								Suelta el archivo
							</p>
						) : (
							<>
								<p className="text-2xl text-gray-600">
									Selecciona un archivo y arrástralo aquí
								</p>
								<button
									type="button"
									className="bg-blue-700 w-full py-3 rounded-lg text-white my-10 hover:bg-blue-800"
								>
									Selecciona un archivo para subir
								</button>
							</>
						)}
					</div>
				</div>
			)}
		</div>
	);
}

export default Dropzone;
