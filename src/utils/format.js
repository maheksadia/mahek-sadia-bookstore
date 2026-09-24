export function formatPrice(price) {
  if (price === null || price === undefined) return 'TBA'
  return `₹${price.toLocaleString('en-IN')}`
}

export function statusLabel(status) {
  return status === 'coming-soon' ? 'Coming Soon' : 'Available'
}
