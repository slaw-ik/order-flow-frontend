// export const API_URL = 'http://localhost:3000/api';
export const API_URL = 'https://order-flow-1ed780190064.herokuapp.com/api/orders.json/api';

export enum Statuses {
  Initial = 'Not fetched',
  Loading = 'Loading...',
  UpToDate = 'Up to date',
  Deleted = 'Deleted',
  Error = 'Error',
}
