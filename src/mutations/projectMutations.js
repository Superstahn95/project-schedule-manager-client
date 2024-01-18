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

const projectMutations = { ADD_PROJECT };

export default projectMutations;
