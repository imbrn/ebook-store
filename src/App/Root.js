import React, { PureComponent } from "react";
import { connect } from "react-redux";
import Purchase from "../purchase/components/Purchase";
import { fetchAllEbooks } from "../ebook/actions";
import { createGlobalStyle } from "styled-components";
import styles from "./Root.css";

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Montserrat:400,700');

  html, body {
    font-family: 'Montserrat', sans-serif;
    font-size: 14px;
  }

  * {
    margin: 0;
    padding: 0;
    font-family: inherit;
    font-size: inherit;
    box-sizing: border-box;
  }
`;

class Root extends PureComponent {
  componentDidMount() {
    this.props.fetchAllEbooks();
  }

  render() {
    return (
      <div className={styles.root}>
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
