export async function fetchDataCache<T>(url: string) {
  const data: string | null = localStorage.getItem(url);

  if (!data) {
    const res = await fetch('/test.json');
    const data = await res.json();

    localStorage.setItem(url, JSON.stringify(data));

    return data as T;
  } else return JSON.parse(data) as T;
}

export async function saveToLocaleStorage<T>(url: string, data: T) {
  localStorage.setItem(url, JSON.stringify(data));
}

const ignoreSymbols = '[[ ]  ^ $ . | ? * + ( )] \\';
export function toRegexp(value: string): RegExp {
  value = value
    .toString()
    .trim()
    .split('')
    .map((s) => (ignoreSymbols.includes(s) ? '\\' + s : s))
    .join('')
    .trim();

  return new RegExp(value, 'i');
}
