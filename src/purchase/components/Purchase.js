import React, { Fragment } from "react";
import { Text } from "../../common/components";
import { connect } from "react-redux";
import EbooksList from "./EbooksList";
import DataForm from "./DataForm";

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
        return renderPurchaseSuccess();
      case "fail":
        return renderPurchaseFail();
      case "initial":
        return renderPurchasing();
      default:
        return null;
    }
  };

  const renderPurchaseSuccess = () => <div>Purchase success</div>;
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
    <div>
      <header>
        <Text bold size="medium">
          E-book Store
        </Text>
      </header>

      <div>{renderContent()}</div>

      <footer>
        <div>
          <Text bold>E-book Store</Text>
          <Text>Powered by EBANX • Products B2B</Text>
        </div>
      </footer>
    </div>
  );
};

const mapStateToProps = state => ({
  ebooks: state.ebooks,
  purchase: state.purchase
});

export default connect(mapStateToProps)(Purchase);
