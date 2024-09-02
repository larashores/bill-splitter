export function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function prefix(pre: string, value: string): string {
  return value ? pre + value : value;
}
