import React from "react";
import {Button} from "../../../components";
import {ROUTES} from "../../../routes/constants";
import {useNavigate} from "react-router-dom";

const Map = () => {
  const navigate = useNavigate();
  const handleClickButton = () => navigate(ROUTES.HOME);

  return (
    <div>
      <div className="h-full  relative flex flex-col items-end">
        <Button handleClickButton={handleClickButton} valueText="Back" />
      </div>
      <div>
        <p>map</p>
      </div>
    </div>
  );
};

export default Map;
