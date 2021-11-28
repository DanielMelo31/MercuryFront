import { useMutation, useQuery } from '@apollo/client';
import { GET_USER } from 'graphql/usuario/queries';
import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import Input from 'componets/Input';
import ButtonLoading from 'componets/ButtonLoading';
import useFormData from 'hooks/useFormData';
import { EDITAR_USUARIO } from 'graphql/usuario/mutation';
import DropDown from 'componets/Dropdown';
import { Enum_Rol, Enum_EstadoUsuario } from 'utils/enums';

const UserEdit = () => {
	const { id } = useParams(); //Get url param (ID)

	//GetUser query
	const {
		data: queryData,
		error: queryError,
		loading: loadingData,
	} = useQuery(GET_USER, {
		variables: { _id: id },
	});

	//UpdateUser query
	const [
		editUser,
		{ data: mutationData, loading: loadingMUtation, error: mutationError },
	] = useMutation(EDITAR_USUARIO);

	const { form, formData, updateFormData } = useFormData(null);

	const submitForm = (e) => {
		e.preventDefault();
		console.log(formData);
		editUser({
			variables: {
				_id:id,
				...formData,
			},
		});
	};

	useEffect(() => {
		console.log(mutationData)
	}, [mutationData])

	console.log(queryData);

	if (loadingData) return <div>Cargando...</div>;

	return (
		<div>
			<div className="flew flex-col w-full h-full items-center justify-center p-10">
				<Link to="/users">
					<i className="fas fa-arrow-left text-gray-600 cursor-pointer font-bold text-xl hover:text-gray-900" />
				</Link>
				<h1 className="m-4 text-3xl text-gray-800 font-bold text-center">
					Editar Usuario
				</h1>
				<form
					onSubmit={submitForm}
					onChange={updateFormData}
					ref={form}
					className="flex flex-col items-center justify-center"
				>
					<Input
						label="Nombre de la persona:"
						type="text"
						name="nombre"
						defaultValue={queryData.Usuario.nombre}
						required={true}
					/>
					<Input
						label="Apellido de la persona:"
						type="text"
						name="apellido"
						defaultValue={queryData.Usuario.apellido}
						required={true}
					/>
					<Input
						label="Correo de la persona:"
						type="email"
						name="correo"
						defaultValue={queryData.Usuario.correo}
						required={true}
					/>
					<Input
						label="Identificación de la persona:"
						type="text"
						name="identificacion"
						defaultValue={queryData.Usuario.identificacion}
						required={true}
					/>
					<DropDown
						label="Rol de la persona:"
						name="rol"
						defaultValue={queryData.Usuario.rol}
						required={true}
						options={Enum_Rol}
					/>
					<DropDown
						label="Estado de la solicitud:"
						name="estado"
						defaultValue={queryData.Usuario.estado}
						required={true}
						options={Enum_EstadoUsuario}
					/>
					<ButtonLoading disabled={false} loading={false} text="Confirmar" />
				</form>
			</div>
		</div>
	);
};

export { UserEdit };
