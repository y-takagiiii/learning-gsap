import styles from "./SelectBox.module.css";

type Props = {
  selected: string;
  onSelect: (value: string) => void;
};

const SelectBox = ({ selected, onSelect }: Props) => {
  const optionCount = 14;
  return (
    <select
      className={styles.selectBox}
      value={selected}
      onChange={(e) => onSelect(e.target.value)}
    >
      {Array.from({ length: optionCount }, (_, i) => {
        const number = i + 1;
        const formattedNumber = number < 10 ? `0${number}` : `${number}`;
        return (
          <option key={number} value={`component${formattedNumber}`}>
            {`component${formattedNumber}`}
          </option>
        );
      })}
    </select>
  );
};

export default SelectBox;
