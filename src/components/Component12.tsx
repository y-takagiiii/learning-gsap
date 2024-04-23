import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ForwardedRef, ReactNode, forwardRef, useRef, useState } from "react";
import styles from "./Component12.module.css";

gsap.registerPlugin(useGSAP);

// GSAPのregisterEffectを使ってアニメーション処理をメンテナブルにする
gsap.registerEffect({
  name: "pulse",
  effect(targets: gsap.TweenTarget) {
    return gsap.fromTo(
      targets,
      {
        scale: 1,
      },
      {
        scale: 1.5,
        repeat: 1,
        ease: "bounce",
        yoyoEase: "power3",
      }
    );
  },
});

gsap.registerEffect({
  name: "spin",
  effect(targets: gsap.TweenTarget) {
    return gsap.to(targets, {
      rotation: (i, el) =>
        gsap.utils.snap(360, Number(gsap.getProperty(el, "rotation")) + 360),
    });
  },
});

type BoxProps = {
  className: string;
  children: ReactNode;
};

type GsapProps = {
  effect: string;
  targetRef: React.RefObject<HTMLElement>;
  vars?: gsap.TweenVars;
  children: ReactNode;
};

const GsapEffect = forwardRef<gsap.core.Tween | null, GsapProps>(
  (
    { effect, targetRef, vars, children },
    ref: ForwardedRef<gsap.core.Tween | null>
  ) => {
    const animation = useRef<gsap.core.Tween | null>(null);

    useGSAP(() => {
      if (!gsap.effects[effect]) {
        return;
      }
      const t = gsap.effects[effect](targetRef.current, vars);
      animation.current = t;
    }, [effect, targetRef, vars]);

    useGSAP(() => {
      if (typeof ref === "function") {
        ref(animation.current);
      } else if (ref && "current" in ref) {
        ref.current = animation.current;
      }
    }, [ref]);

    return <>{children}</>;
  }
);

const Box = forwardRef<HTMLDivElement, BoxProps>(
  ({ className, children }, ref: ForwardedRef<HTMLDivElement>) => {
    return (
      <div className={styles[className]} ref={ref}>
        {children}
      </div>
    );
  }
);

const wrap = gsap.utils.wrap(["pulse", "spin"]);

const Component12 = () => {
  const boxRef = useRef<HTMLDivElement | null>(null);
  const count = useRef(0);
  const [effect, setEffect] = useState("");

  const handleToggle = () => {
    setEffect(wrap(count.current++));
  };

  return (
    <div className={styles.container}>
      <div>
        <button className={styles.button} onClick={handleToggle}>
          Toggle
        </button>
      </div>
      <div>
        <p>Effect: {effect}</p>
      </div>
      <GsapEffect targetRef={boxRef} effect={effect}>
        <Box className="box" ref={boxRef}>
          Box
        </Box>
      </GsapEffect>
    </div>
  );
};

export default Component12;
