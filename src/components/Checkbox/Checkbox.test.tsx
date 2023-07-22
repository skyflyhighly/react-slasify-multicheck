import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Checkbox, CheckboxProps } from "./Checkbox";

let props: CheckboxProps = {
  label: "aaa",
  checked: true,
  onChange: (checked: boolean) => {
    props.checked = !checked;
  },
};

describe("Checkbox", () => {
  describe("initialize", () => {
    it("render the label if label provided", () => {
      render(<Checkbox {...props} />);
      const labelElement = screen.queryByText(props.label);
      expect(labelElement?.textContent).toBe(props.label);
    });
    it("render the checked checkbox when the checked props is true", () => {
      render(<Checkbox {...props} />);
      const checkboxElement = screen.queryByRole(
        "checkbox"
      ) as HTMLInputElement;
      expect(checkboxElement.checked).toBe(true);
    });
    it("render the checked checkbox when the checked props is false", () => {
      props.checked = false;
      render(<Checkbox {...props} />);
      const checkboxElement = screen.queryByRole(
        "checkbox"
      ) as HTMLInputElement;
      expect(checkboxElement.checked).toBe(false);
    });
  });

  describe("check checkbox", () => {
    it("checkbox should be unchecked when uncheck", async () => {
      render(<Checkbox {...props} />);
      const checkboxElement = screen.queryByRole(
        "checkbox"
      ) as HTMLInputElement;
      await fireEvent.click(checkboxElement);
      expect(checkboxElement.checked).toBe(false);
    });
    it("checkbox should be checked when check", async () => {
      render(<Checkbox {...props} />);
      const checkboxElement = screen.queryByRole(
        "checkbox"
      ) as HTMLInputElement;
      await fireEvent.click(checkboxElement);
      expect(checkboxElement.checked).toBe(true);
    });
  });
});
