import React, { PureComponent } from "react";
import { connect } from "react-redux";
import Purchase from "../purchase/components/Purchase";
import { fetchAllEbooks } from "../ebook/actions";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Montserrat:400,700');

  html, body {
    font-family: 'Montserrat', sans-serif;
  }

  * {
    margin: 0;
    padding: 0;
    font-family: inherit;
    box-sizing: border-box;
  }
`;

class Root extends PureComponent {
  componentDidMount() {
    this.props.fetchAllEbooks();
  }

  render() {
    return (
      <div>
        <GlobalStyle />
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
