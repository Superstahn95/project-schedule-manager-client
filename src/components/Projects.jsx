import { useQuery } from "@apollo/client";
import projectQueries from "../queries/projectQueries";
import ProjectCard from "./ProjectCard";
import Container from "./Container";

function Projects() {
  const { loading, error, data } = useQuery(projectQueries.GET_PROJECTS);

  if (loading) return <p>loading</p>;
  if (error) return <p>Error : {error.message}</p>;
  const projects = data ? data.getProjects : [];
  return (
    <>
      <Container>
        <div className="grid md:grid-cols-2 gap-8 my-7">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </Container>
    </>
  );
}

export default Projects;
