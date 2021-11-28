import { useQuery } from '@apollo/client';
import { React, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GET_USERS } from 'graphql/usuario/queries';

const Users = () => {
	const { data, loading, error } = useQuery(GET_USERS);

	useEffect(() => {
		console.log(data);
	}, [data]);
	return (
		<div className="table_container">
			<table className="table">
				<thead>
					<tr>
						<th>Nombre</th>
						<th>Apellidos</th>
						<th>Correo</th>
						<th>Identificacion</th>
						<th>Rol</th>
						<th>Acciones</th>
					</tr>
				</thead>
				<tbody>
					{data &&
						data.Usuarios.map((user) => {
							return (
								<tr key={user._id}>
									<td>{user.nombre}</td>
									<td>{user.apellido}</td>
									<td>{user.correo}</td>
									<td>{user.identificacion}</td>
									<td>{user.rol.toLowerCase()}</td>
									<td>
										<Link to={`/users/edit/${user._id}`}>
											<i className="far fa-edit"></i>
										</Link>
									</td>
								</tr>
							);
						})}
				</tbody>
			</table>
		</div>
	);
};

export { Users };
