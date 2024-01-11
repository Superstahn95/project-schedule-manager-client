import { useQuery } from "@apollo/client";
import projectQueries from "../queries/projectQueries";

function Projects() {
  const {
    loading,
    error,
    data: { getProjects: projects },
  } = useQuery(projectQueries.GET_PROJECTS);
  console.log(loading);
  console.log(error);
  console.log(projects);
  return <div>Projects</div>;
}

export default Projects;
