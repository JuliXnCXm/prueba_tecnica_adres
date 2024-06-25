import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import AcquisitionItem from "./AcquisitionItem";
import "../styles/components/AcquisitionList.css";

const AcquisitionList = ({ acquisitions, handleOpen }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Cantidad de ítems por página

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = acquisitions.slice(indexOfFirstItem, indexOfLastItem);

  // Cambia de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    setCurrentPage(1); // Reiniciar a la primera página cuando cambien las adquisiciones
  }, [acquisitions]);

  return (
    <>
      <div className="container-table">
        <Table className="mb-0">
          <thead className="table-header">
            <tr className="table-header_row">
              <th>Unidad</th>
              <th>Tipo de Bien o Servicio</th>
              <th>Proveedor</th>
              <th>Cantidad</th>
              <th>Valor Unitario</th>
              <th>Valor Total</th>
              <th>Fecha de Adquisición</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {currentItems.map((acquisition, index) => (
              <tr key={index} className="table-body_row">
                <AcquisitionItem
                  acquisition={acquisition}
                  handleOpen={handleOpen}
                />
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <ul className="pagination">
        {Array.from(
          { length: Math.ceil(acquisitions.length / itemsPerPage) },
          (_, index) => (
            <li
              key={index}
              className={`page-item ${
                currentPage === index + 1 ? "active" : ""
              }`}
            >
              <button onClick={() => paginate(index + 1)} className="page-link">
                {index + 1}
              </button>
            </li>
          )
        )}
      </ul>
    </>
  );
};

export default AcquisitionList;
