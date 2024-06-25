import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import '../styles/components/AcquisitionItem.css';
import AcquisitionActions from "./AcquisitionActions";
import useAcquisitions from "../hooks/useAcquisitions";


const AcquisitionItem = ({ acquisition }) => {
  const [active, setActive] = useState(null);
  const { handleUpdateAcquisition, formatDate , formatCurrency} = useAcquisitions();

  useEffect(() => {
    setActive(acquisition.active);
  } , [acquisition])

  const handleChange = (e) => {
    const isChecked = e.target.checked;
    setActive(e.target.checked);
    handleUpdateAcquisition(acquisition.id, { active: isChecked });
  };

  return (
    <>
      <td>{acquisition.section}</td>
      <td>{acquisition.type}</td>
      <td>{acquisition.supplier}</td>
      <td>{acquisition.quantity}</td>
      <td>{formatCurrency(acquisition.unit_value)}</td>
      <td>{formatCurrency(acquisition.total_value)}</td>
      <td>{formatDate(acquisition.acquisition_date)}</td>
      <td>
        <Form.Check
          type="switch"
          id="custom-switch"
          checked={active}
          onChange={handleChange}
        />
      </td>
      <td>
        <AcquisitionActions acquisition={acquisition} />{" "}
      </td>
    </>
  );
};

export default AcquisitionItem;
