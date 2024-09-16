import React, { ChangeEvent, useState } from 'react';
import { orderStates } from '../../features/orders/orderDTOs';

interface OrderStateSelectProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
}

const OrderStateSelect = ({ value, onChange, disabled }: OrderStateSelectProps) => {
  const options = orderStates.slice(0, -1).map((state) => ({
    value: state,
    label: state.charAt(0).toUpperCase() + state.slice(1),
  }));

  const [selectedValue, setSelectedValue] = useState(value);

  const handleOnChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(e.target.value);
    onChange(e);
  };

  return (
    <select className="form-select" disabled={disabled} onChange={handleOnChange} value={selectedValue}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default OrderStateSelect;
