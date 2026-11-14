import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import PageLoader from "./components/common/PageLoader";
import { router } from "./routes";

export default function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}