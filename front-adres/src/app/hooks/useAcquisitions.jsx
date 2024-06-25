import { useState } from "react";

import {
  getAcquisitions,
  createAcquisition,
  deleteAcquisition,
  updateAcquisition,
  getAcquisition,
  getAcquisitionHistory
} from "../shared/api/api";

const useAcquisitions = () => {
  const [acquisitions, setAcquisitions] = useState([]);
  const [acquisitionSelectedHistory, setAcquisitionSelectedHistory] = useState(
    []
  );
  const [acquisitionDetail, setAcquisitionDetail] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [show, setShow] = useState(false);

  const handleGetAcquisitions = (filter) => {
    getAcquisitions(filter).then((response) => {
      setAcquisitions(response.data);
    })
  }

  const handleGetAcquisitionById = (id) => {
    setLoading(true)
    getAcquisition(id).then((response) => {
      setAcquisitionDetail(response.data);
      handleGetAcquisitionHistory(id);
    });
  }

  const handleGetAcquisitionHistory = (id) => {
    getAcquisitionHistory(id).then((response) => {
      setAcquisitionSelectedHistory(response.data);
      setLoading(false);
    });
  }

  const formatDate = (dateValue) => {
    const date = new Date(dateValue);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Los meses van de 0 a 11 en JavaScript
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleOpen = () => {
    setShow(true);
  };

  const handleDeleteAcquisition = (id) => {
    deleteAcquisition(id)
    .then((response) => {
      if (response.status === 204) {
        setAcquisitions(
          acquisitions.filter((acquisition) => acquisition.id !== id)
        );
        window.location.reload()
      }
    })
    .catch((error) => {
      console.error("Error deleting acquisition:", error);
      setError(error);
    })
  }

  const handleAddAcquisition = (acquisition) => {
    const acquisitionFormated = {
      section: acquisition.section,
      budget: parseFloat(acquisition.budget).toFixed(2),
      type: acquisition.type,
      supplier: acquisition.supplier,
      quantity: parseInt(acquisition.quantity),
      unit_value: parseFloat(acquisition.unit_value).toFixed(2),
      total_value: parseFloat(acquisition.total_value).toFixed(2),
      active: acquisition.active,
      documentation: acquisition.documentation,
      acquisition_date: new Date(Date.now()).toISOString()
    };

      createAcquisition(acquisitionFormated).then((response) => {
        setAcquisitions([...acquisitions, response.data]);
      });
  };

  const handleUpdateAcquisition = (updatedAcquisitionId , updatedAcquisitionData) => {
      updateAcquisition(updatedAcquisitionId, updatedAcquisitionData).then(
        (response) => {
          setAcquisitions(
            acquisitions.map((acquisition) =>
              acquisition.id === updatedAcquisitionId
                ? response.data
                : acquisition
            )
          );
        }
      );
      
  };
  

  const formatCurrency = (value) => {
    const stringValue = String(value);
    let [integerPart, decimalPart] = stringValue.split(".");
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    let formattedValue = "$ " + integerPart;
    if (decimalPart !== undefined) {
      formattedValue += "," + decimalPart;
    }
    return formattedValue;
  }

  return {
    acquisitions,
    loading,
    show,
    error,
    formatDate,
    acquisitionDetail,
    setLoading,
    formatCurrency,
    acquisitionSelectedHistory,
    handleOpen,
    handleClose,
    handleAddAcquisition,
    handleGetAcquisitions,
    handleUpdateAcquisition,
    handleDeleteAcquisition,
    handleGetAcquisitionById,
  };
};

export default useAcquisitions;
