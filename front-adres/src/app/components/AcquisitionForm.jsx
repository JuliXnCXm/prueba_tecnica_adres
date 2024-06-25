import React, { useEffect, useState } from "react";
import { Form, FloatingLabel } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import "../styles/components/AcquisitionForm.css";

const AcquisitionForm = ({
  acquisitionData,
  onSubmit,
  handleClose,
  isCreation,
}) => {
  const [loading, setLoading] = useState(true)
  const [acquisition, setAcquisition] = useState({
    section: "",
    budget: "",
    type: "",
    supplier: "",
    quantity: 0,
    unit_value: 0,
    total_value: 0,
    active: false,
    documentation: "",
  });
  useEffect(() => {
    if (!isCreation) {
      setAcquisition({
        section: acquisitionData?.section,
        budget: acquisitionData?.budget,
        type: acquisitionData?.type,
        supplier: acquisitionData?.supplier,
        quantity: acquisitionData?.quantity,
        unit_value: acquisitionData?.unit_value,
        total_value: acquisitionData?.total_value,
        active: acquisitionData?.active,
        documentation: acquisitionData?.documentation,
      });
    }
    setLoading(false)
  }, [isCreation, acquisitionData]);

  const validationSchema = Yup.object().shape({
    section: Yup.string().required("La unidad es requerida"),
    budget: Yup.number().required("El presupuesto es requerido"),
    type: Yup.string().required("El tipo de bien o servicio es requerido"),
    supplier: Yup.string().required("El proveedor es requerido"),
    quantity: Yup.number()
      .required("La cantidad es requerida")
      .positive("Debe ser un número positivo"),
    unit_value: Yup.number()
      .required("El valor unitario es requerido")
      .positive("Debe ser un número positivo"),
    total_value: Yup.number()
      .required("El valor total es requerido")
      .positive("Debe ser un número positivo"),
    active: Yup.string().required("El estado es requerido"),
    documentation: Yup.string().required("La documentación es requerida"),
  });

  /**
   * Handles the form submission.
   * @param {Object} values - The form values.
   * @param {Object} actions - The Formik actions object.
   */
  const handleSubmit = async (values, { setSubmitting }) => {
    // Check if it's a creation or an update.
    if (await isCreation) {
      // If it's a creation, call the onSubmit function with the form values.
      onSubmit(values);
    } else {
      // If it's an update, call the onSubmit function with the acquisitionData's id and the form values.
      onSubmit(acquisitionData.id, values);
    }
    
    // Close the modal.
    handleClose();
    
    // Reload the page after a short delay (1000 milliseconds).
    // This is a temporary solution; consider a more robust approach to update the data.
    setTimeout(() => {
      window.location.reload();
    }, 1000);
    
    // Set the submitting state to false.
    setSubmitting(false);
  };

  return (
    <>
      {!loading && 
        <>
        <h4>{isCreation ? "Crear Adquisición" : "Editar Adquisición"}</h4>
          <Formik
            initialValues={acquisition}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <FloatingLabel controlId="section" label="Unidad">
                    <Form.Control
                      type="text"
                      name="section"
                      value={values.section}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Unidad"
                      isInvalid={touched.section && !!errors.section}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.section}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>

                <Form.Group className="mb-3">
                  <FloatingLabel controlId="type" label="Tipo de Bien o Servicio">
                    <Form.Control
                      type="text"
                      name="type"
                      value={values.type}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Tipo de Bien o Servicio"
                      isInvalid={touched.type && !!errors.type}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.type}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>

                <Form.Group className="mb-3">
                  <FloatingLabel controlId="supplier" label="Proveedor">
                    <Form.Control
                      type="text"
                      name="supplier"
                      value={values.supplier}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Proveedor"
                      isInvalid={touched.supplier && !!errors.supplier}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.supplier}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-3">
                  <FloatingLabel controlId="quantity" label="Cantidad">
                    <Form.Control
                      type="number"
                      name="quantity"
                      value={values.quantity}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Cantidad"
                      isInvalid={touched.quantity && !!errors.quantity}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.quantity}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>

                <Form.Group className="mb-3">
                  <FloatingLabel controlId="unit_value" label="Valor Unitario">
                    <Form.Control
                      type="number"
                      name="unit_value"
                      value={values.unit_value}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Valor Unitario"
                      isInvalid={touched.unit_value && !!errors.unit_value}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.unit_value}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>

                <Form.Group className="mb-3">
                  <FloatingLabel controlId="total_value" label="Valor Total">
                    <Form.Control
                      type="number"
                      name="total_value"
                      value={values.total_value}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Valor Total"
                      isInvalid={touched.total_value && !!errors.total_value}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.total_value}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>

                <Form.Group className="mb-3">
                  <FloatingLabel controlId="budget" label="Presupuesto">
                    <Form.Control
                      type="number"
                      name="budget"
                      value={values.budget}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Presupuesto"
                      isInvalid={touched.budget && !!errors.budget}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.budget}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>

                <Form.Group className="mb-3">
                  <FloatingLabel controlId="active" label="Estado">
                    <Form.Select
                      name="active"
                      value={values.active}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.active && !!errors.active}
                    >
                      <option value="Activo">Activo</option>
                      <option value="Inactivo">Inactivo</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors.active}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>

                <Form.Group className="mb-3 documentation-area">
                  <FloatingLabel controlId="documentation" label="Documentación">
                    <Form.Control
                      as="textarea"
                      type="text"
                      name="documentation"
                      value={values.documentation}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Documentación"
                      isInvalid={touched.documentation && !!errors.documentation}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.documentation}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>

                <button
                  className="button-form"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isCreation ? "Agregar" : "Actualizar"}
                </button>
              </Form>
            )}
          </Formik>
        </>
      }
    </>
  );
};

export default AcquisitionForm;
