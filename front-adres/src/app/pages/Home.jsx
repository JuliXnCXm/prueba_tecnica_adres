import React, { useEffect, useState } from 'react';
import AcquisitionList from '../components/AcquisitionList';
import AcquisitionForm from '../components/AcquisitionForm';
import '../styles/pages/Home.css';
import useAcquisitions from "../hooks/useAcquisitions";
import AcquisitionModal from '../components/AcquisitionModal';
import AcquisitionFilters from '../components/AcquisitionFilters';


const App = () => {

  const [showFilter, setShowFilter] = useState(false)

  const {
    acquisitions,
    loading,
    show,
    handleClose,
    handleOpen,
    handleAddAcquisition,
    handleGetAcquisitions
  } = useAcquisitions();

  useEffect(() => {
    let filters = JSON.parse(window.sessionStorage.getItem('filters'))
    handleGetAcquisitions(filters);
  }, [])

  const clearFilters = () => {
    window.sessionStorage.setItem('filters', '{}');
    handleGetAcquisitions({});
  }

  return (
    <div className="container">
      {loading ? (
        <div className="loading"></div>
      ) : (
        <>
          <div className="top-buttons">
            <button
              className="container-btn_create"
              onClick={() => {
                setShowFilter(false);
                handleOpen(true);
              }}
            >
              <span>Crear adquisiciones</span>
              <span className="material-icons material-symbols-outlined icon">
                add
              </span>
            </button>
            <div >
              {window.sessionStorage.getItem('filters') !== '{}' && (
                <span
                id="removeFilters"
                  className="material-icons material-symbols-outlined icon"
                  onClick={clearFilters}
                >
                  cancel
                </span>
              )}
              <button
                className="container-btn_create"
                onClick={() => {
                  setShowFilter(true);
                  handleOpen(true);
                }}
              >
                <span>Filtros</span>
                <span className="material-icons material-symbols-outlined icon">
                  filter_alt
                </span>
              </button>
            </div>
          </div>
          <AcquisitionList
            acquisitions={acquisitions}
            handleOpen={handleOpen}
          />
          <AcquisitionModal show={show} handleClose={handleClose}>
            {showFilter ? (
              <AcquisitionFilters
                onSubmit={handleGetAcquisitions}
                handleClose={handleClose}
              />
            ) : (
              <AcquisitionForm
                onSubmit={handleAddAcquisition}
                handleClose={handleClose}
                isCreation={true}
              />
            )}
          </AcquisitionModal>
        </>
      )}
    </div>
  );
};


export default App;