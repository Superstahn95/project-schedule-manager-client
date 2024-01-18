import { gql } from "@apollo/client";

const ADD_PROJECT = gql`
  mutation AddProject($projectInput: ProjectInput) {
    createProject(projectInput: $projectInput) {
      name
      id
      countDownEndTime
      createdAt
      description
      status
    }
  }
`;

// const DELETE_PROJECT = gql`
// mutation DeleteProject($clientId: ID!){
//     deleteProject(clientId: $clientId){

//     }
// }
// `;

const projectMutations = { ADD_PROJECT };

export default projectMutations;
