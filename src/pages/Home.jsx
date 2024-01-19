import { useState } from "react";
import AddProjectModal from "../components/AddProjectModal";
import AddClientModal from "../components/AddClientModal";
import Projects from "../components/Projects";
import Container from "../components/Container";
import Clients from "../components/Clients";
import { useAccess } from "../context/AccesContext";
function Home() {
  const [showClientModal, setShowClientModal] = useState(false);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const { isOwner, setIsOwner, handleAccess } = useAccess();
  const handleClientModal = () => {
    setShowClientModal(true);
  };
  const handleProjectModal = () => {
    setShowProjectModal(true);
  };
  const checkAndGrantAccess = () => {
    if (isOwner) {
      return alert("You have already been granted access");
    }
    const password = prompt("Enter application password");
    if (!password) {
      return alert("You need to enter a password");
    }
    handleAccess(password);
  };
  console.log(import.meta.env.VITE_ACCESS_PASSWORD);
  return (
    <>
      <Container>
        <div className="my-3 flex items-center justify-between space-x-3 font-montserrat">
          <div className="flex items-center space-x-3">
            <button
              onClick={handleClientModal}
              className="bg-red-500 text-white p-2 rounded-md"
            >
              Add Client
            </button>
            <button
              onClick={handleProjectModal}
              className="bg-blue-500 text-white p-2 rounded-md"
            >
              Add Project
            </button>
          </div>
          <button
            onClick={checkAndGrantAccess}
            className="bg-blue-500 text-white p-2 rounded-md"
          >
            Get full access
          </button>
        </div>
      </Container>
      <Projects />
      <Clients />
      {showClientModal && (
        <AddClientModal setShowClientModal={setShowClientModal} />
      )}
      {showProjectModal && (
        <AddProjectModal setShowProjectModal={setShowProjectModal} />
      )}
    </>
  );
}

export default Home;
