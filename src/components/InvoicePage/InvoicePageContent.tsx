import React from 'react';
import { OrderStructure } from '../../features/orders/orderDTOs';
import { prettifyDate } from '../../utils/dateTime';
import { fullAddress } from '../../features/clients/helpers';

import './styles.scss';

type OrderProps = {
  order: OrderStructure;
};

const InvoicePageContent = ({ order }: OrderProps) => {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="grid invoice">
              <div className="grid-body">
                <div className="invoice-title">
                  <div className="row">
                    <div className="col-sm-6">
                      <h2>
                        invoice
                        <br />
                        <span className="small">order #{order.id}</span>
                      </h2>
                    </div>
                    <div className="col-sm-6 text-end">
                      <div className="btn-group print-button">
                        <button className="btn btn-outline-primary" onClick={() => window.print()}>
                          Print <i className="bi bi-printer" />
                        </button>
                        <a href={`/orders/${order.id}`} className="btn btn-outline-danger">
                          Back <i className="bi bi-box-arrow-left" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-6">
                    <address>
                      <strong>Shipped To:</strong>
                      <br />
                      {order.client?.nickname}
                      <br />
                      {order.client?.firstName} {order.client?.lastName}
                      <br />
                      {fullAddress(order)}
                      <br />
                      Tel.: {order.phone}
                    </address>
                  </div>
                  <div className="col-sm-6 text-end">
                    <address>
                      <strong>Order Date:</strong>
                      <br />
                      {prettifyDate(order.createdAt)}
                      <br />
                      <br />
                    </address>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <h3>ORDER SUMMARY</h3>
                    <table className="table table-striped">
                      <thead>
                        <tr className="line">
                          <td style={{ width: '5%' }}>
                            <strong>#</strong>
                          </td>
                          <td className="text-center" style={{ width: '50%' }}>
                            <strong>ITEM</strong>
                          </td>
                          <td className="text-center" style={{ width: '15%' }}>
                            <strong>COUNT</strong>
                          </td>
                          <td className="text-right" style={{ width: '15%' }}>
                            <strong>PRICE</strong>
                          </td>
                          <td className="text-right" style={{ width: '15%' }}>
                            <strong>SUBTOTAL</strong>
                          </td>
                        </tr>
                      </thead>
                      <tbody>
                        {order.orderItems &&
                          order.orderItems.map((item, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>
                                <strong>{item.item?.name}</strong>
                                <br />
                                {item.item?.description}
                              </td>
                              <td className="text-center">{item.count}</td>
                              <td className="text-right">${item.price}</td>
                              <td className="text-right">${item.total}</td>
                            </tr>
                          ))}
                        <tr className="line">
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                        </tr>
                        <tr>
                          <td colSpan={4}></td>
                          <td className="text-right">
                            <strong>${order.total}</strong>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InvoicePageContent;
