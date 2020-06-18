import React from "react";
import Webcam from "react-webcam";
import { gsap } from "gsap";
import { CSSPlugin } from "gsap/CSSPlugin";
import { useMousePosition } from "./useMousePosition";

import "./styles.css";
const plugins = [CSSPlugin];

// Force CSSPlugin to not get dropped during build
gsap.registerPlugin(CSSPlugin);

export default function App() {
  const contentContainer = React.useRef();
  const carouselContainer = React.useRef();
  const mouse = useMousePosition(window);

  const mouseRef = React.useRef(mouse);
  mouseRef.current = mouse;

  //const [radius, setRadius] = React.useState(0);
  const [addX, setAddX] = React.useState(0);
  const addXRef = React.useRef(addX);
  addXRef.current = addX;

  React.useEffect(() => {
    var item, itemLength, rY;
    item = document.querySelectorAll(".carouselItem");
    itemLength = item.length;
    rY = 360 / itemLength;
    var radius = Math.round(150 / Math.tan(Math.PI / itemLength));

    gsap.set(contentContainer.current, { perspective: 600 });
    gsap.set(carouselContainer.current, { z: +radius });

    for (var i = 0; i < itemLength; i++) {
      var $item = item[i];
      var $block = $item.children[0];

      //thanks @chrisgannon!
      gsap.set($item, {
        rotationY: rY * i,
        z: radius,
        transformOrigin: "50% 50% " + -radius + "px"
      });

      animateIn($item, $block);
    }

    const interval = setInterval(() => {
      setAddX(addXRef.current + mouseRef.current.x);
      //console.log(mouseRef.current.x, addXRef.current);
      gsap.to(carouselContainer.current, {
        rotationY: addXRef.current,
        //rotationX: mouseRef.current.y,
        ease: "Quint.easeOut",
        duration: 1
      });
      gsap.set(carouselContainer.current, { z: 500 });
    }, 1000 / 60);

    return () => clearInterval(interval);
  }, []);

  const animateIn = ($item, $block) => {
    var $nrX = 360 * getRandomInt(2);
    var $nrY = 360 * getRandomInt(2);

    var $nx = -2000 + getRandomInt(4000);
    var $ny = -2000 + getRandomInt(4000);
    var $nz = -4000 + getRandomInt(4000);

    var $s = 1.5 + getRandomInt(10) * 0.1;
    var $d = 1 - getRandomInt(8) * 0.1;

    gsap.set($item, { autoAlpha: 1, delay: $d });
    gsap.set($block, {
      z: $nz,
      rotationY: $nrY,
      rotationX: $nrX,
      x: $nx,
      y: $ny,
      autoAlpha: 0
    });
    gsap.to($block, {
      delay: $d,
      rotationY: 0,
      rotationX: 0,
      z: 0,
      ease: "Expo.easeInOut",
      duration: $s
    });
    gsap.to($block, {
      delay: $d,
      x: 0,
      y: 0,
      autoAlpha: 1,
      ease: "Expo.easeInOut",
      duration: $s - 0.5
    });
  };

  const getRandomInt = $n => {
    return Math.floor(Math.random() * $n + 1);
  };

  return (
    <div className="App">
      <div id="contentContainer" ref={contentContainer} className="trans3d">
        <section
          id="carouselContainer"
          ref={carouselContainer}
          className="trans3d"
        >
          <figure id="item1" className="carouselItem trans3d">
            <div className="carouselItemInner trans3d">
              <Webcam />
            </div>
          </figure>
          <figure id="item2" className="carouselItem trans3d">
            <div className="carouselItemInner trans3d">
              <Webcam />
            </div>
          </figure>
          <figure id="item3" className="carouselItem trans3d">
            <div className="carouselItemInner trans3d">
              <Webcam />
            </div>
          </figure>
          <figure id="item4" className="carouselItem trans3d">
            <div className="carouselItemInner trans3d">
              <Webcam />
            </div>
          </figure>
          <figure id="item5" className="carouselItem trans3d">
            <div className="carouselItemInner trans3d">
              <Webcam />
            </div>
          </figure>
          <figure id="item6" className="carouselItem trans3d">
            <div className="carouselItemInner trans3d">
              <Webcam />
            </div>
          </figure>
        </section>
      </div>
    </div>
  );
}
