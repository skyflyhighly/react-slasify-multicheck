import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MultiCheck, MutlicheckProps } from "./MultiCheck";
// TODO more tests

let props: MutlicheckProps = {
  label: "MultiCheck",
  options: [
    { label: "aaa", value: "111" },
    { label: "bbb", value: "222" },
    { label: "ccc", value: "333" },
    { label: "ddd", value: "444" },
    { label: "eee", value: "555" },
    { label: "fff", value: "666" },
    { label: "ggg", value: "777" },
    { label: "hhh", value: "888" },
    { label: "iii", value: "999" },
  ],
  values: ["111", "222", "333", "444", "555", "666", "777", "888", "999"],
  columns: 1,
};

describe("MultiCheck", () => {
  describe("initialize", () => {
    it("renders the label if label provided", () => {
      render(<MultiCheck {...props} />);
      const labelElement = screen.queryByRole("heading");
      expect(labelElement?.textContent).toBe(props.label);
    });
    it("renders the checkboxs if options and values provided", () => {
      render(<MultiCheck {...props} />);
      const checkboxElements = screen.queryAllByRole(
        "checkbox"
      ) as HTMLInputElement[];
      const checkedCheckboxElements = checkboxElements.filter(
        (item) => item.checked
      );
      expect(checkedCheckboxElements).toHaveLength(props.options.length + 1);
    });
    it("renders the checkboxs if options and values are not provided", () => {
      delete props.values;
      render(<MultiCheck {...props} />);
      const checkboxElements = screen.queryAllByRole(
        "checkbox"
      ) as HTMLInputElement[];
      const unCheckedCheckboxElements = checkboxElements.filter(
        (item) => item.checked === false
      );
      expect(unCheckedCheckboxElements).toHaveLength(props.options.length + 1);
    });
  });

  describe("check checkboxes", () => {
    it("all checkboxes should be checked when check Select All checkbox", async () => {
      props.values = [];
      render(<MultiCheck {...props} />);
      const checkboxElements = screen.queryAllByRole(
        "checkbox"
      ) as HTMLInputElement[];
      const selectAllCheckboxElement = checkboxElements[0];
      await fireEvent.click(selectAllCheckboxElement);
      expect(checkboxElements.filter((item) => item.checked)).toHaveLength(
        props.options.length + 1
      );
    });
    it("all checkboxes should be unchecked when uncheck Select All checkbox", async () => {
      props.values = [
        "111",
        "222",
        "333",
        "444",
        "555",
        "666",
        "777",
        "888",
        "999",
      ];
      render(<MultiCheck {...props} />);
      const checkboxElements = screen.queryAllByRole(
        "checkbox"
      ) as HTMLInputElement[];
      const selectAllCheckboxElement = checkboxElements[0];
      await fireEvent.click(selectAllCheckboxElement);
      expect(
        checkboxElements.filter((item) => item.checked === false)
      ).toHaveLength(props.options.length + 1);
    });
    it("Select All checkbox should be checked when all checkboxes are checked", () => {
      render(<MultiCheck {...props} />);
      const checkboxElements = screen.queryAllByRole(
        "checkbox"
      ) as HTMLInputElement[];
      const selectAllCheckboxElement = checkboxElements[0];
      expect(selectAllCheckboxElement.checked).toBe(true);
    });
    it("Select All checkbox should be unchecked when one of the checkboxes is not checked", () => {
      props.values = ["111", "222", "333", "444", "555", "666", "777", "888"];
      render(<MultiCheck {...props} />);
      const checkboxElements = screen.queryAllByRole(
        "checkbox"
      ) as HTMLInputElement[];
      const selectAllCheckboxElement = checkboxElements[0];
      expect(selectAllCheckboxElement.checked).toBe(false);
    });
    it("first checkbox should be checked when check the first checkbox", async () => {
      props.values = [];
      render(<MultiCheck {...props} />);
      const checkboxElements = screen.queryAllByRole(
        "checkbox"
      ) as HTMLInputElement[];
      const selectFirstCheckboxElement = checkboxElements[1];
      await fireEvent.click(selectFirstCheckboxElement);
      expect(selectFirstCheckboxElement.checked).toBe(true);
    });
    it("first checkbox should be unchecked when uncheck the first checkbox", async () => {
      props.values = [
        "111",
        "222",
        "333",
        "444",
        "555",
        "666",
        "777",
        "888",
        "999",
      ];
      render(<MultiCheck {...props} />);
      const checkboxElements = screen.queryAllByRole(
        "checkbox"
      ) as HTMLInputElement[];
      const selectFirstCheckboxElement = checkboxElements[1];
      await fireEvent.click(selectFirstCheckboxElement);
      expect(selectFirstCheckboxElement.checked).toBe(false);
    });
  });
});
