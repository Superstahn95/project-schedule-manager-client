import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import Table from "./Table";
import { FaTrash } from "react-icons/fa";
import Container from "./Container";
import AddClientModal from "./AddClientModal";
import clientQueries from "../queries/clientQueries";

function Clients() {
  const { loading, error, data } = useQuery(clientQueries.GET_CLIENTS);
  const columns = [
    { name: "Name", selector: (row) => row.name },
    { name: "Email", selector: (row) => row.email },
    { name: "Phone", selector: (row) => row.phone },
    { name: "row", selector: (row) => row.id },
    {
      name: "Action",
      cell: (row) => (
        <button
          onClick={() => deleteClient({ variables: { id: row.id } })}
          className="bg-red-500 p-1 rounded-md"
        >
          <FaTrash color={"white"} />
        </button>
      ),
    },
  ];
  console.log(data);
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
