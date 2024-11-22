import {useEffect, useState} from "react";
import {useMapConnections} from "../../../../context/MapConnectionsContext";
import {GeoJsonLayer} from "@deck.gl/layers";
import {applyRegularLayers} from "../../utils/settingMapGeo";
import {Layer, Viewport} from "deck.gl";
import {MjolnirGestureEvent} from "mjolnir.js";

const useFetchGeoJsonData = () => {
  const [layers, setLayers] = useState<GeoJsonLayer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [clickedFeature, setClickedFeature] = useState<string | null>(null);
  const {connections} = useMapConnections();

  useEffect(() => {
    const fetchGeoJsonData = async () => {
      try {
        if (connections.length === 0) {
          setLoading(false);
          return;
        }

        setLoading(true);

        const results = await Promise.allSettled(
          connections.map(async (connection) => {
            try {
              const response = await fetch(connection.source.url);

              if (!response.ok) {
                throw new Error(`Error fetching GeoJSON: ${connection.source.url}`);
              }

              const geoJson = await response.json();

              const geoJsonLayer = applyRegularLayers(geoJson);

              return geoJsonLayer;
            } catch (error) {
              return null;
            }
          }),
        );

        const newLayers = results
          .filter((result) => result.status === "fulfilled" && result.value !== null)
          .map((result) => (result as PromiseFulfilledResult<GeoJsonLayer>).value);

        setLayers(newLayers);
      } catch (error) {
        return null;
      } finally {
        setLoading(false);
      }
    };

    fetchGeoJsonData();
  }, [connections]);

  const handleClick = (
    info: {
      color: Uint8Array | null;
      layer: Layer<object> | null;
      sourceLayer?: Layer<object> | null | undefined;
      viewport?: Viewport | undefined;
      pixelRatio: number;
      object?: {properties: {name: string}};
    },
    event: MjolnirGestureEvent,
  ) => {
    if (info.object && info.object.properties && info.object.properties.name) {
      setClickedFeature(info.object.properties.name || "");
    }
  };

  return {layers, loading, clickedFeature, handleClick};
};

export default useFetchGeoJsonData;
