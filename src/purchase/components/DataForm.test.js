import React from "react";
import { render, cleanup, fireEvent, wait } from "react-testing-library";
import { DataForm } from "./DataForm";
import { fakeEbooks } from "../../ebook/fakeEbook";
import { setService } from "../../service";

jest.mock("nanoid", () => {
  let lastId = 0;
  return () => ++lastId;
});

jest.mock("react-select", () => {
  return props => (
    <input
      type="text"
      {...props}
      value={props.value ? props.value.value : ""}
    />
  );
});

afterEach(cleanup);

test("renders correctly", () => {
  const { container } = render(<DataForm />);
  expect(container.firstChild).toMatchSnapshot();
});

test("search address by zip code", async () => {
  const purchase = {
    ebooks: fakeEbooks(2)
  };

  const initialValues = {
    personalData: {
      name: "Customer Name",
      email: "customer@email.com",
      cpf: "12345678910"
    }
  };

  setService({
    searchZipCode: () => {
      return Promise.resolve({
        state: "SP",
        city: "Miguelópolis"
      });
    }
  });

  const { getByLabelText } = render(
    <DataForm purchase={purchase} initialValues={initialValues} />
  );

  fireEvent.change(getByLabelText("Zip code"), {
    target: { value: "14530000" }
  });

  await wait(
    () => {
      expect(getByLabelText("State").value).toBe("SP");
      expect(getByLabelText("City").value).toBe("Miguelópolis");
    },
    { timeout: 10 }
  );
});
