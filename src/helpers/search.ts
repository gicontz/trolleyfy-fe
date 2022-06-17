export const escapeRegexCharacters = (str: string): string => {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export function genericFilter<T> (text: string, items: T[], keyFilters: Array<string>) {
  const escapedValue = escapeRegexCharacters(text.trim());
  if (escapedValue === '') return items;

  const regex = new RegExp(`${escapedValue}`, 'i');

  const res = items.filter((item) => {
    for (const key of keyFilters) {
      if ((item as any)[key] && regex.test((item as any)[key])) return true;
    }
    return false;
  });

  return res;
}
