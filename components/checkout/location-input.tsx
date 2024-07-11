import { MapAddress } from "@/types";
import React, { useEffect, useState } from "react";
import ReactMapGL from "react-mapbox-gl";

const LocationInput = () => {
  const [currentViewPort, setCurrentViewPort] = useState<MapAddress | null>(
    null
  );

  useEffect(() => {
    if (navigator.geolocation) {
      const position = navigator.geolocation.getCurrentPosition;
      setCurrentViewPort({
        longitude: position?.coords.longitude,
        lattitude: position?.coords.latitude,
        zoom: 6,
      });
    }
  }, []);

  return (
    <div className="w-full h-full m-5 sm:w-1/2 sm:h-1/2">
      {/* <ReactMapGL></ReactMapGL> */}
      {JSON.stringify(currentViewPort)}
    </div>
  );
};

export default LocationInput;
