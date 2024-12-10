import React from "react";
import { useState } from "react";
type ImageCustomProps = {
  src: string;
  alt: string;
  rounded?: boolean;
  className?: string;
};

const ImageCustom = (props: ImageCustomProps) => {
  const [loaded, setLoaded] = useState(false);
  const rounded = props.rounded ? "rounded-xl border border-gray-300" : "";
  return (
    <div className="w-full h-full">
      {loaded ? null : (
        <div className="h-full flex justify-center items-center content-center">
          <div
            className={`border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-primary`}
          />
        </div>
      )}
      <img
        src={props.src}
        alt={props.alt}
        className={
          props.className
            ? props.className
            : `h-full w-full object-cover ${rounded}`
        }
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
};

export default ImageCustom;
