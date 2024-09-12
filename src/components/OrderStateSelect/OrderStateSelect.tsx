import React, { ChangeEvent, useState } from 'react';

interface OrderStateSelectProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const OrderStateSelect = ({ value, onChange }: OrderStateSelectProps) => {
  const options = [
    { value: 'pending', label: 'Pending' },
    { value: 'packed', label: 'Packed' },
    { value: 'shipped', label: 'Shipped' },
  ];

  const [selectedValue, setSelectedValue] = useState(value);

  const handleOnChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(e.target.value);
    onChange(e);
  };

  return (
    <select className="form-select" onChange={handleOnChange} value={selectedValue}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default OrderStateSelect;
