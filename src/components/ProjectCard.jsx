import { Link } from "react-router-dom";
import CountdownTimer from "./CountdownTimer";

function ProjectCard({ project }) {
  const getStatusColor = () => {
    if (project.status === "In Progress") return "text-yellow-500";
    if (project.status === "Not Started") return "text-red-500";
    if (project.status === "Completed") return "text-green-500";
    return "text-black";
  };
  console.log(project);
  return (
    <div className="border border-gray-700 rounded-md shadow-lg p-4 dark:text-white font-montserrat">
      <div className="flex items-center justify-between">
        <h2 className="font-bold capitalize">{project?.name}</h2>
        <Link
          to={`project/${project.id}`}
          className="border border-black p-1 rounded-md"
        >
          View
        </Link>
      </div>
      <div>
        <span className={`text-sm ${getStatusColor()}`}>{project?.status}</span>
      </div>
      <CountdownTimer countDownEndTime={project.countDownEndTime} />
    </div>
  );
}

export default ProjectCard;
