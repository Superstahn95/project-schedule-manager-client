import { useQuery, useMutation } from "@apollo/client";
import { useState } from "react";
import projectMutations from "../mutations/projectMutations";
import projectQueries from "../queries/projectQueries";
import clientQueries from "../queries/clientQueries";
import { Calendar, DateRange, DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

function AddProjectModal({ setShowProjectModal }) {
  //variable should be projectInput => projectInput
  // name: String!,
  // description: String!,
  // clientId: ID!,
  // countDownHours: Int!,
  let countDownHours;
  //   const [clientId, setClientId] = useState("");
  const [showDate, setShowDate] = useState(false);
  //   const [name, setName] = useState("");
  //   const [description, setDescription] = useState("");
  const [projectData, setProjectData] = useState({
    name: "",
    description: "",
    clientId: "",
  });
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);
  const handleSelect = (ranges) => {
    setDateRange([ranges.selection]);
  };
  const { data, loading, error } = useQuery(clientQueries.GET_CLIENTS);
  const [createProject] = useMutation(projectMutations.ADD_PROJECT, {
    // variables: { ...projectData, countDownHours },
    // refetchQueries: [{ query: projectQueries.GET_PROJECTS }],
    update(cache, { data: { createProject } }) {
      const { getProjects } = cache.readQuery({
        query: projectQueries.GET_PROJECTS,
      });
      cache.writeQuery({
        query: projectQueries.GET_PROJECTS,
        data: { getProjects: [...getProjects, createProject] },
      });
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("we ust tried submitting");
    countDownHours = calculateEstimatedHours();
    console.log("This is our project data....");
    console.log(projectData);
    if (
      projectData.name === "" ||
      projectData.description === "" ||
      projectData.clientId === "" ||
      !countDownHours
    ) {
      return alert("Fill all fields");
    }

    const { name, description, clientId } = projectData;
    // createProject({name, description, clientId, countDownHours});
    console.log({
      name,
      description,
      clientId,
      countDownHours,
    });
    createProject({
      variables: {
        projectInput: { name, description, clientId, countDownHours },
      },
    });

    // setName("");
    // setDescription("");
    // setStatus("new");
    // setClientId("");
    setProjectData({
      name: "",
      description: "",
      clientId: "",
    });

    setShowProjectModal(false);
  };
  const calculateEstimatedHours = () => {
    if (dateRange[0].startDate && dateRange[0].endDate) {
      const startTime = dateRange[0].startDate.getTime();
      const endTime = dateRange[0].endDate.getTime();
      const hoursDifference = (endTime - startTime) / (1000 * 60 * 60);
      return hoursDifference;
    }
    return alert("You are yet to add a schedule for this project");
  };
  //   console.log("Client ID....");
  //   console.log(clientId);
  console.log(data?.getClients);
  return (
    <div className="fixed w-full h-full top-0 left-0 bg-black/40 font-montserrat  flex justify-center dark:text-white ">
      <div className="bg-white h-fit w-[90%]  sm:w-[500px]  p-4 rounded-md dark:bg-slate-800 ">
        <div className="border-b border-gray-400 flex items-center justify-between">
          <h2 className="text-gray-700 text-xl pb-2 font-bold dark:text-white ">
            Add New Project
          </h2>
          <div
            onClick={() => setShowProjectModal(false)}
            className="h-8 w-8 rounded-full flex items-center justify-center border cursor-pointer border-gray-700 dark:border-white"
          >
            x
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name">Project Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={projectData.name}
              onChange={handleChange}
              className="border border-gray-500/40 outline-none p-2 w-full rounded-md dark:text-white dark:bg-slate-900 dark:border-white"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description">Project Description</label>

            <textarea
              name="description"
              id="description"
              value={projectData.description}
              onChange={handleChange}
              className="border border-gray-500/40 outline-none p-2 w-full rounded-md dark:text-white dark:bg-slate-900 dark:border-white"
            ></textarea>
          </div>
          <div className="mb-3 flex flex-col relative">
            {/* <label>Estimated Hours:</label> */}
            <span
              className="text-sm w-full p-2 cursor-pointer capitalize dark:text-white dark:bg-slate-900 dark:border-white rounded-md"
              onClick={() => setShowDate((prevShow) => !prevShow)}
            >
              {/* {startDateStr} to {endDateStr} */}
              Click here to schedule project
            </span>
            {showDate && (
              <DateRange
                ranges={dateRange}
                onChange={handleSelect}
                editableDateInputs={true}
                dragSelectionEnabled={false}
                rangeColors={["#FF8C00"]}
                minDate={new Date()}
                className="  absolute top-[100%] left-0 "
              />
            )}
          </div>
          {/*   
          <div className="mb-3">
            <label htmlFor="name">Scheduled finish time</label>
            <input
              type="text"
              name="name"
              id="name"
              value={projectData.name}
              onChange={handleChange}
              className="border border-gray-500/40 outline-none p-2 w-full rounded-md dark:text-white dark:bg-slate-900 dark:border-white"
            />
          </div> */}
          <div className="mb-3">
            <label htmlFor="client">Select Client</label>

            <select
              onChange={handleChange}
              name="clientId"
              className="border border-gray-500/40 outline-none p-2 w-full rounded-md dark:text-white dark:bg-slate-900 dark:border-white"
            >
              <option value="">Choose a client</option>
              {data?.getClients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end">
            <button
              type="Submit"
              className="bg-red-500 p-2 rounded-md text-white "
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProjectModal;
