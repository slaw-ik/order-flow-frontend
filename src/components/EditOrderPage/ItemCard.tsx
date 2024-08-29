import React from 'react';
import { ItemStructure } from '../../features/items/itemDTOs';
import { OrderItemStructure } from '../../features/orderItems/orderItemDTOs';

import './ItemCard.scss';
import { multiplyAndFormat } from '../../utils/numbers';

interface ItemCardProps {
  item: OrderItemStructure;
  onDeleteClick?: (item: ItemStructure) => void;
  onEditClick?: (item: ItemStructure) => void;
}

const ItemCard = ({ item: orderItem, onDeleteClick, onEditClick }: ItemCardProps) => {
  const item = orderItem.item;

  const handleDelete = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (onDeleteClick && item) {
      onDeleteClick(item);
    }
  };

  const handleEdit = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (onEditClick && item) {
      onEditClick(item);
    }
  };

  return (
    <div className="card border shadow-none">
      <div className="card-body">
        <div className="d-flex align-items-start border-bottom pb-3">
          <div className="me-4">
            <img src="https://www.bootdey.com/image/380x380/008B8B/000000" alt="" className="avatar-lg rounded" />
          </div>
          <div className="flex-grow-1 align-self-center overflow-hidden">
            <div>
              <h5 className="text-truncate font-size-18">
                <a href="#" className="text-dark">
                  {item && item.name}
                </a>
              </h5>

              <p className="mb-0 mt-1">
                Description : <span>{item && item.description}</span>
              </p>
            </div>
          </div>
          <div className="flex-shrink-0 ms-2">
            <ul className="list-inline mb-0 font-size-16">
              <li className="list-inline-item">
                <a href="#" className="text-muted px-1 fs-3" onClick={handleEdit}>
                  <i className="bi bi-pencil blue-on-hover" />
                </a>
              </li>
              <li className="list-inline-item">
                <a href="#" className="text-muted px-1 fs-3" onClick={handleDelete}>
                  <i className="bi bi-trash3 red-on-hover" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div>
          <div className="row">
            <div className="col-md-4">
              <div className="mt-3">
                <p className="text-muted mb-2">Price</p>
                <h5 className="mb-0 mt-2">${orderItem.price}</h5>
              </div>
            </div>
            <div className="col-md-5">
              <div className="mt-3">
                <p className="text-muted mb-2">Quantity</p>
                <div className="d-inline-flex col-md-5">
                  <input type="number" className="form-control" value={orderItem.count} disabled={true} />
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="mt-3">
                <p className="text-muted mb-2">Total</p>
                <h5>${(orderItem.price || 0) * (orderItem.count || 1)}</h5>
                <h5>${multiplyAndFormat(orderItem.price || 0, orderItem.count || 1)}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
