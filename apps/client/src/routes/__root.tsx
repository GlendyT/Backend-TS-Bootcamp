import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import PageHeader from '@/components/Layouts/PageHeader'

export const Route = createRootRoute({
  notFoundComponent: () => {
    return (
      <div className="h-screen flex flex-col text-4xl items-center justify-center text-center text-white font-extrabold">
        <p>Not found!</p>
        <Link to="/products" className="hover:text-blue-600">
          Go home
        </Link>
      </div>
    )
  },
  component: () => (
    <div className="h-screen flex flex-col bg-gradient-to-r from-slate-900 via-cyan-900 to-indigo-900">
      <PageHeader />
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
      <ReactQueryDevtools />
    </div>
  ),
})
