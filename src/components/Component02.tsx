import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import styles from "./Component02.module.css";

gsap.registerPlugin(useGSAP);

const Component02 = () => {
  // 下記は悪い例、クリーンアップできていない
  // const handleClickBad = () => {
  //   gsap.to(`.${styles.box}`, { rotation: "+=360" });
  // };
  // 下記は良い例、コンテキストセーフ
  const { contextSafe } = useGSAP(); // 分割代入でcontextSafe関数を抽出
  const handleClickGood = contextSafe(() => {
    // contextSafeでwrap
    gsap.to(`.${styles.box}`, { rotation: "+=360" });
  });
  return (
    <div className={styles.container}>
      <div className={styles.box} onClick={handleClickGood}>
        Click Me
      </div>
    </div>
  );
};

export default Component02;
