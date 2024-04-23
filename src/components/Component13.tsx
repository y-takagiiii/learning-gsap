import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";
import styles from "./Component13.module.css";

gsap.registerPlugin(useGSAP);

// 消えるアニメーションを実装する場合は、アニメーション完了後にReactが要素を削除するように調整する必要がある
const Component13 = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(true);
  const { contextSafe } = useGSAP({ scope: containerRef });
  const handleRemove = contextSafe(() => {
    gsap.to(`.${styles.box}`, {
      opacity: 0,
      onComplete: () => setActive(false),
    });
  });
  return (
    <div className={styles.container} ref={containerRef}>
      <button className={styles.button} onClick={handleRemove}>
        {active ? "Remove Box" : "Done"}
      </button>
      {active ? <div className={styles.box}>Box</div> : null}
    </div>
  );
};

export default Component13;
