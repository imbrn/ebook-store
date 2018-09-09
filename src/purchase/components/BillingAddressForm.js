import React, { PureComponent } from "react";
import { Formik } from "formik";
import StepPanel, { StepPanelField, TextField, Select } from "./StepPanel";
import nanoid from "nanoid";
import { getService } from "../../service";

export class BillingAddressForm extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidUpdate(prevProps) {
    const { billingAddress } = this.props;
    if (prevProps.billingAddress.zipCode !== billingAddress.zipCode) {
      this.autoFillAddress(billingAddress.zipCode);
    }
  }

  autoFillAddress(zipCode) {
    getService()
      .searchZipCode(zipCode)
      .then(result => {
        const { updateBillingAddress } = this.props;
        updateBillingAddress({
          zipCode: 123,
          state: result.state,
          city: result.city
        });
      })
      .catch(() => {
        updateBillingAddress({
          zipCode: "1234"
        });
        throw new Error("Error");
      });
  }

  render() {
    return <BillingAddressFormComponent {...this.props} />;
  }
}

const BillingAddressFormComponent = ({
  open,
  number,
  title,
  billingAddress,
  updateBillingAddress
}) => {
  const handleInputChange = (e, handleChange) => {
    updateBillingAddress({
      [e.target.name]: e.target.value
    });

    handleChange(e);
  };

  const zipCodeFieldId = nanoid(8);
  const stateFieldId = nanoid(8);
  const cityFieldId = nanoid(8);
  const addressFieldId = nanoid(8);

  return (
    <StepPanel open={open} number={number} title={title}>
      <Formik
        onSubmit={e => e.preventDefault()}
        initialValues={billingAddress}
        render={({
          values,
          touched,
          errors,
          handleChange,
          handleBlur,
          handleSubmit
        }) => (
          <form onSubmit={handleSubmit}>
            <StepPanelField
              component={TextField}
              fieldId={zipCodeFieldId}
              label="Zip code"
              placeholder="Your zip code here"
              name="zipCode"
              value={values.zipCode}
              error={touched.zipCode && errors.zipCode}
              onChange={e => handleInputChange(e, handleChange)}
              onBlur={handleBlur}
            />

            <StepPanelField
              component={Select}
              fieldId={stateFieldId}
              label="State"
              placeholder="Your state here"
              name="state"
              options={states}
              value={values.state}
              error={touched.state && errors.state}
              onChange={e => handleInputChange(e, handleChange)}
              onBlur={handleBlur}
            />

            <StepPanelField
              component={TextField}
              fieldId={cityFieldId}
              label="City"
              placeholder="Your city here"
              name="city"
              value={values.city}
              error={touched.city && errors.city}
              onChange={e => handleInputChange(e, handleChange)}
              onBlur={handleBlur}
            />

            <StepPanelField
              component={TextField}
              fieldId={addressFieldId}
              label="Address"
              placeholder="Your full address here"
              name="address"
              value={values.address}
              error={touched.address && errors.address}
              onChange={e => handleInputChange(e, handleChange)}
              onBlur={handleBlur}
            />
          </form>
        )}
      />
    </StepPanel>
  );
};

BillingAddressFormComponent.defaultProps = {
  open: true,
  number: 2,
  title: "Billing Address",
  billingAddress: {
    zipCode: "",
    state: "",
    city: "",
    address: ""
  },
  updateBillingAddress: () => {}
};

const states = [
  { label: "Acre", value: "AC" },
  { label: "Alagoas", value: "AL" },
  { label: "Amapá", value: "AP" },
  { label: "Amazonas", value: "AM" },
  { label: "Bahia", value: "BA" },
  { label: "Ceará", value: "CE" },
  { label: "Distrito Federal", value: "DF" },
  { label: "Espírito Santo", value: "ES" },
  { label: "Goiás", value: "GO" },
  { label: "Maranhão", value: "MA" },
  { label: "Mato Grosso", value: "MT" },
  { label: "Mato Grosso do Sul", value: "MS" },
  { label: "Minas Gerais", value: "MG" },
  { label: "Pará", value: "PA" },
  { label: "Paraíba", value: "PB" },
  { label: "Paraná", value: "PR" },
  { label: "Pernambuco", value: "PE" },
  { label: "Piauí", value: "PI" },
  { label: "Rio de Janeiro", value: "RJ" },
  { label: "Rio Grande do Norte", value: "RN" },
  { label: "Rio Grande do Sul", value: "RS" },
  { label: "Rondônia", value: "RO" },
  { label: "Roraima", value: "RR" },
  { label: "Santa Catarina", value: "SC" },
  { label: "São Paulo", value: "SP" },
  { label: "Sergipe", value: "SE" },
  { label: "Tocantins", value: "TO" }
];

export default BillingAddressForm;
