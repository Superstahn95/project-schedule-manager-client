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
const clientMutations = { CREATE_CLIENT };

export default clientMutations;
