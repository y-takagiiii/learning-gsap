import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ReactNode, useRef } from "react";
import styles from "./Component03.module.css";

gsap.registerPlugin(useGSAP);

type BoxProps = {
  children: ReactNode;
  className: string;
  animation?: string;
};

const Box = ({ children, className, animation }: BoxProps) => {
  return (
    <div className={`${styles.box} ${className}`} data-animate={animation}>
      {children}
    </div>
  );
};

const Component03 = () => {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.to("[data-animate='rotate']", {
        rotation: 360,
        repeat: -1,
        repeatDelay: 1,
        yoyo: true,
      });
      gsap.to("[data-animate='move']", {
        x: 50,
        repeat: -1,
        repeatDelay: 1,
        yoyo: true,
      });
    },
    { scope: container }
  );

  return (
    <div className={styles.container} ref={container}>
      <Box className={styles.rotateBox} animation="rotate">
        RotateBox
      </Box>
      <Box className={styles.staticBox}>Don't animate</Box>
      <Box className={styles.moveBox} animation="move">
        MoveBox
      </Box>
    </div>
  );
};

export default Component03;
