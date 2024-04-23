import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ReactNode, useCallback, useRef, useState } from "react";
import styles from "./Component09.module.css";

gsap.registerPlugin(useGSAP);

type Props = {
  className: string;
  addAnimation: (
    animation: gsap.core.Tween | gsap.core.TimelineChild,
    index: number
  ) => void;
  index: number;
  rotation?: number;
  children: ReactNode;
};

const Box = ({ className, addAnimation, index, children }: Props) => {
  const boxRef = useRef<HTMLDivElement | null>(null);
  useGSAP(() => {
    const animation = gsap.to(boxRef.current, {
      x: -200,
    });
    addAnimation(animation, index);
  }, [addAnimation, index]);

  return (
    <div className={styles[className]} ref={boxRef}>
      {children}
    </div>
  );
};

const Circle = ({
  className,
  addAnimation,
  index,
  rotation,
  children,
}: Props) => {
  const circleRef = useRef<HTMLDivElement | null>(null);
  useGSAP(() => {
    const animation = gsap.to(circleRef.current, {
      rotate: rotation,
      x: 200,
    });
    addAnimation(animation, index);
  }, [addAnimation, index]);

  return (
    <div className={styles[className]} ref={circleRef}>
      {children}
    </div>
  );
};

const Component09 = () => {
  const [timeline, setTimeline] = useState<gsap.core.Timeline | null>(null);

  const { contextSafe } = useGSAP(() => {
    const tl = gsap.timeline();
    setTimeline(tl);
  });

  // 親コンポーネントから子コンポーネントにcallbackを渡す
  const addAnimation = useCallback(
    (animation: gsap.core.TimelineChild, index: number) => {
      if (timeline) {
        timeline.add(animation, index * 0.1);
      }
    },
    [timeline]
  );

  const toggleTimeline = contextSafe(() => {
    if (timeline) {
      timeline.reversed(!timeline.reversed());
    }
  });

  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={toggleTimeline}>
        Toggle
      </button>
      <Box className="box" addAnimation={addAnimation} index={0}>
        Box
      </Box>
      <Circle
        className="circle"
        addAnimation={addAnimation}
        index={1}
        rotation={360}
      >
        Circle
      </Circle>
    </div>
  );
};

export default Component09;
