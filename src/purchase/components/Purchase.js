import React, { Fragment } from "react";
import { Text, Separator, Circle } from "../../common/components";
import { connect } from "react-redux";
import EbooksList from "./EbooksList";
import DataForm from "./DataForm";
import styles from "./Purchase.css";
import BarCodeSvg from "../../common/icons/bar-code.svg";
import MasterCardSvg from "../../common/icons/mastercard.svg";
import VisaSvg from "../../common/icons/visa.svg";
import SuccessSvg from "../../common/icons/success.svg";

export const Purchase = ({ ebooks, purchase }) => {
  const renderContent = () => {
    switch (ebooks.status.kind) {
      case "request":
        return renderContentLoading();
      case "fail":
        return renderContentFail();
      case "success":
        return renderContentLoaded();
      default:
        return null;
    }
  };

  const renderContentLoading = () => <div>Loading...</div>;
  const renderContentFail = () => <div>Fail</div>;

  const renderContentLoaded = () => {
    switch (purchase.status.kind) {
      case "success":
        return <PurchaseSuccess purchase={purchase} />;
      case "fail":
        return renderPurchaseFail();
      case "initial":
        return renderPurchasing();
      default:
        return null;
    }
  };

  const renderPurchaseFail = () => <div>Purchase failed</div>;

  const renderPurchasing = () => (
    <Fragment>
      <Text>
        Welcome to the best place for you to learn about Latin América
        E-commerce. Start to learn now and discovery ways options to improve
        your sales.
      </Text>
      <EbooksList />
      <DataForm />
    </Fragment>
  );

  return (
    <div className={styles.root}>
      <header>
        <Text bold size="medium">
          E-book Store
        </Text>
      </header>

      <div>{renderContent()}</div>

      <Separator />

      <footer>
        <div className={styles.about}>
          <Text bold>E-book Store</Text>
          <Text>Powered by EBANX • Products B2B</Text>
        </div>

        <div className={styles.flags}>
          <BarCodeSvg />
          <VisaSvg />
          <MasterCardSvg />
        </div>
      </footer>
    </div>
  );
};

const PurchaseSuccess = ({ purchase }) => {
  const renderMessage = () => {
    if (purchase.status.data.payment.method === "boleto") {
      return (
        <Text>
          The boleto was created with success and sent to email{" "}
          <Text bold>{purchase.status.data.personalData.email}</Text>
        </Text>
      );
    } else {
      return (
        <Text>
          The payment using the credit card{" "}
          <Text bold>
            {hideSomeDigits(purchase.status.data.payment.cardNumber)}
          </Text>{" "}
          was made successfully
        </Text>
      );
    }
  };

  return (
    <div className={styles.purchaseSuccess}>
      <div className={styles.successMessage}>
        <Circle className={styles.successMessageCircle}>
          <SuccessSvg />
        </Circle>
        <Text bold>Purchase realized with success!</Text>
      </div>
      <div>{renderMessage()}</div>
    </div>
  );
};

function hideSomeDigits(number) {
  return number.split("").map((char, index) => {
    if (index > 3 && index < 12) return "*";
    return char;
  });
}

const mapStateToProps = state => ({
  ebooks: state.ebooks,
  purchase: state.purchase
});

export default connect(mapStateToProps)(Purchase);
