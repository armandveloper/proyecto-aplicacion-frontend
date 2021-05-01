import { useContext } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { AuthContext } from '../context/auth/AuthContext';
import { AppContext } from '../context/app/AppContext';

function Header() {
	const { user, isAuthenticated, logout } = useContext(AuthContext);
	const { resetApp } = useContext(AppContext);

	const router = useRouter();

	return (
		<header className="py-8 flex flex-col md:flex-row items-center justify-between">
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
			<div>
				{isAuthenticated ? (
					<div className="flex items-center ">
						<p>Bienvenido: {user?.name}</p>
						<button
							onClick={logout}
							className="bg-black px-5 py-3 rounded-lg text-white font-bold uppercase ml-2"
							type="button"
						>
							Cerrar sesión
						</button>
					</div>
				) : (
					<>
						<Link href="/login">
							<a className="bg-red-500 px-5 py-3 rounded-lg text-white font-bold uppercase mr-2">
								Iniciar sesión
							</a>
						</Link>
						<Link href="/register" as="/registro">
							<a className="bg-black px-5 py-3 rounded-lg text-white font-bold uppercase">
								Registrarse
							</a>
						</Link>
					</>
				)}
			</div>
		</header>
	);
}

export default Header;
