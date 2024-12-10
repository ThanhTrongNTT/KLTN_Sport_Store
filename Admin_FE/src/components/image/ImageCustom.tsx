import React, { useState } from "react";
type ImageCustomProps = {
    src: string;
    alt: string;
    className?: string;
};

const ImageCustom = (props: ImageCustomProps) => {
    const [loaded, setLoaded] = useState(false);
    return (
        <div className="">
            {!loaded && (
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
                    loaded
                        ? props.className ||
                          `h-3/4 w-3/4 mx-auto object-cover rounded-md`
                        : "hidden"
                }
                onLoad={() => setLoaded(true)}
            />
        </div>
    );
};

export default ImageCustom;
