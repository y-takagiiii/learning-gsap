import styles from "./SelectBox.module.css";

type Props = {
  selected: string;
  onSelect: any;
};

const SelectBox = ({ selected, onSelect }: Props) => {
  return (
    <select className={styles.selectBox} value={selected} onChange={(e) => onSelect(e.target.value)}>
      <option value="component01">component01</option>
      <option value="component02">component02</option>
      <option value="component03">component03</option>
      <option value="component04">component04</option>
      <option value="component05">component05</option>
    </select>
  );
};

export default SelectBox;
