import { jsx } from "@theme-ui/core";
import { FieldProps } from "delta-jsf";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useGeoLocDescription, useLeafletDefaults } from "../../../../hooks";
import { Box } from "../../../containers";
import { Skeleton } from "../../../displays";

const height = "300px";

export const GeoLocPickerField = (props: FieldProps) => {
  const {
    registry: {
      templates: { PrimitiveTemplate },
    },
  } = props;
  const [Content, setContent] = useState<(props: FieldProps) => JSX.Element>(
    () => () => <Skeleton sx={{ width: "100%", height }} />,
  );
  useEffect(() => {
    import("react-leaflet").then(
      ({ useMapEvent, MapContainer, TileLayer, Marker }) => {
        setContent(() =>
          ({ value, onValue }: FieldProps) => {
            const ref = useRef<any>(null);
            const [description] = useGeoLocDescription(value);
            const sanitizedValue = useMemo(
              () =>
                value &&
                  typeof value === "object" &&
                  typeof value.lat === "number" &&
                  typeof value.lng === "number"
                  ? value
                  : undefined,
              [value],
            );
            useEffect(() => {
              if (
                typeof value === "object" &&
                typeof value.lat === "number" &&
                typeof value.lng === "number"
              ) {
                ref.current?.setView(value);
              }
            }, [value]);
            const defaults = useLeafletDefaults();
            const ClickListener = useCallback(() => {
              useMapEvent("click", (ev) =>
                onValue?.({
                  lat: ev.latlng.lat,
                  lng: ev.latlng.lng,
                }));
              return null;
            }, []);
            return (
              <Box
                sx={{ position: "relative", height }}
              >
                <MapContainer
                  ref={ref}
                  sx={{ height: "100%" }}
                  {...defaults.mapContainer}
                >
                  <TileLayer {...defaults.tileLayer} />
                  <ClickListener />
                  {sanitizedValue && (
                    <Marker position={sanitizedValue} {...defaults.marker} />
                  )}
                </MapContainer>
                {description && (
                  <Box
                    sx={{
                      zIndex: 500,
                      position: "absolute",
                      left: 0,
                      bottom: 0,
                      width: "100%",
                      p: 2,
                      fontSize: 2,
                      backgroundColor: "accentMundane",
                      color: "accentOnMundane",
                      backdropFilter: "blur(5px)",
                    }}
                  >
                    {description}
                  </Box>
                )}
              </Box>
            );
          }
        );
      },
    );
  }, []);
  return (
    <PrimitiveTemplate {...props}>
      <Content {...props} />
    </PrimitiveTemplate>
  );
};
