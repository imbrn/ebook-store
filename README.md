# E-book Store

Web client for an e-book store application. This client was developed with React
and it's easy to be connected to a back-end service.

## Features

- Single Page Application;
- Pluggable service architecture;
- Customer data validation;
- Credit card and boleto as payment methods;

## Application architecture

The application architecture works the following way:

- This application client is a web application developed with React. It uses a
  default architecture for fetching e-books and requesting purchase from a
  configured _service_.

- An Single Page Application is provided for customers access. The customers can
  select e-books from a list of available e-books and request purchases.

- The client application talks with the current _service_ to provide a real
  application workflow.

## How to use?

For you to use this application with your application back-end service, your
first need to have an application back-end ready to be connected. Then you have
to edit the `src/main.js` file and point to your service implementation by
using the `setService` function.

_Look at the [service](#the-service-object) section to get more information about
how to provide a service connector._

### The _service_ object

The service object must supply two main functions, and an optional one:

- **fetchAllEbooks**: it must return a promise which resolves to a list of
  [e-books](#e-book-data-structure) available to sell.

- **requestBuy**: it receives a list of [e-books](#e-book-data-structure) an
  the [customer data](#customer-data) ready to be processed by a back-end
  service.

- **searchZipCode**: it receives a zip code and returns a promise with resolves
  to an object containing a `state` and `city` related to the specified `zipCode`.
  It is already implemented using the [viacep](http://viacep.com.br/) service
  (Brasil only).

### E-book data structure

An e-book is composed by the following data:

- **ID**: unique identifier for the e-book in the system;
- **title**: the title for the e-book _(minimum 1 character)_
- **description**: a description of the e-book _(optional, minimum 1 character)_
- **price**: price of the e-book in cents _(number)_

> The application searches for e-book thumbs at the URL:
> `public/images/ebooks/{ebook-id}.png`

### Customer data

The customer data are composed by the following:

- personal data: _(personal information about the customer)_

  - **name**: the customer's full name _(minimum 2 characters)_
  - **email**: the customer e-mail address _(valid email address)_
  - **cpf**: brazilian valid CPF _(valid CPF)_

- billing address:

  - **zipCode**: brazilian CEP _(valid CEP)_
  - **state**: the address state _(minimum 2 characters)_
  - **city**: city _(minimum 2 characters)_
  - **address**: the full address with street, number and optionals (_minimum 1 character)_

- payment:

  - **method**: _"boleto"_ or _"creditCard"_

  _when "creditCard":_

  - **cardholderName**: the name as in the card _(minimum 2 characters)_
  - **cardNumber**: the number of the credit card _(valid VISA or MASTER card number)_
  - **dueDate**: expiration date of the card _(month/year)_
  - **cvv**: cvv of the card (_minimum 3, maximum 4 characters)_

### Building

First of all you need to install the application dependencies. Run:

```shell
npm install
```

#### Testing

To run tests for the application code to guarantee that it works properly, you
should run:

- To test this application client in watching mode, run:

  ```shell
  npm test -- --watch
  ```

  _this will fire up a jest instance in watch mode._

- or you can just run:

  ```shell
  npm test
  ```

  _and this is going to run your test once._

### Development mode

To run this application in development mode, run:

```shell
npm run dev
```

_this is going to launch a local server with hot-reload for you to test your
application._

So you can access it at: http://localhost:3000

### Building application

When the application is ready to be deployed, you should run this command:

```shell
npm run build
```

this is going to build your application for production. A `dist` folder will be
created with your application ready to be deployed.

---

Developed with ❤ by Bruno C. Couto ([imbrn](https://github.com/imbrn))
