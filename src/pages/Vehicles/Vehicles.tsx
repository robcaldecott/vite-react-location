import { useState, useEffect, ReactNode } from "react";
import { useIntl, FormattedMessage } from "react-intl";
import { Link, useMatch } from "@tanstack/react-location";
import {
  ChevronRightIcon,
  InformationCircleIcon,
  PlusIcon,
} from "@heroicons/react/solid";
import {
  Paper,
  List,
  ListItem,
  ListItemText,
  Text,
  SearchField,
  ResponsiveFab,
} from "@/components";
import type { Vehicle, LocationGenerics } from "@/types";
import { useFilter } from "@/providers";

const NoResults = () => (
  <div className="p-8 flex flex-col items-center space-y-4">
    <InformationCircleIcon className="text-indigo-700 dark:text-indigo-400 h-16 w-16" />

    <Text variant="h2" component="h2" align="center">
      <FormattedMessage
        id="noResultsTitle"
        defaultMessage="No matching vehicles found."
      />
    </Text>

    <Text variant="body1" align="center" color="secondary">
      <FormattedMessage
        id="noResultsMessage"
        defaultMessage="Please try a different filter."
      />
    </Text>
  </div>
);

interface BadgeProps {
  children: ReactNode;
}

const Badge = ({ children }: BadgeProps) => (
  <span className="rounded-full px-2 inline-flex h-5 min-w-[20px] justify-center items-center bg-sky-700 dark:bg-sky-500 text-white font-sans text-xs font-medium">
    {children}
  </span>
);

const filterItems = (data: Vehicle[], filter: string) =>
  data.filter((vehicle) => {
    if (filter === "") {
      return true;
    }
    const re = new RegExp(filter, "i");
    const description = `${vehicle.manufacturer} ${vehicle.model} ${vehicle.type} ${vehicle.fuel}`;
    return description.search(re) !== -1;
  });

export const Vehicles = () => {
  const {
    data: { vehicles = [] },
  } = useMatch<LocationGenerics>();
  const intl = useIntl();
  const { filter, setFilter } = useFilter();
  const [items, setItems] = useState(filterItems(vehicles, filter));
  useEffect(
    () => void setItems(filterItems(vehicles, filter)),
    [filter, vehicles]
  );

  return (
    <>
      <div className="max-w-5xl mx-auto mb-24">
        <Paper
          aria-label={intl.formatMessage({
            id: "vehicleList",
            defaultMessage: "Vehicle list",
          })}
        >
          <div className="p-4 border-b border-b-slate-300 bg-sky-50 dark:bg-sky-900">
            <div className="flex items-center flex-wrap md:flex-nowrap space-y-4 md:space-y-0">
              <div className="flex grow basis-full items-center space-x-2">
                <Text variant="h2" component="h1">
                  <FormattedMessage
                    id="vehiclesTitle"
                    defaultMessage="Vehicles"
                  />
                </Text>
                <Badge>{items.length}</Badge>
              </div>

              <SearchField
                value={filter}
                onChange={(event) => setFilter(event.target.value)}
                placeholder={intl.formatMessage({
                  id: "searchPlaceholder",
                  defaultMessage: "Search",
                })}
                className="basis-full md:basis-1/3"
              />
            </div>
          </div>

          {items.length === 0 ? (
            <NoResults />
          ) : (
            <List dividers>
              {items.map((vehicle) => (
                <ListItem
                  button
                  key={vehicle.id}
                  component={Link}
                  to={`/vehicles/${vehicle.id}`}
                  preload={1}
                >
                  <ListItemText
                    primary={`${vehicle.manufacturer} ${vehicle.model} ${vehicle.type} ${vehicle.fuel}`}
                    secondary={vehicle.registrationNumber}
                  />
                  <ChevronRightIcon className="h-6 w-6 text-slate-500 shrink-0" />
                </ListItem>
              ))}
            </List>
          )}
        </Paper>
      </div>

      <ResponsiveFab
        component={Link}
        to="/create"
        icon={PlusIcon}
        label={
          <FormattedMessage
            id="createVehicle"
            defaultMessage="Create Vehicle"
          />
        }
      />
    </>
  );
};
