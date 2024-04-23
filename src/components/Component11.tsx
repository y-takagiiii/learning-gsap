import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ReactNode, forwardRef, useRef } from "react";
import styles from "./Component11.module.css";

gsap.registerPlugin(useGSAP);

// メンテナブルなコードを書くためにアニメーションを処理するコンポーネントを作成する
type FadeInProps = {
  stagger: number;
  x: number;
  children: ReactNode;
};
const FadeIn = forwardRef(
  ({ stagger = 0, x = 0, children }: FadeInProps, ref) => {
    const el = useRef<HTMLDivElement | null>(null);
    const animation = useRef<gsap.core.Tween | null>(null);

    useGSAP(() => {
      if (!el.current) {
        return;
      }
      animation.current = gsap.from(el.current.children, {
        opacity: 0,
        stagger,
        x,
      });
    });

    useGSAP(() => {
      if (typeof ref === "function") {
        ref(animation.current);
      } else if (ref && "current" in ref) {
        ref.current = animation.current;
      }
    }, [ref]);

    return <span ref={el}>{children}</span>;
  }
);

const Component11 = () => {
  const animation = useRef<gsap.core.Tween | null>(null);
  const handleToggle = () => {
    if (!animation.current) {
      return;
    }
    animation.current.reversed(!animation.current.reversed());
  };

  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={handleToggle}>
        Toggle
      </button>
      <FadeIn stagger={0.1} x={100} ref={animation}>
        <div className={styles.box}>Box 1</div>
        <div className={styles.box}>Box 2</div>
      </FadeIn>
    </div>
  );
};

export default Component11;
