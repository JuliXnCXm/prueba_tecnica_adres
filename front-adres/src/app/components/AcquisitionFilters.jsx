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
  }

  const numericKeys = ["quantity", "unit_value", "total_value", "budget"];


  const [filters, setFilters] = useState({
    ...initialState,
    active: 'Activo',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (numericKeys.includes(name)) {
      if (!/^\d*\.?\d*$/.test(value))  {
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

  const handleKeyPress = (event) => {
    // Obtén el código de la tecla presionada
    const keyCode = event.keyCode || event.which;

    // Permite solo teclas numéricas (0-9) y teclas de navegación (como flechas, retroceso, etc.)
    if (
      !(keyCode >= 48 && keyCode <= 57) && // números del teclado principal
      !(keyCode >= 96 && keyCode <= 105) && // números del teclado numérico
      keyCode !== 8 && // retroceso
      keyCode !== 9 && // tab
      keyCode !== 37 && // flecha izquierda
      keyCode !== 39 && // flecha derecha
      keyCode !== 46
    ) {
      // suprimir
      event.preventDefault();
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    let changedKeys = Object.keys(filters).filter(key => filters[key] !== initialState[key])
    const filteredObject = {};
    changedKeys.forEach((key) => {
      if (numericKeys.includes(key)) {
        filteredObject[key] =
          key === "quantity"
            ? parseInt(filters[key])
            : parseFloat(filters[key]);

      } 
      else if (key === "active") {
        filteredObject[key] = filters[key];
      } else {
        filteredObject[key] = filters[key];
      }
    });
    
    onSubmit(filteredObject);
    window.sessionStorage.setItem("filters", JSON.stringify(filteredObject));
  }

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
              value={ filters.active }
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
