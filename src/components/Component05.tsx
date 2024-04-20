import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import styles from "./Component05.module.css";

gsap.registerPlugin(useGSAP);

const Component05 = () => {
  const container = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const { contextSafe } = useGSAP(
    () => {
      console.log("creating timeline");
      tl.current = gsap
        .timeline()
        .to(`.${styles.box}`, {
          rotation: 360,
        })
        .to(`.${styles.circle}`, {
          x: 100,
        });
    },
    { scope: container }
  );
  const handleToggle = contextSafe(() => {
    if (tl.current) {
      tl.current.reversed(!tl.current.reversed());
    }
  });

  return (
    <div className={styles.container} ref={container}>
        <button className={styles.button} onClick={handleToggle}>
          TOGGLE
        </button>
        <div className={styles.box}>box</div>
        <div className={styles.circle}>circle</div>
    </div>
  );
};

export default Component05;
