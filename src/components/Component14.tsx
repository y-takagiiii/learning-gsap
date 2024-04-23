import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useState } from "react";
import styles from "./Component14.module.css";

gsap.registerPlugin(useGSAP);

const Component14 = () => {
  const [items, setItems] = useState(() => [
    { id: 0, color: "blue" },
    { id: 1, color: "red" },
    { id: 2, color: "purple" },
  ]);
  const { contextSafe } = useGSAP();

  const remove = contextSafe(
    (
      item: {
        id: number;
        color: string;
      },
      target: gsap.TweenTarget
    ) => {
      gsap.to(target, {
        opacity: 0,
        onComplete: () => removeItem(item.id),
      });
    }
  );

  const removeItem = (itemId: number) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  return (
    <div className={styles.container}>
      {items.map((item) => (
        <div
          key={item.id}
          className={`${styles.box} ${styles[item.color]}`}
          onClick={(event) => remove(item, event.currentTarget)}
        >
          Click Me
        </div>
      ))}
    </div>
  );
};

export default Component14;
