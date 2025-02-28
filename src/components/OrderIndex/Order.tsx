import React from 'react';
import { prettifyDate } from '../../utils/dateTime';
import Actions from '../MegaTable/Actions';
import { OrderStructure } from '../../features/orders/orderDTOs';
import { useNavigate } from 'react-router-dom';
import { badgeColor } from '../../utils/styles';

interface OrderProps {
  record: OrderStructure;
}

const Order = ({ record }: OrderProps) => {
  const { id, state, fullAddress, total, note, createdAt, client } = record;
  const navigate = useNavigate();

  const onClick = (e: React.MouseEvent) => {
    if (['BUTTON', 'A', 'I'].includes((e.target as HTMLElement).nodeName)) {
      return;
    }
    navigate(`/orders/${id}`);
  };

  return (
    <tr className="clickable" onClick={(e) => onClick(e)}>
      <td>{id}</td>
      <td> {client?.name} </td>
      <td>
        <span className={`badge ${badgeColor(state)} mb-0`}>{state}</span>
      </td>
      <td>{client?.nickname}</td>
      <td>{total}</td>
      <td>{prettifyDate(createdAt)}</td>
      <td>
        <Actions record={record} showActions={{ actions: ['show', 'edit', 'delete'] }} resource="orders" />
      </td>
    </tr>
  );
};

export default Order;
