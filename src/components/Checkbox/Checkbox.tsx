import "./Checkbox.css";

import React from "react";
import { FC, memo } from "react";

export type CheckboxProps = {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
};

export const Checkbox: FC<CheckboxProps> = memo(
  ({ label, checked, onChange }) => {
    return (
      <label className="container">
        {label}
        <input
          type="checkbox"
          checked={checked}
          onChange={() => onChange(checked)}
        />
        <span className="checkmark"></span>
      </label>
    );
  }
);
