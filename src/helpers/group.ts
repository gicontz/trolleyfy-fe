import { IItem } from "../api/inventory/types";

export function groupBy<T> (xs: Array<T>, key: string): { [key: string]: Array<T> } {
  return xs.reduce(function(rv, x) {
    (rv[(x as any)[key]] = rv[(x as any)[key]] || []).push(x);
    return rv;
  }, {} as { [key: string]: Array<T> });
};

export const groupPurchases = (pitms: IItem[]) => {
  const groupedItems = groupBy<IItem>(pitms, 'productCode');
  const objKeys = Object.keys(groupedItems);
  const purchasedItems = objKeys.map((productCode) => {
    const pqty = groupedItems[productCode].length;
    const amt = groupedItems[productCode].map(({price}) => parseInt(price, 10)).reduce((a,b) => a + b);
    return {
      ...groupedItems[productCode][0],
      pqty,
      amt,
    }
  });
  return purchasedItems;
}
