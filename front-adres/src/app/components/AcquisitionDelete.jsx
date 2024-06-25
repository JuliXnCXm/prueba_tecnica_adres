import React from 'react'
import useAcquisitions from '../hooks/useAcquisitions';
import "../styles/components/AcquisitionDelete.css";

const AcquisitionDelete = ({ acquisitionId, handleClose }) => {
  const { handleDeleteAcquisition } = useAcquisitions();
  return (
    <div className="delete-container">
      <h4 className="delete-container_title">Eliminar Adquisicion</h4>
      <p className="delete-description">
        Esta seguro que quiere Eliminar la adquisicion?
        <br/>Esta accion eliminara el historico de la adquisicion</p>
      <div className="delete-buttons">
        <button onClick={() => handleDeleteAcquisition(acquisitionId)}>
          Continuar
        </button>
        <button onClick={() => handleClose()}>Cancelar</button>
      </div>
    </div>
  );
};

export default AcquisitionDelete
