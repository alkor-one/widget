import { FunctionComponent } from 'preact';
import { CheckboxFieldProps } from '../types';
import styles from '../Widget.module.css';

const CheckboxField: FunctionComponent<CheckboxFieldProps> = ({ label, id, checked, onChange }) => (
    <div class={`${styles.fieldGroup} ${styles.fieldGroupCheckbox}`}>
        <input class={styles.checkbox} id={id} type="checkbox" checked={checked} onChange={onChange} />
        <label class={styles.label} for={id}>{label}</label>
    </div>
);

export default CheckboxField;
