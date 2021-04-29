import Link from 'next/link';
import { useContext } from 'react';
import { AuthContext } from '../context/auth/AuthContext';

function Header() {
	const { user, isAuthenticated, logout } = useContext(AuthContext);

	return (
		<header className="py-8 flex flex-col md:flex-row items-center justify-between">
			<Link href="/">
				<img
					width={256}
					height={48}
					src="/logo.svg"
					alt="NodeSend Logo"
					className="w-64 mb-8 md:mb-0"
				/>
			</Link>
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
