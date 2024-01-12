import { gql } from "@apollo/client";

const GET_PROJECTS = gql`
  query getProjects {
    getProjects {
      id
      name
      description
      createdAt
    }
  }
`;

const GET_PROJECT = gql`
  query GetProject($projectId: ID!) {
    getProject(projectId: $projectId) {
      name
      description
      createdAt
      countDownEndTime
      clientId {
        name
        email
        phone
        id
      }
    }
  }
`;
// const GET_PROJECT = gql`
//   query getProject($id: ID!) {
//     project(id: $id) {
//       id
//       name
//       description
//       status
//       client {
//         id
//         name
//         email
//         phone
//       }
//     }
//   }
// `;

const projectQueries = { GET_PROJECTS, GET_PROJECT };

export default projectQueries;
