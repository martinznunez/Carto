export const LAYER_STYLES = {
  Polygon: {
    getLineColor: [0, 0, 0, 180],
    getFillColor: [255, 215, 0, 150],
    getLineWidth: 4,
  },
  MultiPolygon: {
    getLineColor: [0, 0, 0, 180],
    getFillColor: [255, 215, 0, 150],
    getLineWidth: 4,
  },
  Point: {
    iconAtlas: "/public/location-icon.png",
    iconMapping: {
      marker: {x: 0, y: 0, width: 128, height: 128, anchorX: 64, anchorY: 64},
    },
    sizeScale: 14,

    getIcon: () => "marker",
    getColor: (d: {properties: {isActive: boolean}}) => {
      return d.properties.isActive ? [0, 255, 0, 255] : [255, 0, 0, 255];
    },
  },
  MultiPoint: {
    iconAtlas: "/public/location-icon.png",
    iconMapping: {
      marker: {x: 0, y: 0, width: 128, height: 128, anchorX: 64, anchorY: 64},
    },
    sizeScale: 15,
    getIcon: () => "marker",
    getColor: [0, 255, 0, 255],
  },
  LineString: {
    getPath: (d: {geometry: {coordinates: string}}) => d.geometry.coordinates,
    getWidth: 4,
    getColor: (d: {properties: {isHighlighted: boolean}}) =>
      d.properties.isHighlighted ? [255, 0, 0, 255] : [0, 0, 255, 255],
  },
  MultiLineString: {
    getPath: (d: {geometry: {coordinates: string}}) => d.geometry.coordinates,
    getWidth: 4,
    getColor: [0, 150, 255, 255],
  },
};
