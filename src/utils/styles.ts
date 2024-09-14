export const badgeColor = (state: string) => {
  switch (state) {
    case 'packed':
      return 'badge-soft-primary';
    case 'shipped':
      return 'badge-soft-success';
    case 'cancelled':
      return 'badge-soft-danger';
    default:
      return 'badge-soft-info';
  }
};
