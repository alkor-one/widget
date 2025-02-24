import styles from '../Widget.module.css';
import { YearsSelectorProps } from '../types';
import { FunctionComponent } from "preact";

const YearsSelector: FunctionComponent<YearsSelectorProps> = ({ value, onChange }) => {
      const handleDecrement = () => {
        if (value > 0) {
            onChange(value - 1);
        }
    };

    const handleIncrement = () => {
        onChange(value + 1);
    };

    return (
        <div class={styles.yearsSelector}>
            <span class={styles.yearsLabel}>Years of ownership</span>
            <div class={styles.yearsControls}>
                <button class={styles.yearsButton} onClick={handleDecrement} disabled={value <= 0}>-</button>
                <span class={styles.yearsValue}>{value || 0}</span>
                <button class={styles.yearsButton} onClick={handleIncrement}>+</button>
            </div>
        </div>
    );
};

export default YearsSelector;
