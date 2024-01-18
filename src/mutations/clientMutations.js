import { gql } from "@apollo/client";

const CREATE_CLIENT = gql`
  mutation CreateClient($clientInput: ClientInput) {
    createClient(clientInput: $clientInput) {
      email
      id
      name
      phone
      createdAt
    }
  }
`;

const DELETE_CLIENT = gql`
  mutation DeleteClient($clientId: ID!) {
    deleteClient(clientId: $clientId)
  }
`;
const clientMutations = { CREATE_CLIENT, DELETE_CLIENT };

export default clientMutations;
