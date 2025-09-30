import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/watchlist')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_layout/watchlist"!</div>
}
