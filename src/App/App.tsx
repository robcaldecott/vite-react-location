import { FormattedMessage } from "react-intl";
import { ReactLocation, Router, Outlet } from "@tanstack/react-location";
import { AppHeader } from "@/components";
import { FilterProvider } from "@/providers";
import { Vehicles, Details, Create } from "@/pages";
import { fetchVehicles, fetchVehicle } from "@/queries";
import type { LocationGenerics } from "@/types";

interface AppProps {
  location?: ReactLocation<LocationGenerics>;
}

export const App = ({
  location = new ReactLocation<LocationGenerics>(),
}: AppProps) => (
  <>
    <AppHeader
      title={
        <FormattedMessage id="appTitle" defaultMessage="Vehicle Manager" />
      }
    />

    <FilterProvider>
      <main className="max-w-7xl p-4 mx-auto">
        <Router
          location={location}
          routes={[
            {
              path: "/",
              element: <Vehicles />,
              loader: async () => ({ vehicles: await fetchVehicles() }),
            },
            {
              path: "vehicles/:vehicleId",
              element: <Details />,
              loader: async ({ params: { vehicleId } }) => ({
                vehicle: await fetchVehicle(vehicleId),
              }),
            },
            {
              path: "create",
              element: <Create />,
            },
          ]}
        >
          <Outlet />
        </Router>
      </main>
    </FilterProvider>
  </>
);
