import React, { PureComponent } from "react";
import { connect } from "react-redux";
import Purchase from "../purchase/components/Purchase";
import { fetchAllEbooks } from "../ebook/actions";

class Root extends PureComponent {
  componentDidMount() {
    this.props.fetchAllEbooks();
  }

  render() {
    return (
      <div>
        <Purchase />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  fetchAllEbooks: () => dispatch(fetchAllEbooks())
});

export default connect(
  null,
  mapDispatchToProps
)(Root);
