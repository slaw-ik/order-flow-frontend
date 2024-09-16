import React from 'react';
import OrderItem from './OrderItem';
import { OrderItemStructure } from '../../features/orderItems/orderItemDTOs';
import { OrderStructure } from '../../features/orders/orderDTOs';
import OrderStateSelect from '../OrderStateSelect/OrderStateSelect';
import { badgeColor } from '../../utils/styles';
import { prettifyDateTime } from '../../utils/dateTime';
import { AppDispatch } from '../../app/store';
import { useDispatch } from 'react-redux';
import { changeOrderStateAsync } from '../../features/orders/orderSlice';

type OrderProps = {
  order: OrderStructure;
};

const OrderPageContent = ({ order }: OrderProps) => {
  const disabled = !!order.cancelledAt;
  const shipped = !!order.shippedAt;
  const dispatch = useDispatch<AppDispatch>();

  const handleOrderStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (order.state === e.target.value) return;
    if (order.id) {
      dispatch(changeOrderStateAsync({ orderId: order.id.toString(), state: e.target.value }));
    }
  };

  const cancelOrder = () => {
    if (order.id) {
      dispatch(changeOrderStateAsync({ orderId: order.id.toString(), state: 'cancelled' }));
    }
  };

  return (
    <>
      <div className="px-2 py-3">
        <h4>Order Detail</h4>
      </div>

      <div className="row">
        <div className="col-lg-8">
          <div className="card mb-4">
            <div className="card-body">
              <div className="row ">
                <div className="col-lg-12 justify-content-between d-flex">
                  <h5>Order #{order.id}</h5>
                  <div className="d-sm-flex">
                    {!disabled && !shipped && (
                      <div className="me-3">
                        <OrderStateSelect value={order.state!} onChange={handleOrderStateChange} />
                      </div>
                    )}
                    <a
                      className={`btn btn-outline-primary me-3 ${disabled && 'disabled'}`}
                      href={`/orders/${order.id}/invoice`}
                    >
                      <i className="bi bi-printer pe-2"></i>
                      Invoice
                    </a>
                    {!shipped && (
                      <>
                        <a
                          className={`btn btn-primary me-3 ${disabled && 'disabled'}`}
                          href={`/orders/${order.id}/edit`}
                        >
                          <i className="bi bi-pencil pe-2"></i>
                          Edit
                        </a>
                        <button className={`btn btn-danger ${disabled && 'disabled'}`} onClick={cancelOrder}>
                          <i className="bi bi-x pe-2"></i>
                          Cancel
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="row mx-1 my-2 border order-items">
                <div className="col-lg-12">
                  {order.orderItems &&
                    order.orderItems.map((orderItem: OrderItemStructure) => (
                      <OrderItem orderItem={orderItem} key={orderItem.id} />
                    ))}
                </div>
              </div>

              <div className="row mx-1 mt-4">
                <div className="col-lg-2">
                  <h5>Note:</h5>
                </div>
                <div className="col-lg-4">
                  <p>{order.note || '-'}</p>
                </div>
                <div className="col-lg-4 offset-lg-2">
                  <div className="row text-end">
                    <div className="col-lg-6">
                      <h6>Total:</h6>
                    </div>
                    <div className="col-lg-6">
                      <h6>€ {order.total}</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card mb-4">
            <div className="card-body">
              <div className="row">
                <div className="col-lg-12 mx-2">
                  <h5>Customer details</h5>

                  <div className="row mt-4">
                    <div className="col-lg-2">
                      <h6>First Name:</h6>
                    </div>
                    <div className="col-lg-4">
                      <p className="my-1">{order.client?.firstName}</p>
                    </div>
                    <div className="col-lg-2">
                      <h6>Last Name:</h6>
                    </div>
                    <div className="col-lg-4">
                      <p className="my-1">{order.client?.lastName}</p>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-2">
                      <h6>Email:</h6>
                    </div>
                    <div className="col-lg-4">
                      <p className="my-1">{order.client?.email}</p>
                    </div>
                    <div className="col-lg-2">
                      <h6>Phone:</h6>
                    </div>
                    <div className="col-lg-4">
                      <p className="my-1">{order.phone}</p>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-2">
                      <h6>Countru:</h6>
                    </div>
                    <div className="col-lg-4">
                      <p className="my-1">{order.country}</p>
                    </div>
                    <div className="col-lg-2">
                      <h6>Region:</h6>
                    </div>
                    <div className="col-lg-4">
                      <p className="my-1">{order.region}</p>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-2">
                      <h6>City:</h6>
                    </div>
                    <div className="col-lg-4">
                      <p className="my-1">{order.city}</p>
                    </div>
                    <div className="col-lg-2">
                      <h6>Street:</h6>
                    </div>
                    <div className="col-lg-4">
                      <p className="my-1">{order.street}</p>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-2">
                      <h6>Building:</h6>
                    </div>
                    <div className="col-lg-4">
                      <p className="my-1">{order.building}</p>
                    </div>
                    <div className="col-lg-2">
                      <h6>Flat:</h6>
                    </div>
                    <div className="col-lg-4">
                      <p className="my-1">{order.flat}</p>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-2">
                      <h6>ZIP Code:</h6>
                    </div>
                    <div className="col-lg-4">
                      <p className="my-1">{order.postCode}</p>
                    </div>
                    <div className="col-lg-2">
                      <h6>State:</h6>
                    </div>
                    <div className="col-lg-4">
                      <span className={`badge ${badgeColor(order.state)}`}>{order.state}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card mb-4">
            <div className="card-body order-progress">
              <h5 className="mb-4">Activity</h5>

              <div className="row order-progress-item completed">
                <div className="col-lg-1">
                  <div className="progress-check">
                    <i className="bi bi-check-circle-fill"></i>
                  </div>
                </div>
                <div className="col-lg-11">
                  <div className="d-flex justify-content-between">
                    <p className="">Order placed</p>
                    <p className="">{prettifyDateTime(order.createdAt)}</p>
                  </div>
                </div>
              </div>
              <div className={`row order-progress-item ${order.packedAt && 'completed'}`}>
                <div className="col-lg-1">
                  <div className="progress-check">
                    <i className="bi bi-check-circle-fill"></i>
                  </div>
                </div>
                <div className="col-lg-11">
                  <div className="d-flex justify-content-between">
                    <p className="">Order packed</p>
                    <p className="">{prettifyDateTime(order.packedAt)}</p>
                  </div>
                </div>
              </div>
              <div className={`row order-progress-item ${order.shippedAt && 'completed'}`}>
                <div className="col-lg-1">
                  <div className="progress-check">
                    <i className="bi bi-check-circle-fill"></i>
                  </div>
                </div>
                <div className="col-lg-11">
                  <div className="d-flex justify-content-between">
                    <p className="">Order sent</p>
                    <p className="">{prettifyDateTime(order.shippedAt)}</p>
                  </div>
                </div>
              </div>
              {order.cancelledAt && (
                <div className={`row order-progress-item ${order.cancelledAt && 'cancelled'}`}>
                  <div className="col-lg-1">
                    <div className="progress-check">
                      <i className="bi bi-x-circle-fill"></i>
                    </div>
                  </div>
                  <div className="col-lg-11">
                    <div className="d-flex justify-content-between">
                      <p className="">Order cancelled</p>
                      <p className="">{prettifyDateTime(order.cancelledAt)}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderPageContent;
