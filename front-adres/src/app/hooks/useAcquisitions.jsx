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

  /**
   * Fetches acquisitions data from the API based on the provided filter.
   * @param {Object} filter - An object containing the filter criteria for the acquisitions data.
   * @returns {Promise<void>} - A promise that resolves when the acquisitions data is fetched successfully.
   */
  const handleGetAcquisitions = (filter) => {
    return getAcquisitions(filter).then((response) => {
      setAcquisitions(response.data);
    });
  };

  /**
   * Fetches acquisition data by its id from the API.
   * @param {number} id - The unique identifier of the acquisition to be fetched.
   * @returns {Promise<void>} - A promise that resolves when the acquisition data is fetched successfully.
   */
  const handleGetAcquisitionById = (id) => {
    setLoading(true);
    getAcquisition(id).then((response) => {
      setAcquisitionDetail(response.data);
      handleGetAcquisitionHistory(id);
    });
  };

  /**
   * Fetches acquisition history data by its id from the API.
   * @param {number} id - The unique identifier of the acquisition to fetch its history.
   * @returns {Promise<void>} - A promise that resolves when the acquisition history data is fetched successfully.
   */
  const handleGetAcquisitionHistory = (id) => {
    getAcquisitionHistory(id).then((response) => {
      setAcquisitionSelectedHistory(response.data);
      setLoading(false);
    });
  };

  /**
   * Formats a date value into a string in the format "DD/MM/YYYY".
   * @param {string} dateValue - The date value to be formatted.
   * @returns {string} - The formatted date string.
   */
  const formatDate = (dateValue) => {
    const date = new Date(dateValue);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Los meses van de 0 a 11 en JavaScript
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  /**
   * Closes the modal or dialog.
   * @function handleClose
   * @memberof useAcquisitions
   * @returns {void} - No return value.
   */
  const handleClose = () => {
    setShow(false);
  };

  /**
   * Opens the modal or dialog.
   * @function handleOpen
   * @memberof useAcquisitions
   * @returns {void} - No return value.
   */
  const handleOpen = () => {
    setShow(true);
  };

  /**
   * Deletes an acquisition by its id from the API.
   * @param {number} id - The unique identifier of the acquisition to be deleted.
   * @returns {Promise<void>} - A promise that resolves when the acquisition data is deleted successfully.
   */
  const handleDeleteAcquisition = (id) => {
    deleteAcquisition(id)
      .then((response) => {
        if (response.status === 204) {
          setAcquisitions(
            acquisitions.filter((acquisition) => acquisition.id !== id)
          );
          window.location.reload();
        }
      })
      .catch((error) => {
        console.error("Error deleting acquisition:", error);
        setError(error);
      });
  };

  /**
   * Adds a new acquisition to the acquisitions data.
   * @param {Object} acquisition - An object containing the details of the new acquisition.
   * @returns {void} - No return value. The new acquisition is added to the acquisitions data.
   */
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
      acquisition_date: new Date(Date.now()).toISOString(),
    };

    createAcquisition(acquisitionFormated).then((response) => {
      setAcquisitions([...acquisitions, response.data]);
    });
  };

  /**
   * Updates an acquisition by its id in the acquisitions data.
   * @param {number} updatedAcquisitionId - The unique identifier of the acquisition to be updated.
   * @param {Object} updatedAcquisitionData - An object containing the updated details of the acquisition.
   * @returns {Promise<void>} - A promise that resolves when the acquisition data is updated successfully.
   */
  const handleUpdateAcquisition = (
    updatedAcquisitionId,
    updatedAcquisitionData
  ) => {
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

  /**
   * Formats a numeric value into a string with a currency symbol and a decimal separator.
   * @param {number} value - The numeric value to be formatted.
   * @returns {string} - The formatted currency string.
   */
  const formatCurrency = (value) => {
    const stringValue = String(value);
    let [integerPart, decimalPart] = stringValue.split(".");
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    let formattedValue = "$ " + integerPart;
    if (decimalPart !== undefined) {
      formattedValue += "," + decimalPart;
    }
    return formattedValue;
  };

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
