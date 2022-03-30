import { useState } from "react";
import type { ReactNode } from "react";
import { useIntl, FormattedMessage, FormattedNumber } from "react-intl";
import { useMatch, useNavigate } from "@tanstack/react-location";
import {
  Breadcrumbs,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
} from "@/components";
import type { LocationGenerics } from "@/types";
import { deleteVehicle } from "@/queries";
import { DeleteDialog } from "./DeleteDialog";

interface SwatchProps {
  color: string;
}

const Swatch = ({ color }: SwatchProps) => (
  <div className="flex space-x-1 items-center">
    <span
      className="h-4 w-4 rounded-full inline-block border border-slate-300"
      style={{ backgroundColor: color.replace(/ /g, "") }}
    />
    <span>{color.charAt(0).toUpperCase() + color.slice(1)}</span>
  </div>
);

interface FieldProps {
  id: string;
  label: ReactNode;
  value: ReactNode;
}

const Field = ({ id, label, value }: FieldProps) => (
  <>
    <dt
      id={id}
      className="font-sans text-base font-medium mt-4 first:mt-0 text-slate-900 dark:text-white"
    >
      {label}
    </dt>
    <dd
      className="font-sans text-base font-normal text-slate-500 dark:text-slate-300"
      aria-labelledby={id}
    >
      {value}
    </dd>
  </>
);

export const Details = () => {
  const {
    data: { vehicle },
  } = useMatch<LocationGenerics>();
  const intl = useIntl();
  const [showDialog, setShowDialog] = useState(false);
  const navigate = useNavigate();

  if (vehicle === undefined) {
    return null;
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Breadcrumbs registrationNumber={vehicle.registrationNumber} />

      <Card
        aria-label={intl.formatMessage({
          id: "vehicleDetails",
          defaultMessage: "Vehicle details",
        })}
      >
        <CardHeader
          title={`${vehicle.manufacturer} ${vehicle.model} ${vehicle.type}`}
          subheader={vehicle.registrationNumber}
          divider
        />
        <CardContent divider>
          <dl>
            {/* Color */}
            <Field
              id="color"
              label={<FormattedMessage id="color" defaultMessage="Colour" />}
              value={<Swatch color={vehicle.color} />}
            />

            {/* Fuel */}
            <Field
              id="fuel"
              label={<FormattedMessage id="fuel" defaultMessage="Fuel" />}
              value={vehicle.fuel}
            />

            {/* VIN */}
            <Field
              id="vin"
              label={<FormattedMessage id="vin" defaultMessage="VIN" />}
              value={vehicle.vin}
            />

            {/* Mileage */}
            <Field
              id="mileage"
              label={<FormattedMessage id="mileage" defaultMessage="Mileage" />}
              value={<FormattedNumber value={vehicle.mileage} />}
            />

            {/* Registration date */}
            <Field
              id="date"
              label={
                <FormattedMessage
                  id="registrationDate"
                  defaultMessage="Registration date"
                />
              }
              value={
                <FormattedMessage
                  id="fullRegistrationDate"
                  defaultMessage="{date, date, full}"
                  values={{ date: new Date(vehicle.registrationDate) }}
                />
              }
            />
          </dl>
        </CardContent>
        <CardActions>
          <Button
            variant="error"
            onClick={() => {
              setShowDialog(true);
            }}
          >
            <FormattedMessage
              id="deleteVehicle"
              defaultMessage="Delete vehicle"
            />
          </Button>
        </CardActions>
      </Card>

      <DeleteDialog
        open={showDialog}
        onClose={() => setShowDialog(false)}
        onDelete={async () => {
          await deleteVehicle(vehicle.id);
          navigate({ to: "/" });
        }}
      />
    </div>
  );
};
