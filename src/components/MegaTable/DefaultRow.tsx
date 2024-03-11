import React from 'react';
import { BaseRecord, ShowActions } from './MegaTable';
import Actions from './Actions';

interface DefaultRowProps {
  record: BaseRecord;
  keys: string[];
  showActions?: ShowActions;
}

const DefaultRow = ({ record, keys, showActions }: DefaultRowProps) => {
  return (
    <tr>
      {keys.map((key) => {
        const value = record[key as keyof BaseRecord];

        return <td key={key}>{value}</td>;
      })}
      {showActions && (
        <td>
          <Actions record={record} showActions={showActions} />
        </td>
      )}
    </tr>
  );
};

export default DefaultRow;
