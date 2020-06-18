import { useEffect, useState } from "react";

export const useMousePosition = window => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const setFromEvent = event => {
      console.log("mouse");
      setPosition({
        x: -(-(window.innerWidth * 0.5) + event.pageX) * 0.0025,
        y: -(-(window.innerHeight * 0.5) + event.pageY) * 0.01
      });
    };

    window.addEventListener("mousemove", setFromEvent);

    return () => {
      window.removeEventListener("mousemove", setFromEvent);
    };
  }, []);

  return position;
};
