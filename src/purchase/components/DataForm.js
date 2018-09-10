import React, { PureComponent, Fragment } from "react";
import StepPanel, { StepPanelField, Button, Select } from "./StepPanel";
import nanoid from "nanoid";
import { connect } from "react-redux";
import { requestBuy } from "../actions";
import { hasEbooksSelected } from "../selectors";
import { getService } from "../../service";
import personalDataValidation from "../validation/personalData";

import billingAddressValidation, {
  zipCode as zipCodeValidation
} from "../validation/billingAddress";

import creditCardValidation from "../validation/creditCard";

export class DataForm extends PureComponent {
  constructor(props) {
    super(props);

    const values = {
      personalData: {
        name: "",
        email: "",
        cpf: ""
      },
      billingAddress: {
        zipCode: "",
        state: "",
        city: "",
        address: ""
      },
      payment: {
        method: "",
        cardholderName: "",
        cardNumber: "",
        dueDate: "",
        cvv: ""
      },
      ...props.initialValues
    };

    this.state = {
      values,
      touched: {
        personalData: {},
        billingAddress: {},
        payment: {}
      },
      errors: {
        personalData: {},
        billingAddress: {},
        payment: {}
      }
    };

    this.changePaymentMethod = this.changePaymentMethod.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    const prevZipCode = prevState.values.billingAddress.zipCode;
    const zipCode = this.state.values.billingAddress.zipCode;

    if (prevZipCode != zipCode && zipCodeValidation.test(zipCode)) {
      this.autoFillAddress(zipCode);
    }
  }

  autoFillAddress(zipCode) {
    getService()
      .searchZipCode(zipCode)
      .then(({ uf, localidade }) => {
        this.setInnerState("values", "billingAddress", {
          state: uf || "",
          city: localidade || ""
        });
      })
      .catch(() => {
        /* Don't do anything */
      });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {this.renderPersonalData()}
        {this.renderBillingAddress()}
        {this.renderPayment()}
      </form>
    );
  }

  renderPersonalData() {
    const { values, touched, errors } = this.state;

    const nameId = nanoid(8);
    const emailId = nanoid(8);
    const cpfId = nanoid(8);

    return (
      <StepPanel
        number="1"
        title="Personal data"
        open={this.isPersonalDataOpen()}
      >
        <StepPanelField
          fieldId={nameId}
          name="personalData.name"
          label="Name"
          placeholder="Your name here"
          error={touched.personalData.name && errors.personalData.name}
          value={values.personalData.name}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
        />

        <StepPanelField
          fieldId={emailId}
          name="personalData.email"
          label="E-mail"
          placeholder="Your e-mail here"
          error={touched.personalData.email && errors.personalData.email}
          value={values.personalData.email}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
        />

        <StepPanelField
          fieldId={cpfId}
          name="personalData.cpf"
          label="CPF"
          placeholder="Your CPF here"
          error={touched.personalData.cpf && errors.personalData.cpf}
          value={values.personalData.cpf}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
        />
      </StepPanel>
    );
  }

  renderBillingAddress() {
    const { values, touched, errors } = this.state;

    const zipCodeId = nanoid(8);
    const stateId = nanoid(8);
    const cityId = nanoid(8);
    const addressId = nanoid(8);

    return (
      <StepPanel
        number="2"
        title="Billing Address"
        open={this.isBillingAddressOpen()}
      >
        <StepPanelField
          fieldId={zipCodeId}
          name={"billingAddress.zipCode"}
          label="Zip code"
          placeholder="14530000"
          error={
            touched.billingAddress.zipCode && errors.billingAddress.zipCode
          }
          value={values.billingAddress.zipCode}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
        />

        <StepPanelField
          component={Select}
          options={states}
          fieldId={stateId}
          name={"billingAddress.state"}
          label="State"
          placeholder="Your state here"
          error={touched.billingAddress.state && errors.billingAddress.state}
          value={states.find(it => it.value === values.billingAddress.state)}
          onChange={this.handleSelectChange("billingAddress.state")}
          onBlur={this.handleBlur}
        />

        <StepPanelField
          fieldId={cityId}
          name={"billingAddress.city"}
          label="City"
          placeholder="Your city here"
          error={touched.billingAddress.city && errors.billingAddress.city}
          value={values.billingAddress.city}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
        />

        <StepPanelField
          fieldId={addressId}
          name={"billingAddress.address"}
          label="Address"
          placeholder="Your full address here"
          error={
            touched.billingAddress.address && errors.billingAddress.address
          }
          value={values.billingAddress.address}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
        />
      </StepPanel>
    );
  }

  renderPayment() {
    const { values } = this.state;

    return (
      <StepPanel number="3" title="Payment" open={this.isPaymentOpen()}>
        <Button
          type="button"
          data-method="boleto"
          selected={values.payment.method === "boleto"}
          onClick={this.changePaymentMethod}
        >
          Boleto Bancário
        </Button>

        <Button
          type="button"
          data-method="creditCard"
          selected={values.payment.method === "creditCard"}
          onClick={this.changePaymentMethod}
        >
          Credit Card
        </Button>

        {values.payment.method === "creditCard"
          ? this.renderCreditCardPayment()
          : null}

        <Button highlighted type="submit" disabled={!this.isReadyToSend()}>
          Buy now
        </Button>
      </StepPanel>
    );
  }

  renderCreditCardPayment() {
    const { values, touched, errors } = this.state;

    const cardholderNameId = nanoid(8);
    const cardNumberId = nanoid(8);
    const dueDateId = nanoid(8);
    const cvvId = nanoid(8);

    return (
      <Fragment>
        <StepPanelField
          fieldId={cardholderNameId}
          name={"payment.cardholderName"}
          label="Cardholder name"
          placeholder="Your name here"
          error={
            touched.payment.cardholderName && errors.payment.cardholderName
          }
          value={values.payment.cardholderName}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
        />

        <StepPanelField
          fieldId={cardNumberId}
          name={"payment.cardNumber"}
          label="Card number"
          placeholder="1234567891011121"
          error={touched.payment.cardNumber && errors.payment.cardNumber}
          value={values.payment.cardNumber}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
        />

        <StepPanelField
          fieldId={dueDateId}
          name={"payment.dueDate"}
          label="Due date"
          placeholder="12/25"
          error={touched.payment.dueDate && errors.payment.dueDate}
          value={values.payment.dueDate}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
        />

        <StepPanelField
          fieldId={cvvId}
          name={"payment.cvv"}
          label="CVV"
          placeholder="123"
          error={touched.payment.cvv && errors.payment.cvv}
          value={values.payment.cvv}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
        />
      </Fragment>
    );
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.requestBuy(this.state.values);
  }

  handleChange(e) {
    const [section, name] = e.target.name.split(".");
    this.setInnerState("values", section, {
      [name]: e.target.value
    });
  }

  handleSelectChange(selectName) {
    return option => {
      const [section, name] = selectName.split(".");
      this.setInnerState("values", section, {
        [name]: option.value
      });
    };
  }

  handleBlur(e) {
    const [section, name] = e.target.name.split(".");
    this.setInnerState("touched", section, {
      [name]: true
    });
  }

  changePaymentMethod(e) {
    this.setInnerState("values", "payment", {
      method: e.target.dataset.method
    });
  }

  isPersonalDataOpen() {
    return hasEbooksSelected(this.props.purchase);
  }

  isBillingAddressOpen() {
    return (
      this.isPersonalDataOpen() &&
      personalDataValidation.test(this.state.values.personalData)
    );
  }

  isPaymentOpen() {
    return (
      this.isBillingAddressOpen() &&
      billingAddressValidation.test(this.state.values.billingAddress)
    );
  }

  isReadyToSend() {
    const creditCard = { ...this.state.values.payment };
    delete creditCard.method;
    return (
      this.isPaymentOpen() &&
      (this.state.values.payment.method === "boleto" ||
        creditCardValidation.test(creditCard))
    );
  }

  setInnerState(type, section, newValues) {
    this.setState(prevState => {
      const typeValues = prevState[type];
      const sectionValues = typeValues[section];
      return {
        ...prevState,
        [type]: {
          ...typeValues,
          [section]: {
            ...sectionValues,
            ...newValues
          }
        }
      };
    });
  }
}

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

DataForm.defaultProps = {
  requestBuy: () => {}
};

const mapStateToProps = state => ({
  purchase: state.purchase
});

const mapDispatchToProps = dispatch => ({
  requestBuy: data => dispatch(requestBuy(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DataForm);
