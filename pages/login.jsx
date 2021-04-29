import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AuthContext } from '../context/auth/AuthContext';
import Layout from '../components/Layout';
import Alert from '../components/Alert';

const LoginSchema = Yup.object().shape({
	email: Yup.string()
		.email('El email no es válido')
		.required('El email es obligatorio'),
	password: Yup.string().required('La contraseña es obligatoria'),
});

function Login() {
	const { login, isAuthenticated, message } = useContext(AuthContext);

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		validationSchema: LoginSchema,
		onSubmit: login,
	});

	const { email, password } = formik.values;

	const router = useRouter();

	useEffect(() => {
		if (isAuthenticated) {
			router.push('/');
		}
	}, [isAuthenticated]);

	return (
		<Layout>
			<div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
				<h2 className="text-4xl font-sans font-bold text-gray-800 text-center my-4">
					Iniciar sesión
				</h2>
				{message && <Alert />}
				<div className="flex justify-center mt-5">
					<div className="w-full max-w-lg">
						<form
							className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
							onSubmit={formik.handleSubmit}
						>
							<div className="mb-4">
								<label
									className="block text-black text-sm font-bold mb-2"
									htmlFor="email"
								>
									Email
								</label>
								<input
									className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring"
									type="email"
									id="email"
									name="email"
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={email}
								/>
								{formik.errors.email && formik.touched.email && (
									<div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4">
										<p className="font-bold">Error</p>
										<p>{formik.errors.email}</p>
									</div>
								)}
							</div>
							<div className="mb-4">
								<label
									className="block text-black text-sm font-bold mb-2"
									htmlFor="password"
								>
									Contraseña
								</label>
								<input
									className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring"
									type="password"
									id="password"
									name="password"
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={password}
								/>
								{formik.errors.password &&
									formik.touched.password && (
										<div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4">
											<p className="font-bold">Error</p>
											<p>{formik.errors.password}</p>
										</div>
									)}
							</div>
							<input
								type="submit"
								value="Iniciar sesión"
								className="bg-red-500 hover:bg-gray-900 w-full p-2 text-white uppercase font-bold"
							/>
						</form>
					</div>
				</div>
			</div>
		</Layout>
	);
}

export default Login;
