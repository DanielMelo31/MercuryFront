import { gql } from '@apollo/client';

const GET_USUARIOS = gql`
  query Usuarios {
    Usuarios {
      _id
      nombre
      apellido
      identificacion
      correo
      rol
    }
  }
`;

export { GET_USUARIOS, GET_USUARIO };
