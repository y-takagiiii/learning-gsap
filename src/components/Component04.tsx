import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import styles from "./Component04.module.css";

gsap.registerPlugin(useGSAP);

const Component04 = () => {
  const container = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      tl.current = gsap
        .timeline()
        .to(`.${styles.box}`, {
          rotate: 360,
        })
        .to(`.${styles.circle}`, { x: 100 });
    },
    { scope: container }
  );

  return (
    <div className={styles.container} ref={container}>
      <div className={styles.box}>box</div>
      <div className={styles.circle}>circle</div>
    </div>
  );
};

export default Component04;
