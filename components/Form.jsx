import { useContext } from 'react';
import { AppContext } from '../context/app/AppContext';

function Form() {
	const { downloads, setDownloads } = useContext(AppContext);

	return (
		<div className="w-full mt-14">
			<div>
				<label htmlFor="adownloads" className="text-lg text-gray-800">
					Establezca la cantidad máxima de descargas permitidas
				</label>
				<input
					onChange={({ target }) => setDownloads(target.value)}
					value={downloads}
					name="downloads"
					id="adownloads"
					min="1"
					max="50"
					type="number"
					className="appearance-none w-full mt-2 bg-white border border-gray-400 text-black py-3 px-4 pr-8 rounded leading-none focus:outline-none focus:ring-2 focus:ring-purple-600"
				/>
			</div>
		</div>
	);
}

export default Form;
