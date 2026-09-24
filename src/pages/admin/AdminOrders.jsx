// Orders must be listed from a real database once payments are live —
// wire this to GET /api/admin/orders (protected route) once the backend
// in /api is deployed. See README.md → "Managing orders".
export default function AdminOrders() {
  return (
    <div className="text-sm text-ink/60 bg-parchment border border-line rounded-sm p-6 leading-relaxed max-w-lg">
      No orders yet. Once the backend and payment gateway are connected
      (README.md → "Connecting a real payment gateway"), every completed
      purchase will appear here with the buyer's email, book, amount and
      download status.
    </div>
  )
}
