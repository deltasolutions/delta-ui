import { jsx } from '@theme-ui/core';
import { FieldProps } from 'delta-jsf';
import { Map } from 'leaflet';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { MapContainer, Marker, TileLayer, useMapEvent } from 'react-leaflet';
import { useGeoLocDescription, useLeafletDefaults } from '../../../../hooks';
import { Box } from '../../../containers';

export const GeoLocPickerField = (props: FieldProps) => {
  const {
    value,
    onValue,
    registry: {
      templates: { PrimitiveTemplate },
    },
  } = props;
  const ref = useRef<Map>(null);
  const defaults = useLeafletDefaults();
  const sanitizedValue = useMemo(
    () =>
      value &&
      typeof value === 'object' &&
      typeof value.lat === 'number' &&
      typeof value.lng === 'number'
        ? value
        : undefined,
    [value]
  );
  const [description] = useGeoLocDescription(value);
  const ClickListener = useCallback(() => {
    useMapEvent('click', ev =>
      onValue?.({
        lat: ev.latlng.lat,
        lng: ev.latlng.lng,
      })
    );
    return null;
  }, []);
  useEffect(() => {
    if (
      typeof value === 'object' &&
      typeof value.lat === 'number' &&
      typeof value.lng === 'number'
    ) {
      ref.current?.setView(value);
    }
  }, [value]);
  return (
    <PrimitiveTemplate {...props}>
      <Box
        sx={{
          position: 'relative',
          height: '300px',
        }}
      >
        <MapContainer
          ref={ref}
          sx={{ height: '100%' }}
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
              position: 'absolute',
              left: 0,
              bottom: 0,
              width: '100%',
              p: 2,
              fontSize: 2,
              backgroundColor: 'accentMundane',
              color: 'accentOnMundane',
              backdropFilter: 'blur(5px)',
            }}
          >
            {description}
          </Box>
        )}
      </Box>
    </PrimitiveTemplate>
  );
};
