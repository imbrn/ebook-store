import React from "react";
import StepPanel, { StepPanelField, TextField } from "./StepPanel";
import { Formik } from "formik";
import nanoid from "nanoid";

export const PersonalDataForm = ({
  number,
  title,
  open,
  personalData,
  updatePersonalData
}) => {
  const handleInputChange = (e, handleChange) => {
    updatePersonalData({
      [e.target.name]: e.target.value
    });
    handleChange(e);
  };

  const nameFieldId = nanoid(8);
  const emailFieldId = nanoid(8);
  const cpfFieldId = nanoid(8);

  return (
    <StepPanel number={number} title={title} open={open}>
      <Formik
        onSubmit={e => e.preventDefault()}
        initialValues={personalData}
        render={({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit
        }) => (
          <form onSubmit={handleSubmit}>
            <StepPanelField
              name="name"
              label="Name"
              placeholder="Your name here"
              fieldId={nameFieldId}
              error={touched.name && errors.name}
              component={TextField}
              value={values.name}
              onChange={e => handleInputChange(e, handleChange)}
              onBlur={handleBlur}
            />

            <StepPanelField
              name="email"
              label="E-email"
              placeholder="Your e-mail here"
              fieldId={emailFieldId}
              error={touched.email && errors.email}
              component={TextField}
              value={values.email}
              onChange={e => handleInputChange(e, handleChange)}
              onBlur={handleBlur}
            />

            <StepPanelField
              name="cpf"
              label="CPF"
              placeholder="Your CPF here"
              fieldId={cpfFieldId}
              error={touched.cpf && errors.cpf}
              component={TextField}
              value={values.cpf}
              onChange={e => handleInputChange(e, handleChange)}
              onBlur={handleBlur}
            />
          </form>
        )}
      />
    </StepPanel>
  );
};

PersonalDataForm.defaultProps = {
  number: 1,
  title: "Personal data",
  open: true,
  personalData: {
    name: "",
    email: "",
    cpf: ""
  }
};
