import { useContext } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { AppContext } from '../context/app/AppContext';

function Header() {
	const { resetApp } = useContext(AppContext);

	const router = useRouter();

	return (
		<header className="py-8 flex flex-col md:flex-row items-center justify-center">
			<img
				onClick={() => {
					resetApp();
					router.push('/');
				}}
				width={256}
				height={48}
				src="/logo.svg"
				alt="NodeSend Logo"
				className="w-64 mb-8 md:mb-0 cursor-pointer"
			/>
		</header>
	);
}

export default Header;
