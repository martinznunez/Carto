import {useEffect, useState} from "react";
import {useMapConnections} from "../../../../context/MapConnectionsContext";
import {GeoJsonLayer} from "@deck.gl/layers";
import {applyRegularLayers} from "../../utils/settingMapGeo";
import {Layer, Viewport} from "deck.gl";
import {MjolnirPointerEvent} from "mjolnir.js";
import {listSortMap} from "../../utils/listSortMap/listSortMap";
import {ErrorAlert} from "../../domain/types";
import {ERROR_MESSAGES} from "./constants/errorsMessages";

const useFetchGeoJsonData = () => {
  const [layers, setLayers] = useState<GeoJsonLayer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<ErrorAlert[]>([]);

  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);
  const {connections} = useMapConnections();

  useEffect(() => {
    const fetchGeoJsonData = async () => {
      try {
        if (connections.length === 0) {
          setLoading(false);
          return;
        }

        setLoading(true);

        const sortedConnections = listSortMap(connections);

        const results = await Promise.allSettled(
          sortedConnections.map(async (connection) => {
            const response = await fetch(connection.source.url);

            if (!response.ok) {
              throw new Error(ERROR_MESSAGES.unexpected);
            }

            const geoJson = await response.json();
            return applyRegularLayers(geoJson);
          }),
        );

        const successfulLayers = results
          .filter((result) => result.status === "fulfilled")
          .map((result) => (result as PromiseFulfilledResult<GeoJsonLayer>).value);

        const failedLayers = results.filter((result) => result.status === "rejected");

        if (failedLayers.length > 0) {
          setError((prevState) => [
            ...prevState,
            ...failedLayers.map((failure) => ({
              showAlert: true,
              message: ERROR_MESSAGES.unexpected,
            })),
          ]);
        }

        setLayers(successfulLayers);
      } catch (error) {
        setError((prevState) => [...prevState, {showAlert: true, message: ERROR_MESSAGES.fatal}]);
      } finally {
        setLoading(false);
      }
    };

    fetchGeoJsonData();
  }, [connections]);

  const handleHover = (
    info: {
      color: Uint8Array | null;
      layer: Layer<object> | null;
      sourceLayer?: Layer<object> | null | undefined;
      viewport?: Viewport | undefined;
      pixelRatio: number;
      object?: {properties: {name: string}};
    },
    event: MjolnirPointerEvent,
  ) => {
    if (info.object && info.object.properties && info.object.properties.name) {
      setHoveredFeature(info.object.properties.name || "");
    } else {
      setHoveredFeature(null);
    }
  };

  return {layers, loading, hoveredFeature, handleHover, error, setError};
};

export default useFetchGeoJsonData;
