import Head from 'next/head';
import Header from './Header';

function Layout({ children }) {
	return (
		<>
			<Head>
				<title>Comparte archivos de forma fácil y eficiente</title>
				<link
					href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css"
					rel="stylesheet"
				></link>
			</Head>
			<div className="bg-gray-100 min-h-screen pt-10">
				<div className="container mx-auto">
					{/* <Header /> */}
					<main className="sm:mt-5 md:mt-20">{children}</main>
				</div>
			</div>
		</>
	);
}

export default Layout;
