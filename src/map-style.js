// For more information on data-driven styles, see https://www.mapbox.com/help/gl-dds-ref/
export const dataLayer = {
  id: 'data',
  type: 'fill',
  paint: {
    'fill-color': {
      property: 'percentile',
      stops: [
        [0, '#ffe6e6'],
        [1, '#ffcccc'],
        [2, '#ffb3b3'],
        [3, '#ff9999'],
        [4, '#ff8080'],
        [5, '#ff6666'],
        [6, '#ff4d4d'],
        [7, '#ff3333'],
        [8, '#ff1a1a'],
        [9, '#ff0000']
      ]
    },
    'fill-opacity': .7
  }
};
