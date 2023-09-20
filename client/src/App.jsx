import { useState, useEffect, useMemo } from "react";

import ThemeIcon from "./icons/Theme";
import Spinner from "./components/Spinner";
import AddModal from "./components/AddModal";
import EditModal from "./components/EditModal";
import DeleteModal from "./components/DeleteModal";
import ErrorModal from "./components/ErrorModal";

const App = () => {
  const [query, setQuery] = useState("");
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [companyTitle, setCompanyTitle] = useState("");
  const [comments, setComments] = useState("");
  const [editedCompanyId, setEditedCompanyId] = useState("");
  const [editedTitle, setEditedTitle] = useState("");
  const [editedComments, setEditedComments] = useState("");
  const [rejected, setRejected] = useState(false);
  const [companyToDelete, setCompanyToDelete] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [companies, setCompanies] = useState([]);

  const rejectsTotal = useMemo(
    () =>
      Math.round(
        (companies?.filter((company) => company.rejected === true).length /
          companies?.length) *
          100
      ),
    [companies]
  );

  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleMode = () => {
    if (!localStorage.theme || localStorage.theme === "light") {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
    }
  };

  useEffect(() => {
    const listCompanies = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_DOMAIN}/api/companies`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            mode: "cors",
          }
        );
        const data = await response.json();
        if (!response.ok) {
          // NON CONNECTION ISSUES
          setErrorMessage(response.statusText);
        }
        setCompanies(data.companies);
      } catch (error) {
        // CONNECTION ISSUES
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    listCompanies();
  }, [companies?.length]);

  const handleAddCompany = async () => {
    setAddModalOpen(false);
    setIsLoading(true);

    try {
      if (companyTitle.trim() === "") {
        throw new Error("Company name is required!");
      }
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_DOMAIN}/api/companies`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          mode: "cors",
          body: JSON.stringify({
            name: companyTitle,
            comments: comments,
          }),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        // NON CONNECTION ISSUES
        setErrorMessage(response.statusText);
      }
      // Update the state by creating a copy of existing state, pushing the new
      // Company and setting the result as a new state. Updating the state
      // Triggers re rendering of UI
      const copy = companies.slice();
      copy.unshift(data.company);
      setCompanies(copy);
    } catch (error) {
      // CONNECTION ISSUES
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
      setCompanyTitle("");
      setComments("");
    }
  };

  const handleEditCompany = async () => {
    setEditModalOpen(false);
    setIsLoading(true);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_DOMAIN}/api/companies`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          mode: "cors",
          body: JSON.stringify({
            id: editedCompanyId,
            name: editedTitle,
            rejected: rejected,
            comments: editedComments,
          }),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        // NON CONNECTION ISSUES
        setErrorMessage(response.statusText);
      }

      // Force re render UI to display updated company
      const copy = companies.slice();
      const oldIndex = copy.findIndex(
        (company) => company._id === editedCompanyId
      );
      copy.splice(oldIndex, 1, data.company);
      setCompanies(copy);
    } catch (error) {
      // CONNECTION ISSUES
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
      setEditedTitle("");
      setEditedComments("");
    }
  };

  const handleDeleteCompany = async () => {
    setDeleteModalOpen(false);
    setIsLoading(true);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_DOMAIN}/api/companies`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          mode: "cors",
          body: JSON.stringify({
            id: companyToDelete._id,
          }),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        // NON CONNECTION ISSUES
        setErrorMessage(response.statusText);
      }

      // Update the state by creating a copy of existing state, filtering
      // out the company that was deleted and setting the result as a new state
      // Updating the state triggers re rendering of UI
      let arrayCopy = companies.slice();
      setCompanies(
        arrayCopy.filter((company) => company._id !== data.company._id)
      );
    } catch (error) {
      // CONNECTION ISSUES
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
      setCompanyToDelete({});
    }
  };

  return (
    <div className="flex flex-col justify-between min-h-screen">
      <header className="fixed top-0 left-0 w-full p-4 shadow-md dark:shadow-sm dark:shadow-primary flex justify-between items-center bg-primary dark:bg-gray-900">
        <h2 className="text-lg sm:text-2xl">Applied: {companies.length}</h2>
        <h2 className="text-lg sm:text-2xl">
          Rejection: {rejectsTotal ? rejectsTotal + "%" : "0"}
        </h2>
        <input
          arial-label="company-lookup"
          type="text"
          id="company-lookup"
          className="hidden sm:block rounded border p-2 outline-none text-lg bg-primary-hover text-black focus:ring-0"
          placeholder="Search companies.."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <button
          aria-label="Add company"
          className="hidden sm:block text-lg sm:text-2xl px-4 py-1 rounded-md border outline-none border-gray-900 shadow-light dark:text-primary dark:border-primary dark:bg-gray-700  hover:bg-primary-hover active:bg-primary-active hover:scale-95 active:scale-95 dark:hover:bg-gray-800 dark:active:bg-gray-900 transition-all ease-in-out duration-300"
          onClick={() => setAddModalOpen(true)}
        >
          ADD
        </button>
        <button
          aria-label="Light-dark theme switch"
          className="theme-button"
          onClick={toggleMode}
        >
          <ThemeIcon className="theme-icon" />
        </button>
      </header>
      <main className="container mx-auto">
        {/**   TABLE BEGIN   **/}
        {isLoading ? (
          <Spinner
            className="spinner stroke-gray-900 dark:stroke-primary"
            strokeWidth="120"
          />
        ) : (
          <div className="overflow-x-auto mt-20">
            <table className="min-w-full">
              <thead className="border-b border-gray-700 dark:border-primary">
                <tr>
                  <th className="p-5 text-left">COMPANY NAME</th>
                  <th className="p-5 text-left">DATE APPLIED</th>
                  <th className="p-5 text-left">STATUS</th>
                  <th className="p-5 text-left">COMMENTS</th>
                  <th className="p-5 text-left">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {companies.map(
                  (company) =>
                    company.name
                      .toLowerCase()
                      .includes(query.toLowerCase()) && (
                      <tr
                        key={company._id}
                        className="odd:bg-primary-hover dark:odd:bg-gray-700 border-b border-gray-700 dark:border-primary"
                      >
                        <td className="p-5">{company.name}</td>
                        <td className="p-5">{company.date}</td>
                        <td
                          className={`p-5 ${
                            company.rejected ? "text-red-700" : "text-green-700"
                          }`}
                        >
                          {company.rejected ? "Rejected" : "Pending"}
                        </td>
                        <td className="p-5">{company.comments}</td>
                        <td className="pr-2 pl-4">
                          <button
                            className="text-blue-700 hover:text-blue-900 mr-1"
                            onClick={() => {
                              setEditedCompanyId(company._id);
                              setEditedTitle(company.name);
                              setEditedComments(company.comments);
                              setRejected(company.rejected);
                              setEditModalOpen(true);
                            }}
                          >
                            Edit
                          </button>
                          &nbsp;
                          <button
                            className="text-red-700 hover:text-red-900"
                            onClick={() => {
                              setCompanyToDelete(
                                companies.find((x) => x._id === company._id)
                              );
                              setDeleteModalOpen(true);
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    )
                )}
              </tbody>
            </table>
          </div>
        )}
        {/**   TABLE END   **/}
      </main>
      <footer className="fixed bottom-0 left-0 w-full p-4 flex justify-between items-center bg-primary dark:bg-gray-900 sm:hidden">
        <input
          type="text"
          id="user-search-companies"
          className="block sm:hidden rounded border p-1 outline-none text-lg bg-primary-hover text-black focus:ring-0"
          placeholder="Search companies.."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <button
          aria-label="ADD"
          className="block sm:hidden text-lg sm:text-2xl px-4 py-1 rounded-md border outline-none border-gray-900 dark:text-primary dark:border-primary dark:bg-gray-700 shadow-light hover:bg-primary-hover active:bg-primary-active hover:scale-95 active:scale-95 dark:hover:bg-gray-800 dark:active:bg-gray-900 transition-all ease-in-out duration-300"
          onClick={() => setAddModalOpen(true)}
        >
          ADD
        </button>
      </footer>
      <AddModal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSubmit={handleAddCompany}
        companyTitle={companyTitle}
        onTitleChange={(event) => setCompanyTitle(event.target.value)}
        comments={comments}
        onCommentsChange={(event) => setComments(event.target.value)}
      />
      <EditModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        onSubmit={handleEditCompany}
        editedTitle={editedTitle}
        onTitleChange={(event) => setEditedTitle(event.target.value)}
        editedComments={editedComments}
        onCommentsChange={(event) => setEditedComments(event.target.value)}
        checked={rejected}
        SwitchOption={
          rejected ? "Change Status to Pending?" : "Change Status to Rejected?"
        }
        onStatusChange={() => setRejected(!rejected)}
      />
      <DeleteModal
        isOpen={deleteModalOpen}
        companyName={companyToDelete.name}
        onDelete={handleDeleteCompany}
        onClose={() => setDeleteModalOpen(false)}
      />
      <ErrorModal
        isOpen={!!errorMessage}
        errorMessage={errorMessage}
        clearMessage={() => setErrorMessage("")}
        onClose={() => setErrorMessage("")}
      />
    </div>
  );
};

export default App;
