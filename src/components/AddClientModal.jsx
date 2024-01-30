import { useState } from "react";
import clientMutations from "../mutations/clientMutations";
import clientQueries from "../queries/clientQueries";
import { useMutation } from "@apollo/client";
import { useAccess } from "../context/AccesContext";

function AddClientModal({ setShowClientModal }) {
  const [clientInput, setClientInput] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const { owner } = useAccess();
  const [createClient, { data, loading, error }] = useMutation(
    clientMutations.CREATE_CLIENT,
    {
      variables: { clientInput },
      update(cache, { data: { createClient } }) {
        const { getClients } = cache.readQuery({
          query: clientQueries.GET_CLIENTS,
        });
        console.log(getClients);
        cache.writeQuery({
          query: clientQueries.GET_CLIENTS,
          data: { getClients: [...getClients, createClient] },
        });
      },
    }
  );
  const handleChange = (e) => {
    const { name, value } = e.target;
    setClientInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!owner) {
      return alert(
        "You do not have access to this functionality since this is a private manager project. Click on the GET FULL ACCESS button to unlock feature "
      );
    }
    if (
      clientInput.name === "" ||
      clientInput.email === "" ||
      clientInput.phone === ""
    ) {
      return alert("Fill all fields");
    }

    createClient(clientInput);

    setClientInput({
      name: "",
      email: "",
      phone: "",
    });

    setShowClientModal(false);
  };
  return (
    <div className="fixed w-full h-full top-0 left-0 bg-black/40 font-montserrat  flex justify-center dark:text-white ">
      <div className="bg-white h-fit w-[90%]  sm:w-[500px]  p-4 rounded-md dark:bg-slate-800 ">
        <div className="border-b border-gray-400 flex items-center justify-between">
          <h2 className="text-gray-700 text-xl pb-2 font-bold dark:text-white">
            Add New Client
          </h2>
          <div
            onClick={() => setShowClientModal(false)}
            className="h-8 w-8 rounded-full flex items-center justify-center border cursor-pointer border-gray-700 dark:border-white"
          >
            x
          </div>
        </div>
        {/* form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name">Client Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={clientInput.name}
              onChange={handleChange}
              className="border border-gray-500/40 outline-none p-2 w-full rounded-md dark:text-white dark:bg-slate-900 dark:border-white"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email">Client Email</label>
            <input
              id="email"
              type="text"
              name="email"
              value={clientInput.email}
              onChange={handleChange}
              className="border border-gray-500/40 outline-none p-2 w-full rounded-md dark:text-white dark:bg-slate-900 dark:border-white"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phone">Client Phone Number</label>
            <input
              id="phone"
              type="text"
              name="phone"
              value={clientInput.phone}
              onChange={handleChange}
              className="border border-gray-500/40 outline-none p-2 w-full rounded-md dark:text-white dark:bg-slate-900 dark:border-white"
            />
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

export default AddClientModal;
