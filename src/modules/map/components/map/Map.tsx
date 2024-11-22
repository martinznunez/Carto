import React from "react";
import {useNavigate} from "react-router-dom";
import {Map as MapGl} from "react-map-gl";
import DeckGL from "@deck.gl/react";

import {Button} from "../../../../components";
import {ROUTES} from "../../../../routes/constants";
import useFetchGeoJsonData from "../../hooks/fetch/useFetchGeoJsonData";
import {initialViewGeo} from "../../utils/initialViewGeo";

const MAPBOX_ACCESS_TOKEN = import.meta.env.VITE_MAP_BOX_API_KEY;

const Map = () => {
  const navigate = useNavigate();
  const {layers, loading, clickedFeature, handleClick} = useFetchGeoJsonData();

  const handleClickButton = () => navigate(ROUTES.HOME);

  return (
    <div className="w-screen h-screen relative overflow-hidden">
      <div className="absolute top-4 right-4 z-10">
        <Button handleClickButton={handleClickButton} valueText="Back" />
      </div>

      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10">
          <span>Loading map...</span>
        </div>
      )}

      {clickedFeature && (
        <div className="absolute bottom-4 left-4 z-10 bg-white p-2 border rounded shadow-lg">
          <strong>{clickedFeature}</strong>
        </div>
      )}

      <DeckGL
        controller={true}
        layers={layers}
        style={{width: "100%", height: "100%"}}
        initialViewState={initialViewGeo}
        onClick={handleClick}
      >
        <MapGl
          mapStyle="https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json"
          mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
          style={{width: "100%", height: "100%"}}
        />
      </DeckGL>
    </div>
  );
};

export default Map;
