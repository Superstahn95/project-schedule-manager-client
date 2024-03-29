import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import Table from "./Table";
import { FaTrash } from "react-icons/fa";
import Container from "./Container";
import AddClientModal from "./AddClientModal";
import clientQueries from "../queries/clientQueries";
import projectQueries from "../queries/projectQueries";
import clientMutations from "../mutations/clientMutations";
import { useAccess } from "../context/AccesContext";

function Clients() {
  const { loading, error, data } = useQuery(clientQueries.GET_CLIENTS);
  const { isOwner } = useAccess();
  const [deleteClient] = useMutation(clientMutations.DELETE_CLIENT, {
    refetchQueries: [
      { query: clientQueries.GET_CLIENTS },
      { query: projectQueries.GET_PROJECTS },
    ],
  });
  const columns = [
    { name: "Name", selector: (row) => row.name },
    { name: "Email", selector: (row) => (isOwner ? row.email : "*******") },
    { name: "Phone", selector: (row) => (isOwner ? row.phone : "*******") },
    {
      name: "Action",
      cell: (row) => (
        <button
          onClick={() => deleteClient({ variables: { clientId: row.id } })}
          className="bg-red-500 p-1 rounded-md"
        >
          <FaTrash color={"white"} />
        </button>
      ),
    },
  ];

  if (error) return <h1>{error.message}</h1>;
  if (loading) return <h1>Loading.....</h1>;
  const clients = data ? data.getClients : [];
  return (
    <Container>
      <div className="font-montserrat">
        <Table tableHeaders={columns} tableDetails={clients} />
      </div>
    </Container>
  );
}

export default Clients;
