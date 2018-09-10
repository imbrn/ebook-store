import React from "react";
import { render } from "react-dom";
import App from "./App";
import { setService } from "./service";

// Via cep
function searchZipCode(zipCode) {
  return fetch(`http://viacep.com.br/ws/${zipCode}/json/`).then(resp =>
    resp.json()
  );
}

// Mock service
setService({
  // Mock fetch all ebooks
  fetchAllEbooks: () => {
    return Promise.resolve([
      {
        id: 1,
        name: "Insights",
        description: "The best ecommerce overview in Latin America",
        price: 7590
      },
      {
        id: 2,
        name: "Aliexpress",
        description:
          "Pratical guide for to do excellent purchases in Aliexpress ",
        price: 6325
      },
      {
        id: 3,
        name: "Clothes sizes",
        description: "Complete guide about clothes sizes from China",
        price: 8990
      }
    ]);
  },
  // Mock request buy function
  requestBuy: () => {
    return Promise.resolve({
      id: 1234
    });
  },
  // Mock search zip code function
  searchZipCode
});

render(<App />, document.querySelector("#app"));
