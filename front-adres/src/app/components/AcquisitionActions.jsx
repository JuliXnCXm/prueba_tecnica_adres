import "../styles/components/AcquisitionActions.css";
import React, { useState, Suspense } from "react";
import useAcquisitions from "../hooks/useAcquisitions";
import AcquisitionModal from "./AcquisitionModal";
const AcquisitionDetailView = React.lazy(() =>
  import("./AcquisitionDetailView")
);
const AcquisitionForm = React.lazy(() => import("./AcquisitionForm"));
const AcquisitionDelete = React.lazy(() => import("./AcquisitionDelete"));

const AcquisitionActions = ({ acquisition }) => {
  const { show, handleClose, handleOpen, handleUpdateAcquisition } =
    useAcquisitions();

  const [selectedAction, setSelectedAction] = useState(null);

  const handleOpenAction = (action) => {
    setSelectedAction(action);
    handleOpen();
  };

  const handleCloseAction = () => {
    handleClose();
    setSelectedAction(null);
  };

  const renderDynamicComponent = () => {
    switch (selectedAction) {
      case "view":
        return (
          <AcquisitionDetailView
            acquisitionId={acquisition.id}
            handleClose={handleCloseAction}
          />
        );
      case "delete":
        return (
          <AcquisitionDelete
            acquisitionId={acquisition.id}
            handleClose={handleCloseAction}
          />
        );
      case "edit":
        return (
          <AcquisitionForm
            onSubmit={handleUpdateAcquisition}
            handleClose={handleCloseAction}
            isCreation={false}
            acquisitionData={acquisition}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="actions-container">
        <span
          id="icon"
          className="material-icons material-symbols-outlined"
          onClick={() => handleOpenAction("view")}
        >
          visibility
        </span>
        <span
          id="icon"
          className="material-icons material-symbols-outlined"
          onClick={() => handleOpenAction("edit")}
        >
          edit
        </span>
        <span
          id="icon"
          className="material-icons material-symbols-outlined"
          onClick={() => handleOpenAction("delete")}
        >
          delete
        </span>
      </div>
      {show && (
        <Suspense fallback={<div></div>}>
          <AcquisitionModal show={show} handleClose={handleCloseAction}>
            {renderDynamicComponent()}
          </AcquisitionModal>
        </Suspense>
      )}
    </>
  );
};

export default AcquisitionActions;
