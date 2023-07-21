import "./MultiCheck.css";

import React, { useEffect, useState, useMemo } from "react";
import { FC } from "react";

import { Checkbox } from "../components/Checkbox";

import { arrangeArrayByColumns } from "../utils";

export type Option = {
  label: string;
  value: string;
};

/**
 * Notice:
 * 1. There should be a special `Select All` option with checkbox to control all passing options
 * 2. All the options (including the "Select All") should be split into several columns, and the order is from top to bottom in each column
 */
type Props = {
  // the label text of the whole component
  label?: string;
  // Assume no duplicated labels or values
  // It may contain any values, so be careful for you "Select All" option
  options: Option[];
  // Always be non-negative integer.
  // The default value is 1
  // 0 is considered as 1
  // We only check [0, 1, 2, ... 10], but it should work for greater number
  columns?: number;
  // Which options should be selected.
  // - If `undefined`, makes the component in uncontrolled mode with no default options checked, but the component is still workable;
  // - if not undefined, makes the component in controlled mode with corresponding options checked.
  // - Assume no duplicated values.
  // - It may contain values not in the options.
  values?: string[];
  // if not undefined, when checked options are changed, they should be passed to outside
  // if undefined, the options can still be selected, but won't notify the outside
  onChange?: (options: Option[]) => void;
};

const uniqueValue = Math.random().toString(36).substring(2, 15);

export const MultiCheck: FC<Props> = ({
  label,
  options,
  columns = 1,
  values,
  onChange,
}) => {
  const [internalValues, setInternalValues] = useState<string[]>([]);

  const stepList = useMemo(() => {
    const isSelectedAll =
      options.filter((item) => internalValues.includes(item.value)).length ===
      options.length;
    const filteredList = options.map((item) => {
      return {
        ...item,
        checked: internalValues?.includes(item.value) || false,
      };
    });
    const stepList = [
      {
        label: "Select All",
        value: uniqueValue,
        checked: isSelectedAll,
      },
      ...filteredList,
    ];
    return arrangeArrayByColumns(stepList, columns);
  }, [internalValues, options, columns]);

  useEffect(() => {
    setInternalValues(values || []);
    onChange?.(options.filter((item) => values?.includes(item.value)));
  }, [values]);

  const handleCheckbox = (checked: boolean, value: string): void => {
    let newValues: string[] = [];
    if (value === uniqueValue) {
      newValues = !checked ? options.map((item) => item.value) : [];
    } else {
      newValues = !checked
        ? [...internalValues, value]
        : internalValues?.filter((item) => item !== value) || [];
    }
    setInternalValues(newValues);
    onChange?.(options.filter((item) => newValues?.includes(item.value)));
  };

  return (
    <div>
      {label && <h1>{label}</h1>}
      <ul
        className="MultiCheck"
        style={{
          gridTemplateColumns: "auto ".repeat(columns).trim(),
        }}
      >
        {stepList?.map((item) => (
          <li key={item.value}>
            <Checkbox
              label={item.label}
              checked={item.checked}
              onChange={(value) => handleCheckbox(value, item.value)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
