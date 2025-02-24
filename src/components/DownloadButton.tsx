import styles from '../Widget.module.css';

const DownloadButton = ({ onClick }) => (
    <button
        aria-label="Download a report of your savings calculations"
        class={styles.downloadBtn}
        onClick={onClick}
    >
        Download Report
    </button>
);

export default DownloadButton;
