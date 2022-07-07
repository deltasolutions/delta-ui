import { useEffect, useState } from 'react';

export const useGeoLocDescription = (geoLoc?: { lat: number; lng: number }) => {
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState<string | undefined>();
  const ok =
    typeof geoLoc === 'object' &&
    typeof geoLoc.lat === 'number' &&
    typeof geoLoc.lng === 'number';
  useEffect(() => {
    if (!ok) {
      return;
    }
    setLoading(true);
    fetch(
      `https://api.geoapify.com/v1/geocode/reverse` +
        `?lat=${geoLoc.lat}&lon=${geoLoc.lng}` +
        `&apiKey=45f65f7fc5bb47399e2d560a2f8d9bd3`
    )
      .then(v => v.json())
      .then(v => {
        setLoading(false);
        setDescription(v?.features?.[0]?.properties?.formatted);
      })
      .catch(() => {
        setLoading(false);
        setDescription(undefined);
      });
  }, [ok, geoLoc?.lat, geoLoc?.lng]);
  return [description, loading] as const;
};
