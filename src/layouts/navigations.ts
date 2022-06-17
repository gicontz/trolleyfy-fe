import { APP_PATHS } from "../constants/paths";

export type TNav = {
  id: string;
  label: string;
  href: string;
};

export const navs: TNav[] = [
  // {
  //   id: 'DASHBOARD',
  //   label: 'Dashboard',
  //   href: APP_PATHS.HOME,
  // },
  {
    id: 'CASHIER',
    label: 'Cashier',
    href: APP_PATHS.CASHIER,
  },
  {
    id: 'INVENTORY',
    label: 'Inventory',
    href: APP_PATHS.INVENTORY,
  },
  {
    id: 'ORDER-HISTORY',
    label: 'Order History',
    href: APP_PATHS.ORDER_HISTORY,
  },
];
