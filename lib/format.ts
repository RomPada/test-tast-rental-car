export function formatPrice(price: string | number): string {
  const value = typeof price === 'number' ? price : Number(String(price).replace(/[^0-9.]/g, ''));
  return Number.isFinite(value) ? `$${value}` : String(price);
}

export function formatMileage(value: number): string {
  return `${value.toLocaleString('en-US')} km`;
}

export function formatCarTitle(brand: string, model: string, year: number): string {
  return `${brand} ${model}, ${year}`;
}
