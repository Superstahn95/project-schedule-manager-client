import { gql } from "@apollo/client";

const GET_CLIENTS = gql`
  query getClients {
    getClients {
      id
      name
      email
      phone
    }
  }
`;

const clientQueries = { GET_CLIENTS };

export default clientQueries;
