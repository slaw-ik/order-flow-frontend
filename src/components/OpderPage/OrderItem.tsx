import React from 'react';
import { MegaLink } from '../MegaLink/MegaLink';

type OrderItemProps = {
  orderItem: any;
};

const OrderItem = ({ orderItem }: OrderItemProps) => {
  return (
    <MegaLink className="row py-2 border order-item" href={`/items/${orderItem.item.id}`}>
      <div className="col-lg-2 order-item-image">
        <img src="https://www.bootdey.com/image/200x200/008B8B/000000" className="rounded" />
      </div>
      <div className="col-lg-8 d-flex align-items-center">
        <div>
          <h6 className="mt-0">{orderItem.item?.name}</h6>
          <p className="my-0">{orderItem.item?.description}</p>
        </div>
      </div>
      <div className="col-lg-2 d-flex align-items-center justify-content-end">
        <div>
          <h6 className="mt-0 d-flex  justify-content-end">€ {orderItem.item?.price}</h6>
          <p className="my-0 d-flex  justify-content-end">Qt: {orderItem.count}</p>
        </div>
      </div>
    </MegaLink>
  );
};

export default OrderItem;
