import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ReactNode, useRef, useState } from "react";
import styles from "./Component08.module.css";

gsap.registerPlugin(useGSAP);

type Props = {
  className: string;
  timeline: gsap.core.Timeline | null;
  index: number;
  rotation?: number;
  children: ReactNode;
};

// 複数のコンポーネントでタイムラインを共有したり、
// 異なるコンポーネントに存在する要素からアニメーションを構成したりする必要がある場合、
// 1. 親コンポーネントから子コンポーネントにpropsを渡す
// 2. 親コンポーネントから子コンポーネントにcallbackを渡す
// のどちらかで実装する

const Box = ({ className, timeline, index, children }: Props) => {
  const boxRef = useRef<HTMLDivElement | null>(null);
  useGSAP(() => {
    if (timeline && index !== undefined) { // 0はfalseと評価されてしまうのでundefinedではないことをチェック
      timeline.to(
        boxRef.current,
        {
          x: -100,
        },
        index * 0.1 // GSAPのposition parameterを利用してアニメーションのタイミングを設定 https://gsap.com/resources/position-parameter/
      );
    }
  }, [timeline, index]);
  return (
    <div className={styles[className]} ref={boxRef}>
      {children}
    </div>
  );
};

const Circle = ({ className, timeline, index, rotation, children }: Props) => {
  const circleRef = useRef<HTMLDivElement | null>(null);
  useGSAP(() => {
    if (timeline && index !== undefined) {
      timeline.to(
        circleRef.current,
        {
          rotation: rotation,
          x: 100,
        },
        index * 0.1
      );
    }
  }, [timeline, index, rotation]);
  return (
    <div className={styles[className]} ref={circleRef}>
      {children}
    </div>
  );
};

const Component08 = () => {
  const [timeline, setTimeline] = useState<gsap.core.Timeline | null>(null);

  const { contextSafe } = useGSAP(() => {
    const tl = gsap.timeline();
    setTimeline(tl);
  });
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
      <Box className="box" timeline={timeline} index={0}>
        Box
      </Box>
      <Circle className="circle" timeline={timeline} index={1} rotation={360}>
        Circle
      </Circle>
    </div>
  );
};

export default Component08;
