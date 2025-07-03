import { useState } from "react";
import YouTube from "react-youtube";

const extractYouTubeID = (url) => {
  const regex =
    /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null; // Return extracted video ID or null if not found
};

export function ProductImageZoom({ selectedImage, selectedVideo }) {
  const videoId = selectedVideo ? extractYouTubeID(selectedVideo) : null;
  const [zoomStyle, setZoomStyle] = useState({});

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setZoomStyle({
      transform: `scale(1.7)`,
      transformOrigin: `${x}% ${y}%`,
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({
      transform: "scale(1)",
    });
  };

  return (
    <div className="relative h-[430px] w-full overflow-hidden border shadow max-sm:h-[250px]">
      {videoId ? (
        <div className="h-full w-full">
          <YouTube
            videoId={videoId}
            className="h-full w-full"
            opts={{
              width: "100%",
              height: "100%", // Ensures full height
              playerVars: { autoplay: 1 },
            }}
          />
        </div>
      ) : selectedImage ? (
        <img
          src={selectedImage}
          alt="Selected product"
          className="h-full w-full cursor-zoom-in object-cover transition-transform duration-500 ease-out"
          style={zoomStyle}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        />
      ) : (
        <div className="flex h-full items-center justify-center">
          <h1 className="text-lg font-semibold text-gray-500">No images or videos available</h1>
        </div>
      )}
    </div>
  );
}
