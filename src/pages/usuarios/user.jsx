import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_USUARIOS } from 'graphql/usuario/queries';
import { Link } from 'react-router-dom';
import { Enum_Rol } from 'utils/enums';

const Usuarios = () => {
	const { loading, error, data } = useQuery(GET_USUARIOS);

	return <div>User</div>;
};

export default Usuarios;
