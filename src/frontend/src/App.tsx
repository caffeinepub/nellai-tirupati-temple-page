import {
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import HomePage from "./pages/HomePage";
import TempleDetailPage from "./pages/TempleDetailPage";

const rootRoute = createRootRoute();

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const templeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/temple/nellai-tirupati",
  component: TempleDetailPage,
});

const routeTree = rootRoute.addChildren([homeRoute, templeRoute]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
