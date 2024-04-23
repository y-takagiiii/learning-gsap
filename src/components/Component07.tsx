import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import styles from "./Component07.module.css";
import { useRef, useState } from "react";

gsap.registerPlugin(useGSAP);

const Component07 = () => {
  const [positionX, setPositionX] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const randomX = gsap.utils.random(-200, 200, 1, true);

  useGSAP(
    () => {
      gsap.to(`.${styles.box}`, { x: positionX, duration: 1 });
    },
    { dependencies: [positionX], scope: containerRef }
  );
  return (
    <div className={styles.container} ref={containerRef}>
      <button className={styles.button} onClick={() => setPositionX(randomX())}>
        Pass In A Randomized Value
      </button>
      <div className={styles.box}>{positionX}</div>
    </div>
  );
};

export default Component07;
