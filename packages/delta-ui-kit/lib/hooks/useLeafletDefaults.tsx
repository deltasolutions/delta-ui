import L from 'leaflet';
import { useMemo } from 'react';

const iconSize = 40;

export const useLeafletDefaults = () => {
  return useMemo(
    () => ({
      mapContainer: {
        attributionControl: false,
        center: { lat: 55.751244, lng: 37.618423 },
        zoom: 13,
      },
      tileLayer: {
        url: 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png',
      },
      marker: {
        icon: L.icon({
          iconUrl:
            `data:image/svg+xml;base64,` +
            `PHN2ZyBzdHJva2U9ImN1cnJlbnRDb2xvciIgZmlsbD0iY3VycmVudENvbG9y` +
            `IiBzdHJva2Utd2lkdGg9IjAiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHls` +
            `ZT0iY29sb3I6IzE5YWY0ZSIgaGVpZ2h0PSI0MCIgd2lkdGg9IjQwIiB4bWxu` +
            `cz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxjaXJjbGUgY3g9IjI1` +
            `NiIgY3k9IjE5MiIgcj0iMzIiPjwvY2lyY2xlPjxwYXRoIGQ9Ik0yNTYgMzJj` +
            `LTg4LjIyIDAtMTYwIDY4LjY1LTE2MCAxNTMgMCA0MC4xNyAxOC4zMSA5My41` +
            `OSA1NC40MiAxNTguNzggMjkgNTIuMzQgNjIuNTUgOTkuNjcgODAgMTIzLjIy` +
            `YTMxLjc1IDMxLjc1IDAgMDA1MS4yMiAwYzE3LjQyLTIzLjU1IDUxLTcwLjg4` +
            `IDgwLTEyMy4yMkMzOTcuNjkgMjc4LjYxIDQxNiAyMjUuMTkgNDE2IDE4NWMw` +
            `LTg0LjM1LTcxLjc4LTE1My0xNjAtMTUzem0wIDIyNGE2NCA2NCAwIDExNjQt` +
            `NjQgNjQuMDcgNjQuMDcgMCAwMS02NCA2NHoiPjwvcGF0aD48L3N2Zz4=`,
          shadowUrl:
            `data:image/png;base64,` +
            `iVBORw0KGgoAAAANSUhEUgAAACkAAAApCAQAAAACach9AAACMUlEQVR4Ae3S` +
            `hY7jQBAE0Aoz/f9/HTMzhg1zrdKUrJbdx+Kd2nD8VNudfsL/Th///dyQN2TH` +
            `6f3y/BGpC379rV+S+qqetBOxImNQXL8JCAr2V4iMQXHGNJxeCfZXhSRBcQMf` +
            `vkOWUdtfzlLgAENmZDcmo2TVmt8OSM2eXxBp3DjHSMFutqS7SbmemzBiR+xp` +
            `KCNUIRkdkkYxhAkyGoBvyQFEJEefwSmmvBfJuJ6aKqKWnAkvGZOaZXTUgFqY` +
            `ULWNSHUckZuR1HIIimUExutRxwzOLROIG4vKmCKQt364mIlhSyzAf1m9lHZH` +
            `JZrlAOMMztRRiKimp/rpdJDc9Awry5xTZCte7FHtuS8wJgeYGrex28xNTd08` +
            `6Dik7vUMscQOa8y4DoGtCCSkAKlNwpgNtphjrC6MIHUkR6YWxxs6Sc5xqn22` +
            `2mmCRFzIt8lEdKx+ikCtg91qS2WpwVfBelJCiQJwvzixfI9cxZQWgiSJelKn` +
            `wBElKYtDOb2MFbhmUigbReQBV0Cg4+qMXSxXSyGUn4UbF8l+7qdSGnTC0XLC` +
            `mahIgUHLhLOhpVCtw4CzYXvLQWQbJNmxoCsOKAxSgBJno75avolkRw8iIAFc` +
            `sdc02e9iyCd8tHwmeSSoKTowIgvscSGZUOA7PuCN5b2BX9mQM7S0wYhMNU74` +
            `zgsPBj3HU7wguAfnxxjFQGBE6pwN+GjME9zHY7zGp8wVxMShYX9NXvEWD3Hb` +
            `wJf4giO4CFIQxXScH1/TM+04kkBiAAAAAElFTkSuQmCC`,
          iconAnchor: [iconSize / 2, iconSize],
          popupAnchor: [iconSize / 2, 0],
          iconSize: [iconSize, iconSize],
        }),
      },
    }),
    []
  );
};
