import React, { useEffect, useState } from 'react'
import useAcquisitions from '../hooks/useAcquisitions'
import "../styles/components/AcquisitionDetailView.css";

const AcquisitionDetailView = ({ acquisitionId }) => {
  const [isDetailView , setIsDetailView] = useState(true)

  const {
    acquisitionDetail,
    handleGetAcquisitionById,
    acquisitionSelectedHistory,
    formatCurrency,
    loading,
    formatDate,
  } = useAcquisitions();

  useEffect(() => {
    handleGetAcquisitionById(acquisitionId);
  }, []);

  return (
    <>
      {loading ? (
        <div>loading</div>
      ) : isDetailView ? (
        <>
          <div className="historyButton" onClick={() => setIsDetailView(false)}>
            <span>History </span>
            <span className="material-icons material-symbols-outlined">
              history
            </span>
          </div>
          <ul className="details-container">
            <li>
              <span>Presupuesto</span>
              <p>{formatCurrency(acquisitionDetail.budget)}</p>
            </li>
            <li>
              <span>Unidad</span>
              <p>{acquisitionDetail.section}</p>
            </li>
            <li>
              <span>Cantidad</span>
              <p>{acquisitionDetail.quantity}</p>
            </li>
            <li>
              <span>Valor unitario</span>
              <p>{formatCurrency(acquisitionDetail.unit_value)}</p>
            </li>
            <li>
              <span>Valor Total</span>
              <p>{formatCurrency(acquisitionDetail.total_value)}</p>
            </li>
            <li>
              <span>Fecha Adquisicion</span>
              <p>{formatDate(acquisitionDetail.acquisition_date)}</p>
            </li>
            <li>
              <span>Proveedor</span>
              <p>{acquisitionDetail.supplier}</p>
            </li>
            <li>
              <span>Documentacion</span>
              <p>{acquisitionDetail.documentation}</p>
            </li>
            <li>
              <span>Ultima Modificacion</span>
              <p>{formatDate(acquisitionDetail.modified_at)}</p>
            </li>
            <li id="stateItem">
              <span>Estado</span>
              <p
                className={
                  acquisitionDetail.active ? "activeState" : "inactiveState"
                }
              >
                {acquisitionDetail.active ? "Activo" : "Inactivo"}
              </p>
            </li>
          </ul>
        </>
      ) : (
        <>
          <div className="historyButton" onClick={() => setIsDetailView(true)}>
            <span>Details </span>
            <span
              className="material-icons material-symbols-outlined"
            >
              info
            </span>
          </div>
          <ul className="history-container">
            {acquisitionSelectedHistory.map((item, idx) => {
              return (
                <li key={idx}>
                  <div className="historyItem">
                    <p>Campo Modificado: {item.field_modified}</p>
                    <p>Valor Anterior: {item.old_value}</p>
                    <p>Valor Actual: {item.new_value}</p>
                    <p>Fecha Modificacion: {formatDate(item.modified_at)}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </>
  );
};

export default AcquisitionDetailView;
