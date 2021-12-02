import React, { useEffect } from 'react';
import Input from '../../componets/Input';
import Dropdown from 'componets/Dropdown';
import ButtonLoading from 'componets/ButtonLoading';
import { Link } from 'react-router-dom';
import { Enum_Rol } from 'utils/enums';
import useFormData from 'hooks/useFormData';
import { useMutation } from '@apollo/client';
import { REGISTRO } from 'graphql/auth/mutation';
import { useNavigate } from 'react-router';
import { useAuth } from 'context/AuthContext';

const Register = () => {
	const { setToken } = useAuth();
	const navigate = useNavigate();
	const { form, formData, updateFormData } = useFormData();
	const [
		register,
		{ data: mutationData, loading: mutationLoading, error: mutationError },
	] = useMutation(REGISTRO);

	const submitForm = (event) => {
		event.preventDefault();
		register({
			variables: formData,
		});
	};

	useEffect(() => {
		console.log(mutationData);
		if (mutationData) {
			if (mutationData.register.token) {
				setToken(mutationData.register.token);
				navigate('/');
			}
		}
	}, [mutationData]);

	return (
		<div className="flex flex-col h-full w-full items-center justify-center">
			<h1 className="text-3xl font-bold my-4">Regístrate</h1>
			<form
				className="flex flex-col"
				onSubmit={submitForm}
				onChange={updateFormData}
				ref={form}
			>
				<div className="grid grid-cols-2 gap-5">
					<Input label="Nombre:" name="nombre" type="text" required />
					<Input label="Apellido:" name="apellido" type="text" required />
					<Input
						label="Documento:"
						name="identificacion"
						type="text"
						required
					/>
					<Dropdown
						label="Rol deseado:"
						name="rol"
						required={true}
						options={Enum_Rol}
					/>
					<Input label="Correo:" name="correo" type="email" required />
					<Input label="Contraseña:" name="password" type="password" required />
				</div>
				<ButtonLoading
					disabled={Object.keys(formData).length === 0}
					loading={false}
					text="Registrarme"
				/>
			</form>
			<span>¿Ya tienes una cuenta?</span>
			<Link to="/auth/login">
				<span className="text-blue-700">Inicia sesión</span>
			</Link>
		</div>
	);
};

export { Register };
