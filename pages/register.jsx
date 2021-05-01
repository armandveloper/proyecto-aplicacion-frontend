import { useFormik } from 'formik';
import Layout from '../components/Layout';
import * as Yup from 'yup';
import { useContext } from 'react';
import { AuthContext } from '../context/auth/AuthContext';
import Alert from '../components/Alert';

const RegisterSchema = Yup.object().shape({
	name: Yup.string().required('El nombre es obligatorio'),
	email: Yup.string()
		.email('El email no es válido')
		.required('El email es obligatorio'),
	password: Yup.string()
		.min(8, 'La contraseña debe tener al menos 8 carácteres')
		.required('La contraseña es obligatoria'),
});

function Register() {
	const { register, message } = useContext(AuthContext);

	const formik = useFormik({
		initialValues: {
			name: '',
			email: '',
			password: '',
		},
		validationSchema: RegisterSchema,
		onSubmit: register,
	});

	const { name, email, password } = formik.values;

	return (
		<Layout>
			<div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
				<h2 className="text-4xl font-sans font-bold text-gray-800 text-center my-4">
					Registrarse
				</h2>
				{message && <Alert message={message} />}
				<div className="flex justify-center mt-5">
					<div className="w-full max-w-lg">
						<form
							className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
							onSubmit={formik.handleSubmit}
						>
							<div className="mb-4">
								<label
									className="block text-black text-sm font-bold mb-2"
									htmlFor="name"
								>
									Nombre
								</label>
								<input
									className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring"
									type="text"
									id="name"
									name="name"
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={name}
								/>
								{formik.errors.name && formik.touched.name && (
									<div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4">
										<p className="font-bold">Error</p>
										<p>{formik.errors.name}</p>
									</div>
								)}
							</div>

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
								value="Registrarse"
								className="bg-red-500 hover:bg-gray-900 w-full p-2 text-white uppercase font-bold"
							/>
						</form>
					</div>
				</div>
			</div>
		</Layout>
	);
}

export default Register;
