import { gql } from "@apollo/client";

const GET_PROJECTS = gql`
  query getProjects {
    getProjects {
      id
      name
      description
    }
  }
`;

const projectQueries = { GET_PROJECTS };

export default projectQueries;
