import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import styles from "./Component01.module.css";

gsap.registerPlugin(useGSAP);

const Component01 = () => {
  const container = useRef<HTMLDivElement>(null);
  const circle = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.to(`.${styles.box}`, { rotation: "+=360", duration: 3 });
      if (circle.current) {
        gsap.to(circle.current, { rotation: "-=360", duration: 3 });
      }
    },
    { scope: container, revertOnUpdate: true } // boxの親のRefをスコープに渡す
  );
  return (
    <div ref={container} className={styles.container}>
      <div className={styles.box}>selector</div> {/* 子孫はuseRefを用いなくても良い */}
      <div className={styles.circle} ref={circle}>
        Ref
      </div>
      <div className={styles.box}>selector</div>
    </div>
  );
};

export default Component01;
