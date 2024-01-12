import { useState } from "react";
import AddProjectModal from "../components/AddProjectModal";
import AddClientModal from "../components/AddClientModal";
import Projects from "../components/Projects";
import Container from "../components/Container";
import Clients from "../components/Clients";
function Home() {
  const [showClientModal, setShowClientModal] = useState(false);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const handleClientModal = () => {
    setShowClientModal(true);
  };
  const handleProjectModal = () => {
    setShowProjectModal(true);
  };
  return (
    <>
      <Container>
        <div className="my-3 flex items-center space-x-3 font-montserrat">
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
