import {GeoJsonLayer, IconLayer, PathLayer} from "deck.gl";

import {v4 as uuid4} from "uuid";
import {LAYER_STYLES} from "../layerStyled";
import type {Feature} from "geojson";
import {LAYER_TYPES} from "../layerTypes";

export const applyRegularLayers = (geoJsonData: {
  type: string;
  features: Feature[];
}): GeoJsonLayer | IconLayer | PathLayer | null => {
  if (!geoJsonData || !geoJsonData.features || geoJsonData.features.length === 0) return null;

  const type = geoJsonData.features[0].geometry.type;
  const styles = LAYER_STYLES[type];

  if (!styles) return null;

  if (type === LAYER_TYPES.POLYGON || type === LAYER_TYPES.MULTI_POLYGON) {
    return new GeoJsonLayer({
      id: `geojson-layer-${uuid4()}`,
      data: geoJsonData.features,
      pickable: true,
      stroked: true,
      filled: true,
      lineWidthScale: 20,
      lineWidthMinPixels: 2,
      getLineColor: styles.getLineColor,
      getFillColor: styles.getFillColor,
      getLineWidth: styles.getLineWidth,
    });
  }

  if (type === LAYER_TYPES.POINT || type === LAYER_TYPES.MULTI_POINT) {
    return new IconLayer({
      id: `icon-layer-${uuid4()}`,
      data: geoJsonData.features,
      pickable: true,
      iconAtlas: styles.iconAtlas,
      iconMapping: styles.iconMapping,
      sizeScale: styles.sizeScale,
      getIcon: styles.getIcon,
      getSize: () => 3,
      getPosition: (d) => d.geometry.coordinates,
      getColor: styles.getColor,
      parameters: {
        depthTest: false,
      },
    });
  }

  if (type === LAYER_TYPES.LINE_STRING || type === LAYER_TYPES.MULTI_LINE_STRING) {
    return new PathLayer({
      id: `path-layer-${uuid4()}`,
      data: geoJsonData.features,
      pickable: true,
      getPath: styles.getPath,
      getWidth: styles.getWidth,
      getColor: styles.getColor,
    });
  }

  return null;
};
