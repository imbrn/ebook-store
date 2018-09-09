import React from "react";
import { EbooksList } from "./EbooksList";
import { PersonalDataForm } from "./PersonalDataForm";
import { BillingAddressForm } from "./BillingAddressForm";
import { PaymentForm } from "./PaymentForm";
import { Text } from "../../common/components";

export const Purchase = ({ ebooks, purchase, ...rest }) => {
  return (
    <div>
      <header>
        <Text bold>E-book Store</Text>
      </header>
      <div>
        {purchase.status.type === "success" ? (
          <Success purchase={purchase} />
        ) : (
          <PurchaseForm ebooks={ebooks} purchase={purchase} {...rest} />
        )}
      </div>
      <footer>
        <div>
          <Text bold>E-book Store</Text>
          <Text>Powered by EBANX • Products B2B</Text>
        </div>
      </footer>
    </div>
  );
};

const Success = ({ purchase }) => <div>Purchase done with success</div>;

const PurchaseForm = ({
  ebooks,
  purchase,
  toggleEbookSelection,
  updatePersonalData,
  updateBillingAddress,
  updatePayment,
  buy
}) => (
  <div>
    <EbooksList
      selectedEbooks={purchase.selectedEbooks}
      ebooks={ebooks}
      toggleEbookSelection={toggleEbookSelection}
    />

    <PersonalDataForm
      personalData={purchase.personalData}
      updatePersonalData={updatePersonalData}
    />

    <BillingAddressForm
      billingAddress={purchase.billingAddress}
      updateBillingAddress={updateBillingAddress}
    />

    <PaymentForm
      payment={purchase.payment}
      updatePayment={updatePayment}
      requestPurchase={buy}
    />
  </div>
);
