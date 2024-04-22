import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useEffect, useRef, useState } from "react";
import styles from "./Component06.module.css";

gsap.registerPlugin(useGSAP);

const Component06 = () => {
  const [count, setCount] = useState(0);
  const [delayedCount, setDelayedCount] = useState(0);
  const container = useRef<HTMLDivElement>(null);
  const firstRenderBox = useRef<HTMLDivElement>(null);
  const delayedCountBox = useRef<HTMLDivElement>(null);
  const everyRenderBox = useRef<HTMLDivElement>(null);

  // count変更の0.5秒後にsetDelayedCountを実行する
  useEffect(() => {
    const timer = setTimeout(() => setDelayedCount(count), 500);
    return () => clearTimeout(timer);
  }, [count]);

  // デフォルトは空配列、依存配列が空だと最初のレンダー時のみ発火
  useGSAP(() => {
    gsap.to(firstRenderBox.current, { rotation: "+=360" });
  });

  // 初回レンダー時と依存配列に指定した値が変更された時に発火する
  useGSAP(() => {
    gsap.to(delayedCountBox.current, { rotation: "+=360" });
  }, [delayedCount]);

  // 依存配列にnullを指定するとレンダー毎に発火する(避けるべき実装)
  // typescriptだと型エラーになる、useGSAPConfigにnullは指定できない
  useGSAP(() => {
    gsap.to(everyRenderBox.current, {rotation: "+=360"})
  }, null)

  return (
    <div className={styles.container} ref={container}>
      <div>
        <button
          className={styles["render-button"]}
          onClick={() => setCount(count + 1)}
        >
          CLICK TO TRIGGER A RENDER
        </button>
      </div>
      <div>
        <p>Count: {count}</p>
        <p>Delayed Count: {delayedCount}</p>
        <p>Renders: {1 + count + delayedCount}</p>
      </div>
      <div className={styles["flex-row"]}>
        <div
          className={`${styles.box} ${styles["first-render"]}`}
          ref={firstRenderBox}
        >
          First render
        </div>
        <div
          className={`${styles.box} ${styles["delayed-count"]}`}
          ref={delayedCountBox}
        >
          First render & delayed count change
        </div>
        <div
          className={`${styles.box} ${styles["every-render"]}`}
          ref={everyRenderBox}
        >
          Every render
        </div>
      </div>
    </div>
  );
};

export default Component06;
