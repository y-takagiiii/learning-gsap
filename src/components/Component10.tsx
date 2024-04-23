import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ReactNode, createContext, useContext, useRef, useState } from "react";
import styles from "./Component10.module.css";

gsap.registerPlugin(useGSAP);

type BoxProps = {
  id: string;
  children: ReactNode;
};

type ContextProps = {
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
};

// 複数のコンポーネントでタイムラインを共有したり、
// 異なるコンポーネントに存在する要素からアニメーションを構成したりする必要がある場合、
// 1. 親コンポーネントから子コンポーネントにpropsを渡す
// 2. 親コンポーネントから子コンポーネントにcallbackを渡す
// のどちらかで実装する
// コンポーネントのネストが深い場合や別のツリーに存在する場合はreactのuseContextを使って値を受け渡す
const SelectedContext = createContext<ContextProps | null>(null);

const Box = ({ id, children }: BoxProps) => {
  const boxRef = useRef<HTMLDivElement | null>(null);
  const context = useContext(SelectedContext);
  useGSAP(() => {
    if (context === null) {
      return;
    }
    const { selected } = context;
    gsap.to(boxRef.current, { x: selected === id ? 200 : 0 });
  }, [context, id]);
  if (context === null) {
    return null;
  }
  return (
    <div className={styles.box} ref={boxRef}>
      {children}
    </div>
  );
};

const Menu = () => {
  const optionCount = 3;
  const context = useContext(SelectedContext);
  if (context === null) {
    return;
  }
  const { selected, setSelected } = context;
  return (
    <div className={styles.menu}>
      {Array.from({ length: optionCount }, (_, i) => {
        const number = i + 1;
        return (
          <label key={i}>
            <input
              onChange={(event) => {
                setSelected(event.target.value);
              }}
              checked={selected === number.toString()}
              type="radio"
              value={number.toString()}
              name="selected"
            />{" "}
            Box {number}
          </label>
        );
      })}
    </div>
  );
};

const Boxes = () => {
  return (
    <div className={styles.boxes}>
      <Box id="1">Box 1</Box>
      <Box id="2">Box 2</Box>
      <Box id="3">Box 3</Box>
    </div>
  );
};

const Component10 = () => {
  const [selected, setSelected] = useState("");
  return (
    <div className={styles.container}>
      <SelectedContext.Provider value={{ selected, setSelected }}>
        <Menu />
        <Boxes />
      </SelectedContext.Provider>
    </div>
  );
};

export default Component10;
