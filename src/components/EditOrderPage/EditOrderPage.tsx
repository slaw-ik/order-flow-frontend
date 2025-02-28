import React, { LegacyRef, useEffect, useRef, useState } from 'react';

import UserSearch from '../UserSearch/UserSearch';
import ClientForm from '../ClientForm/ClientForm';
import ItemSearch from '../ItemSearch/ItemSearch';
import ItemCard from './ItemCard';
import { useAppSelector } from '../../app/hooks';
import { ClientStructure } from '../../features/clients/clientDTOs';
import {
  fetchOrderAsync,
  selectOrder,
  updateOrderAsync,
  updateOrderItems,
  updateOrderState,
} from '../../features/orders/orderSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { ItemStructure } from '../../features/items/itemDTOs';
import TmpItemCard from './TmpItemCard';
import { OrderItemStructure } from '../../features/orderItems/orderItemDTOs';

import './styles.scss';
import { selectClient, setClient } from '../../features/clients/clientSlice';
import { fullAddress } from '../../features/clients/helpers';
import { OrderStructure } from '../../features/orders/orderDTOs';
import { useNavigate } from 'react-router-dom';
import { multiplyAndFormat } from '../../utils/numbers';

interface EditOrderPageProps {
  id: string;
}

const EditOrderPage = ({ id }: EditOrderPageProps) => {
  const ref: LegacyRef<HTMLDivElement> = useRef(null);
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState(0);
  const [tmpOrderItem, setTmpOrderItem] = useState<OrderItemStructure | null>(null);
  const [disabledCreateButton, setDisabledCreateButton] = useState(true);

  const dispatch = useDispatch<AppDispatch>();
  const order = useAppSelector(selectOrder);
  const client = useAppSelector(selectClient);

  const setOrdersUser = (client: ClientStructure) => {
    const ordersUser: OrderStructure = {
      clientId: client.id!,
      phone: client.phone,
      country: client.address?.country,
      note: client.address?.note,
      city: client.address?.city,
      region: client.address?.region,
      street: client.address?.street,
      postCode: client.address?.postCode,
      building: client.address?.building,
      flat: client.address?.flat,
      client: client,
      state: 'pending',
    };

    dispatch(updateOrderState(ordersUser));
  };

  const handleAdd = (orderItem: OrderItemStructure) => {
    const { itemId, count, price, item } = orderItem;
    const newOrderItem: OrderItemStructure = { itemId, count, price, item };

    const orderItems: OrderItemStructure[] = order.orderItems ? [newOrderItem, ...order.orderItems] : [newOrderItem];

    dispatch(updateOrderItems(orderItems));
    setTmpOrderItem(null);
  };

  const handleCancel = () => {
    setTmpOrderItem(null);
  };

  const handleDelete = (item: ItemStructure) => {
    let orderItems: OrderItemStructure[] = [];

    if (order.orderItems) {
      orderItems = order.orderItems.filter((orderItem) => orderItem.itemId !== item.id);
    }

    dispatch(updateOrderItems(orderItems));
  };

  const handleEdit = (orderItem: OrderItemStructure) => {
    setTmpOrderItem(orderItem);
    handleDelete(orderItem.item!);

    ref.current?.scrollIntoView({
      behavior: 'smooth',
    });
  };

  const handleItemSelected = (item: ItemStructure) => {
    const orderItem = order.orderItems && order.orderItems.find((orderItem) => orderItem.itemId === item.id);

    if (orderItem) {
      handleEdit(orderItem);
    } else {
      setTmpOrderItem({
        itemId: item.id,
        count: 1,
        price: item.price,
        item,
      });
    }
  };

  const handleUpdateOrder = () => {
    dispatch(updateOrderAsync(order)).then(() => {
      navigate(`/orders/${order.id}`);
    });
  };

  const totalPrice = () => {
    if (!order.orderItems) {
      return 0;
    }

    return order.orderItems.reduce((acc, item) => {
      return acc + multiplyAndFormat(item.count || 0, item.price || 0);
    }, 0);
  };

  useEffect(() => {
    setDisabledCreateButton(!(order.clientId && order.clientId > 0 && order.orderItems && order.orderItems.length > 0));
  }, [order, order.clientId, order.orderItems]);

  useEffect(() => {
    if (order.client) {
      dispatch(setClient(order.client));
    }
  }, [order.client]);

  useEffect(() => {
    dispatch(fetchOrderAsync(id));
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-8">
          <div className="row">
            <div className="col-lg-12">
              <ul className="nav nav-tabs">
                <li className="nav-item">
                  <a className={`nav-link ${activeTab === 0 && 'active'}`} onClick={() => setActiveTab(0)}>
                    Client
                  </a>
                </li>
                <li className="nav-item">
                  <a className={`nav-link ${activeTab === 1 && 'active'}`} onClick={() => setActiveTab(1)}>
                    Items
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className={`row ${activeTab !== 0 && 'visually-hidden'}`}>
            <div className="col-lg-12">
              <div className="row mb-3">
                <UserSearch onUserSelect={setOrdersUser} />
              </div>

              <div className="row">
                <ClientForm afterUpdateCallback={setOrdersUser} disableNameFields={true} />
              </div>
            </div>
          </div>

          <div className={`row ${activeTab !== 1 && 'visually-hidden'}`}>
            <div className="col-lg-12">
              <div className="row mb-3" ref={ref}>
                <ItemSearch onItemSelect={handleItemSelected} />
              </div>

              <div className="row">
                <div className="col-lg-12">
                  {tmpOrderItem && (
                    <TmpItemCard item={tmpOrderItem} onAddClick={handleAdd} onCancelClick={handleCancel} />
                  )}
                </div>
              </div>

              <hr />

              <div className="row">
                {order.orderItems &&
                  order.orderItems.map((orderItem: OrderItemStructure) => (
                    <div className="col-lg-12" key={orderItem.itemId}>
                      <ItemCard
                        key={orderItem.itemId}
                        item={orderItem as OrderItemStructure}
                        onDeleteClick={handleDelete}
                        onEditClick={handleEdit}
                      />
                    </div>
                  ))}
              </div>

              <div className="row">
                <div className="col-lg-12">
                  <div className="row my-4">
                    <div className="col-sm-6"></div>
                    <div className="col-sm-6">
                      <div className="text-sm-end mt-2 mt-sm-0">
                        <button className="btn btn-success" disabled={disabledCreateButton} onClick={handleUpdateOrder}>
                          Update
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-4">
          <div className="mt-5 mt-lg-0">
            <div className="card border shadow-none">
              <div className="card-header bg-transparent border-bottom py-3 px-4">
                <h5 className="font-size-16 mb-0">
                  Order Summary <span className="float-end">#{order.id}</span>
                </h5>
              </div>
              <div className="card-body p-4 pt-2">
                <div className="table-responsive">
                  <table className="table mb-0">
                    <tbody>
                      {/*<tr>*/}
                      {/*  <td>Sub Total :</td>*/}
                      {/*  <td className="text-end">$ 780</td>*/}
                      {/*</tr>*/}
                      {/*<tr>*/}
                      {/*  <td>Discount :</td>*/}
                      {/*  <td className="text-end">- $ 78</td>*/}
                      {/*</tr>*/}
                      {/*<tr>*/}
                      {/*  <td>Shipping Charge :</td>*/}
                      {/*  <td className="text-end">$ 25</td>*/}
                      {/*</tr>*/}
                      {/*<tr>*/}
                      {/*  <td>Estimated Tax :</td>*/}
                      {/*  <td className="text-end">$ 18.20</td>*/}
                      {/*</tr>*/}
                      <tr className="bg-light">
                        <th>Total :</th>
                        <td className="text-end">
                          <span className="fw-bold">$ {totalPrice()}</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div
                  className="table-responsive"
                  style={{
                    padding: '0.75rem',
                  }}
                >
                  <h3 className="h6">Address :</h3>
                  <div className="row">
                    <div className="col-sm-12">
                      <i className="bi bi-instagram mr-5"></i>
                      <strong>{order.client?.nickname}</strong>
                    </div>
                    <div className="col-sm-12">
                      <i className="bi bi-person-fill mr-5" />
                      <span>
                        {order.client?.firstName || client.firstName} {order.client?.lastName || client.lastName}
                      </span>
                    </div>
                    <div className="col-sm-12">
                      <i className="bi bi-house-door-fill mr-5"></i>
                      {fullAddress(order)}
                    </div>
                    <div className="col-sm-12">
                      <i className="bi bi-telephone-fill mr-5"></i>
                      {order.phone}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditOrderPage;
