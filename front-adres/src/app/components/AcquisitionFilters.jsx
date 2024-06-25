import React, { useState } from "react";
import { Form, FloatingLabel , OverlayTrigger, Tooltip} from "react-bootstrap";
import "../styles/components/AcquisitionForm.css";

const AcquisitionFilters = ({onSubmit}) => {
  const initialState = {
    section: "",
    budget: 0,
    type: "",
    supplier: "",
    quantity: 0,
    unit_value: 0,
    total_value: 0,
    active: null,
    documentation: "",
  };

  const numericKeys = ["quantity", "unit_value", "total_value", "budget"];

  const [filters, setFilters] = useState({
    ...initialState,
    active: "Activo",
  });

  /**
   * Handles the input change event for the form fields.
   * @param {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>} event - The change event object.
   * @returns {void} - This function does not return any value.
   */
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (numericKeys.includes(name)) {
      if (!/^\d*\.?\d*$/.test(value)) {
        return;
      }
      setFilters({
        ...filters,
        [name]: value,
      });
    } else {
      setFilters({
        ...filters,
        [name]: value,
      });
    }
  };


  /**
   * Handles the key press event for numeric inputs.
   * @param {React.KeyboardEvent} event - The keyboard event object.
   */
  const handleKeyPress = (event) => {

    const keyCode = event.keyCode || event.which;

    if (
      !(keyCode >= 48 && keyCode <= 57) && 
      !(keyCode >= 96 && keyCode <= 105) && 
      keyCode !== 8 && 
      keyCode !== 9 && 
      keyCode !== 37 && 
      keyCode !== 39 && 
      keyCode !== 46
    ) {
      // suprimir
      event.preventDefault();
    }
  };


  /**
   * Handles the form submission.
   * @param {React.FormEvent} e - The form submission event.
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    // Get the keys of the filters object that have been changed from their initial state.
    let changedKeys = Object.keys(filters).filter(key => filters[key] !== initialState[key]);

    // Create an empty object to store the filtered form data.
    const filteredObject = {};

    // Iterate over the changed keys and add the corresponding values to the filteredObject.
    // If the key is a numeric key, parse the value as an integer or float accordingly.
    // Otherwise, add the value as is.
    changedKeys.forEach((key) => {
      if (numericKeys.includes(key)) {
        filteredObject[key] =
          key === "quantity"
            ? parseInt(filters[key])
            : parseFloat(filters[key]);
      } else {
        filteredObject[key] = filters[key];
      }
    });

    // Call the onSubmit function with the filtered form data.
    // Also, store the filtered form data in the session storage.
    onSubmit(filteredObject);
    window.sessionStorage.setItem("filters", JSON.stringify(filteredObject));
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <FloatingLabel controlId="section" label="Unidad">
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip id="tooltip-top">{"Coincidencias"}</Tooltip>}
            >
              <Form.Control
                type="text"
                name="section"
                value={filters.section}
                onChange={handleChange}
                placeholder="Unidad"
              />
            </OverlayTrigger>
          </FloatingLabel>
        </Form.Group>

        <Form.Group className="mb-3">
          <FloatingLabel controlId="type" label="Tipo de Bien o Servicio">
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip id="tooltip-top">{"Coincidencias"}</Tooltip>}
            >
              <Form.Control
                type="text"
                name="type"
                value={filters.type}
                onChange={handleChange}
                placeholder="Tipo de Bien o Servicio"
              />
            </OverlayTrigger>
          </FloatingLabel>
        </Form.Group>

        <Form.Group className="mb-3">
          <FloatingLabel controlId="supplier" label="Proveedor">
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip id="tooltip-top">{"Coincidencias"}</Tooltip>}
            >
              <Form.Control
                type="text"
                name="supplier"
                value={filters.supplier}
                onChange={handleChange}
                placeholder="Proveedor"
              />
            </OverlayTrigger>
          </FloatingLabel>
        </Form.Group>

        <Form.Group className="mb-3">
          <FloatingLabel controlId="quantity" label="Cantidad">
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip id="tooltip-top">{"mayor que"}</Tooltip>}
            >
              <Form.Control
                type="number"
                onKeyDown={handleKeyPress}
                name="quantity"
                value={filters.quantity}
                onChange={handleChange}
                placeholder="Cantidad"
              />
            </OverlayTrigger>
          </FloatingLabel>
        </Form.Group>

        <Form.Group className="mb-3">
          <FloatingLabel controlId="unit_value" label="Valor Unitario">
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip id="tooltip-top">{"mayor que"}</Tooltip>}
            >
              <Form.Control
                type="number"
                name="unit_value"
                onKeyDown={handleKeyPress}
                value={filters.unit_value}
                onChange={handleChange}
                placeholder="Valor Unitario"
              />
            </OverlayTrigger>
          </FloatingLabel>
        </Form.Group>

        <Form.Group className="mb-3">
          <FloatingLabel controlId="total_value" label="Valor Total">
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip id="tooltip-top">{"mayor que"}</Tooltip>}
            >
              <Form.Control
                type="number"
                name="total_value"
                onKeyDown={handleKeyPress}
                value={filters.total_value}
                onChange={handleChange}
                placeholder="Valor Total"
              />
            </OverlayTrigger>
          </FloatingLabel>
        </Form.Group>

        <Form.Group className="mb-3">
          <FloatingLabel controlId="budget" label="Presupuesto">
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip id="tooltip-top">{"Coincidencias"}</Tooltip>}
            >
              <Form.Control
                type="number"
                onKeyDown={handleKeyPress}
                name="budget"
                value={filters.budget}
                onChange={handleChange}
                placeholder="Presupuesto"
              />
            </OverlayTrigger>
          </FloatingLabel>
        </Form.Group>

        <Form.Group className="mb-3">
          <FloatingLabel controlId="active" label="Estado">
            <Form.Select
              name="active"
              value={filters.active}
              onChange={handleChange}
            >
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
              <option value="All">Todos</option>
            </Form.Select>
          </FloatingLabel>
        </Form.Group>

        <Form.Group className="mb-3 documentation-area">
          <FloatingLabel controlId="documentation" label="Documentación">
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip id="tooltip-top">{"Coincidencias"}</Tooltip>}
            >
              <Form.Control
                as="textarea"
                type="text"
                name="documentation"
                value={filters.documentation}
                onChange={handleChange}
                placeholder="Documentación"
              />
            </OverlayTrigger>
          </FloatingLabel>
        </Form.Group>
        <button className="button-form" type="submit">
          Aplicar
        </button>
      </Form>
    </div>
  );
}

export default AcquisitionFilters
