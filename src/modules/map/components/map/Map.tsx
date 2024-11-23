import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {Map as MapGl} from "react-map-gl";
import DeckGL from "@deck.gl/react";

import {Button} from "../../../../components";
import {ROUTES} from "../../../../routes/constants";
import useFetchGeoJsonData from "../../hooks/fetch/useFetchGeoJsonData";
import {initialViewGeo} from "../../utils/initialViewGeo";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MAPBOX_ACCESS_TOKEN = import.meta.env.VITE_MAP_BOX_API_KEY;

const Map = () => {
  const navigate = useNavigate();
  const {layers, loading, hoveredFeature, handleHover, error, setError} = useFetchGeoJsonData();

  const handleClickButton = () => navigate(ROUTES.HOME);

  useEffect(() => {
    if (error.length > 0) {
      error.forEach((err) => {
        toast(
          <div className="flex items-center space-x-2">
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm0 2a10 10 0 1110-10 10 10 0 01-10 10zm-1-6h2v-2h-2zm0-4h2V7h-2z"
                clipRule="evenodd"
              />
            </svg>
            <span>{`Error: ${err.message || "Un error desconocido"}`}</span>
          </div>,
          {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            className: "bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg",
          },
        );

        setError([]);
      });
    }
  }, [error, setError]);

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

      {hoveredFeature && (
        <div className="absolute bottom-4 left-4 z-10 bg-white p-2 border rounded shadow-lg">
          <strong>{hoveredFeature}</strong>
        </div>
      )}

      <DeckGL
        controller={true}
        layers={layers}
        style={{width: "100%", height: "100%"}}
        initialViewState={initialViewGeo}
        onHover={handleHover}
      >
        <MapGl
          mapStyle="https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json"
          mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
          style={{width: "100%", height: "100%"}}
        />
      </DeckGL>

      <ToastContainer />
    </div>
  );
};

export default Map;
