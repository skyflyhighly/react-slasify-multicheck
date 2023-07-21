import React from "react";
import { FC, memo } from "react";

type Props = {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
};

export const Checkbox: FC<Props> = memo(({ label, checked, onChange }) => {
  return (
    <div>
      <input
        type="checkbox"
        checked={checked}
        onChange={() => onChange(checked)}
      />
      <span>{label}</span>
    </div>
  );
});
