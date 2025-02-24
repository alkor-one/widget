import { FunctionComponent } from 'preact';
import { InputFieldProps } from '../types';
import styles from '../Widget.module.css';

const InputField: FunctionComponent<InputFieldProps> = ({ label, id, name, value, onInput, type="text", children }) => (
    <div className={styles.fieldGroup}>
        <label className={styles.label} htmlFor={id}>{label}</label>

        {children ? (
            <div className={styles.alignChildren}>
                {children}
                <input className={styles.input} id={id} name={name} type={type} value={value} onInput={onInput}/>
            </div>
        ) : (
            <input className={styles.input} id={id} name={name} type={type} value={value} onInput={onInput}/>
        )}
    </div>
);

export default InputField;
