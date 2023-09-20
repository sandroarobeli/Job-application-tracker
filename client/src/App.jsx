import React, { useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import theme from "./theme/theme";
import Header from "./components/Header";
import CompanyTable from "./components/CompanyTable";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorModal from "./components/ErrorModal";

const App = () => {
  // Local State
  const [pending, setPending] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [totalRejects, setTotalRejects] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [addCompanyDialogOpen, setAddCompanyDialogOpen] = useState(false);
  const [newCompanyTitle, setNewCompanyTitle] = useState("");
  const [newComments, setNewComments] = useState("");
  const [editCompanyDialogOpen, setEditCompanyDialogOpen] = useState(false);
  const [editedCompanyId, setEditedCompanyId] = useState("");
  const [editedCompanyTitle, setEditedCompanyTitle] = useState("");
  const [editedComments, setEditedComments] = useState("");
  const [rejected, setRejected] = useState(false);
  const [deleteCompanyDialogOpen, setDeleteCompanyDialogOpen] = useState(false);
  const [deletedCompany, setDeletedCompany] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const listCompanies = async () => {
      setPending(true);
      try {
        const response = await fetch("http://127.0.0.1:5555/api/companies", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          mode: "cors",
        });
        const responseData = await response.json();
        if (!response.ok) {
          // NON CONNECTION ISSUES
          setErrorMessage(response.statusText);
          console.log(response.statusText); // test
        }

        setPending(false);
        setCompanies(responseData.companies);
      } catch (error) {
        // CONNECTION ISSUES
        setPending(false);
        setErrorMessage(error.message);
        console.log(error.message); // test
      }
    };
    listCompanies();
  }, []);

  // Handler Functions
  // Sets value for filtering through existing company names
  const handleSearchValueChange = (event) => {
    setSearchValue(event.target.value.toLowerCase());
  };

  // ADDING NEW COMPANY
  // Opens add new company modal
  const handleAddCompanyModalOpen = () => {
    setAddCompanyDialogOpen(true);
  };

  // Closes add new company modal
  const handleAddCompanyModalClose = () => {
    setAddCompanyDialogOpen(false);
    setNewCompanyTitle("");
    setNewComments("");
  };

  const handleNewCompanyTitleChange = (event) => {
    setNewCompanyTitle(event.target.value);
  };

  const handleNewCommentsChange = (event) => {
    setNewComments(event.target.value);
  };

  const handleSubmitNewCompany = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:5555/api/companies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        body: JSON.stringify({
          name: newCompanyTitle,
          comments: newComments,
        }),
      });
      const responseData = await response.json();
      if (!response.ok) {
        // NON CONNECTION ISSUES
        setErrorMessage(response.statusText);
        console.log(response.statusText); // test
      }

      setAddCompanyDialogOpen(false);
      setIsLoading(false);

      // Update the state by creating a copy of existing state, pushing the new
      // Company and setting the result as a new state. Updating the state
      // Triggers re rendering of UI
      let arrayCopy = companies.slice();
      arrayCopy.unshift(responseData.company);
      setCompanies(arrayCopy);

      setNewCompanyTitle("");
      setNewComments("");
    } catch (error) {
      // CONNECTION ISSUES
      setAddCompanyDialogOpen(false);
      setIsLoading(false);
      setErrorMessage(error.message);
      console.log(error.message); // test
    }
  };

  // EDITING EXISTING COMPANY
  // Opens edit existing company modal
  const handleEditCompanyModalOpen = (id) => {
    setEditCompanyDialogOpen(true);
    // finds a row by its ID and populates fields
    let currentCompany = companies.find((company) => company._id === id);
    setEditedCompanyTitle(currentCompany.name);
    setEditedComments(currentCompany.comments);
    setRejected(currentCompany.status);
    setEditedCompanyId(currentCompany._id);
  };

  // Closes edit existing company modal
  const handleEditCompanyModalClose = () => {
    setEditCompanyDialogOpen(false);
  };

  const handleEditedCompanyTitleChange = (event) => {
    setEditedCompanyTitle(event.target.value);
  };

  const handleEditedCommentsChange = (event) => {
    setEditedComments(event.target.value);
  };

  const handleStatusChange = () => {
    setRejected((prevState) => !prevState);
  };

  const handleSubmitEditedCompany = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:5555/api/companies", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        body: JSON.stringify({
          id: editedCompanyId,
          name: editedCompanyTitle,
          status: rejected,
          comments: editedComments,
        }),
      });
      const responseData = await response.json();
      if (!response.ok) {
        // NON CONNECTION ISSUES
        setErrorMessage(response.statusText);
        console.log(response.statusText); // test
      }

      setEditCompanyDialogOpen(false);
      setIsLoading(false);

      // Force re render UI to display updated company
      const arrayCopy = companies.slice();
      const oldIndex = arrayCopy.findIndex(
        (company) => company._id === editedCompanyId
      );
      arrayCopy.splice(oldIndex, 1, responseData.company);
      setCompanies(arrayCopy);
    } catch (error) {
      // CONNECTION ISSUES
      setEditCompanyDialogOpen(false);
      setIsLoading(false);
      setErrorMessage(error.message);
      console.log(error.message); // test
    }
  };

  // DELETING EXISTING COMPANY
  // Opens delete existing company modal. Note: id here is needed to display company name
  const handleDeleteCompanyModalOpen = (id) => {
    setDeleteCompanyDialogOpen(true);
    // finds a row by its ID and populates fields
    let currentCompany = companies.find((company) => company._id === id);
    setDeletedCompany(currentCompany);
  };

  // Closes delete existing company modal
  const handleDeleteCompanyModalClose = () => {
    setDeleteCompanyDialogOpen(false);
  };

  const handleCompanyDelete = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:5555/api/companies", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        body: JSON.stringify({
          id: deletedCompany._id,
        }),
      });
      const responseData = await response.json();
      if (!response.ok) {
        // NON CONNECTION ISSUES
        setErrorMessage(response.statusText);
        console.log(response.statusText); // test
      }

      setDeleteCompanyDialogOpen(false);
      setIsLoading(false);
      setDeletedCompany({});

      // Update the state by creating a copy of existing state, filtering
      // out the company that was deleted and setting the result as a new state
      // Updating the state triggers re rendering of UI
      let arrayCopy = companies.slice();
      setCompanies(
        arrayCopy.filter((company) => company._id !== responseData.company._id)
      );
    } catch (error) {
      // CONNECTION ISSUES
      setDeleteCompanyDialogOpen(false);
      setIsLoading(false);
      setErrorMessage(error.message);
      console.log(error.message); // test
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header
        modalOpen={addCompanyDialogOpen}
        onAddCompanyModalOpen={handleAddCompanyModalOpen}
        onAddCompanyModalClose={handleAddCompanyModalClose}
        searchValue={searchValue}
        onSearchValueChange={handleSearchValueChange}
        newCompanyTitle={newCompanyTitle}
        onNewCompanyTitleChange={handleNewCompanyTitleChange}
        newComments={newComments}
        onNewCommentsChange={handleNewCommentsChange}
        onSubmitNewCompany={handleSubmitNewCompany}
        totalCount={companies.length}
        // Calculate the share of rejected applications
        totalRejects={Math.round(
          (companies.filter((company) => company.status === false).length /
            companies.length) *
            100
        )}
        isLoading={isLoading}
      />
      {pending ? (
        <LoadingSpinner />
      ) : (
        <CompanyTable
          rows={companies}
          nameFilter={searchValue}
          open={editCompanyDialogOpen}
          onEditCompanyModalOpen={handleEditCompanyModalOpen}
          onEditCompanyModalClose={handleEditCompanyModalClose}
          editedCompanyTitle={editedCompanyTitle}
          onEditedCompanyTitleChange={handleEditedCompanyTitleChange}
          editedComments={editedComments}
          onEditedCommentsChange={handleEditedCommentsChange}
          checked={!rejected}
          onStatusChange={handleStatusChange}
          onSubmitEditedCompany={handleSubmitEditedCompany}
          deleteModalOpen={deleteCompanyDialogOpen}
          onDeleteCompanyModalOpen={handleDeleteCompanyModalOpen}
          onDeleteCompanyModalClose={handleDeleteCompanyModalClose}
          deletedCompanyTitle={deletedCompany.name}
          onDeleteCompany={handleCompanyDelete}
          isLoading={isLoading}
        />
      )}
      <ErrorModal
        open={!!errorMessage}
        onClose={() => setErrorMessage("")}
        clearModal={() => setErrorMessage("")}
        errorMessage={errorMessage}
      />
    </ThemeProvider>
  );
};

export default App;
