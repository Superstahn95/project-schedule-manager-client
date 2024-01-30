import { useParams, Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { FaUser } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { FaPhoneAlt } from "react-icons/fa";
import projectQueries from "../queries/projectQueries";
import Container from "../components/Container";

function Project() {
  const params = useParams();
  const { id } = params;
  console.log(id);
  const { loading, error, data } = useQuery(projectQueries.GET_PROJECT, {
    variables: { projectId: id },
  });
  console.log(data);
  if (loading) return <p>loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  const project = data?.getProject;
  console.log(project);
  return (
    <Container>
      <div className="flex justify-center font-montserrat dark:text-white">
        <div className="border border-gray-500 mt-7 p-7 rounded-md w-[100%] md:w-[500px] lg:w-[700px] dark:border-gray-300 flex flex-col">
          <Link
            to={"/"}
            className="self-end py-1 px-2 rounded-md bg-gray-200 dark:text-black"
          >
            Back
          </Link>
          <div className="mb-5">
            <h2 className="text-3xl font-bold ">{project.name}</h2>
            <p className="py-2">{project.description}</p>
          </div>
          <div className="mb-7">
            <h3 className="font-semibold text-xl">Project Status</h3>
            <p className="py-2">Completed</p>
          </div>

          {/* client info */}
          <h3>Client information</h3>
          <div className="mt-2 border border-gray-500 dark:border-gray-300 mb-5">
            <div className="flex items-center space-x-2 p-3 border-b border-gray-500 dark:border-gray-300">
              <FaUser />
              <span>{project.clientId.name}</span>
            </div>
            <div className="flex items-center space-x-2 p-3 border-b border-gray-500 dark:border-gray-300">
              <IoMdMail />
              <span>{project.clientId.email}</span>
            </div>
            <div className="flex items-center space-x-2 p-3 ">
              <FaPhoneAlt />
              <span>{project.clientId.phone}</span>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Project;
