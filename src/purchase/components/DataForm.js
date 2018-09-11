import React, { PureComponent, Fragment } from "react";
import StepPanel, { StepPanelField, Button, Select } from "./StepPanel";
import nanoid from "nanoid";
import styles from "./DataForm.css";
import { connect } from "react-redux";
import { requestBuy } from "../actions";
import { hasEbooksSelected } from "../selectors";
import { getService } from "../../service";
import BarCodeSvg from "../../common/icons/bar-code.svg";
import CreditCardSvg from "../../common/icons/credit-card.svg";

import personalDataValidation, {
  name as nameValidation,
  email as emailValidation,
  cpf as cpfValidation
} from "../validation/personalData";

import billingAddressValidation, {
  zipCode as zipCodeValidation,
  state as stateValidation,
  city as cityValidation,
  address as addressValidation
} from "../validation/billingAddress";

import creditCardValidation, {
  cardholderName as cardholderNameValidation,
  cardNumber as cardNumberValidation,
  dueDate as dueDateValidation,
  cvv as cvvValidation
} from "../validation/creditCard";

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

    // Validations
    this.validations = {
      personalData: {
        name: {
          fn: nameValidation,
          message: "Invalid name"
        },
        email: {
          fn: emailValidation,
          message: "E-mail address invalid"
        },
        cpf: {
          fn: cpfValidation,
          message: "Invalid CPF"
        }
      },
      billingAddress: {
        zipCode: {
          fn: zipCodeValidation,
          message: "Invalid zip code"
        },
        state: {
          fn: stateValidation,
          message: "Invalid state"
        },
        city: {
          fn: cityValidation,
          message: "Invalid city name"
        },
        address: {
          fn: addressValidation,
          message: "Invalid full address"
        }
      },
      payment: {
        cardholderName: {
          fn: cardholderNameValidation,
          message: "Invalid cardholder name"
        },
        cardNumber: {
          fn: cardNumberValidation,
          message: "Invalid card number"
        },
        dueDate: {
          fn: dueDateValidation,
          message: "Invalid due date"
        },
        cvv: {
          fn: cvvValidation,
          message: "Invalid CVV"
        }
      }
    };
  }

  componentDidUpdate(prevProps, prevState) {
    this.validateAll(prevState.values, this.state.values, []);

    const prevZipCode = prevState.values.billingAddress.zipCode;
    const zipCode = this.state.values.billingAddress.zipCode;

    if (prevZipCode != zipCode && zipCodeValidation.test(zipCode)) {
      this.autoFillAddress(zipCode);
    }
  }

  validateAll(prevValues, values, keys) {
    Object.keys(values).forEach(key => {
      if (typeof values[key] === "object") {
        this.validateAll(prevValues[key], values[key], [...keys, key]);
      } else {
        if (prevValues[key] !== values[key]) {
          this.validateOne([...keys, key], values[key]);
        }
      }
    });
  }

  validateOne([section, name], value) {
    const validation = this.validations[section][name];
    if (validation && !validation.fn.test(value)) {
      this.setInnerState("errors", section, {
        [name]: validation.message
      });
    } else {
      this.setInnerState("errors", section, {
        [name]: null
      });
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
        childrenClassName={styles.stepPanelContent}
        number="1"
        title="Personal data"
        open={this.isPersonalDataOpen()}
      >
        <StepPanelField
          className={styles.personalDataName}
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
          className={styles.personalDataEmail}
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
          className={styles.personalDataCpf}
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
        childrenClassName={styles.stepPanelContent}
        number="2"
        title="Billing Address"
        open={this.isBillingAddressOpen()}
      >
        <StepPanelField
          className={styles.billingAddressZipCode}
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
          className={styles.billingAddressState}
          component={Select}
          options={states}
          fieldId={stateId}
          name={"billingAddress.state"}
          label="State"
          placeholder="Your state here"
          error={touched.billingAddress.state && errors.billingAddress.state}
          value={states.find(it => it.value === values.billingAddress.state)}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
        />

        <StepPanelField
          className={styles.billingAddressCity}
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
          className={styles.billingAddressAddress}
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
      <StepPanel
        number="3"
        title="Payment"
        open={this.isPaymentOpen()}
        childrenClassName={styles.stepPanelContent}
      >
        <Button
          className={styles.paymentMethodButton}
          type="button"
          data-method="boleto"
          selected={values.payment.method === "boleto"}
          onClick={this.changePaymentMethod}
        >
          <BarCodeSvg />
          Boleto Bancário
        </Button>

        <Button
          className={styles.paymentMethodButton}
          type="button"
          data-method="creditCard"
          selected={values.payment.method === "creditCard"}
          onClick={this.changePaymentMethod}
        >
          <CreditCardSvg />
          Credit Card
        </Button>

        {values.payment.method === "creditCard"
          ? this.renderCreditCardPayment()
          : null}

        <Button
          className={styles.paymentBuyNowButton}
          highlighted
          type="submit"
          disabled={!this.isReadyToSend()}
        >
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
          className={styles.creditCardCardholderName}
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
          className={styles.creditCardCardholderName}
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
          className={styles.creditCardDueDate}
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
          className={styles.creditCardCvv}
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

  handleBlur(e) {
    const [section, name] = e.target.name.split(".");
    this.setInnerState("touched", section, {
      [name]: true
    });
    this.touch(section, name);
  }

  touch(section, name) {
    this.setInnerState("touched", section, {
      [name]: true
    });
  }

  changePaymentMethod(e) {
    this.setInnerState("values", "payment", {
      method: e.currentTarget.dataset.method
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
