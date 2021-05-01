import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/app/AppContext';

function Form() {
	const [hasPassword, setHasPassword] = useState(false);

	const { downloads, password, setDownloads, setPassword } = useContext(
		AppContext
	);

	useEffect(() => {
		if (!hasPassword) {
			setPassword('');
		}
	}, [hasPassword]);

	return (
		<div className="w-full mt-20">
			<div>
				<label htmlFor="downloads" className="text-lg text-gray-800">
					Eliminar después de
				</label>
				<select
					onChange={({ target }) => setDownloads(+target.value)}
					value={downloads}
					name="downloads"
					id="downloads"
					className="appearance-none w-full mt-2 bg-white border border-gray-400 text-black py-3 px-4 pr-8 rounded leading-none focus:outline-none focus:border-gray-500"
				>
					<option value="1">1 Descarga</option>
					<option value="5">5 Descargas</option>
					<option value="10">10 Descargas</option>
					<option value="20">20 Descargas</option>
				</select>
			</div>
			<div className="mt-4">
				<div className="flex justify-between items-center">
					<label
						htmlFor="ena-password"
						className="text-lg text-gray-800 mr-2"
					>
						Proteger con Contraseña
					</label>
					<input
						onChange={({ target }) =>
							setHasPassword(target.checked)
						}
						checked={hasPassword}
						type="checkbox"
						id="ena-password"
					/>
				</div>
				{hasPassword && (
					<input
						value={password}
						onChange={({ target }) => setPassword(target.value)}
						type="password"
						name="password"
						id="password"
						className="appearance-none w-full mt-2 bg-white border border-gray-400 text-black py-3 px-4 pr-8 rounded leading-none focus:outline-none focus:border-gray-500"
						placeholder="Escribe una contraseña"
						aria-label="Escribe una contraseña"
					/>
				)}
			</div>
		</div>
	);
}

export default Form;
