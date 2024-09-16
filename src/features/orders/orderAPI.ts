import { OrdersState, OrderState } from './ordersSlice';
import { API_URL } from '../API';
import { OrderStateType, OrderStructure, toActiveRecordStructure } from './orderDTOs';

export async function fetchOrders(page: number) {
  return fetch(`${API_URL}/orders.json?page=${page}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .catch((err) => {
      console.log('Error: ', err);
      return {} as OrdersState;
    });
}

export async function fetchOrder(orderId: string) {
  return fetch(`${API_URL}/orders/${orderId}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .catch((err) => {
      console.log('Error: ', err);
      return {} as OrderState;
    });
}

export async function createOrder(payload: OrderStructure) {
  return fetch(`${API_URL}/orders.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      order: toActiveRecordStructure(payload),
    }),
  })
    .then((res) => res.json())
    .catch((err) => {
      console.log('Error: ', err);
      return {} as OrdersState;
    });
}

export async function updateOrder(payload: OrderStructure) {
  return fetch(`${API_URL}/orders/${payload.id}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      order: toActiveRecordStructure(payload),
    }),
  })
    .then((res) => res.json())
    .catch((err) => {
      console.log('Error: ', err);
      return {} as OrdersState;
    });
}

export async function changeOrderState(orderId: string, state: OrderStateType) {
  return fetch(`${API_URL}/orders/${orderId}/change_state.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      state,
    }),
  })
    .then((res) => res.json())
    .catch((err) => {
      console.log('Error: ', err);
      return {} as OrdersState;
    });
}
