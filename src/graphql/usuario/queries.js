import { gql } from '@apollo/client';

const GET_USERS = gql`
	query Usuarios {
		Usuarios {
			_id
			nombre
			apellido
			identificacion
			correo
			rol
      estado
		}
	}
`;

const GET_USER = gql`
  query ($_id: String!) {
    Usuario(_id: $_id) {
      _id
      nombre
      apellido
      correo
      identificacion
      rol
      estado
    }
  }
`;

export { GET_USERS, GET_USER };
