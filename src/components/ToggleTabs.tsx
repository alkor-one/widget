import { FunctionComponent } from 'preact';
import { ToggleTabsProps } from '../types';
import styles from '../Widget.module.css';

const ToggleTabs: FunctionComponent<ToggleTabsProps> = ({ activeTab, setActiveTab, tabs, theme }) => (
    <div
        class={`${styles.toggle} ${theme === "light" ? styles.lightTheme : ""}`}
        role="tablist"
        aria-label="View Mode"
    >
        {tabs.map((tab) => (
            <button
                type="button"
                key={tab}
                class={`${styles.toggleBtn} ${activeTab === tab ? styles.toggleBtnActive : ""}`}
                onClick={() => setActiveTab(tab)}
                role="tab"
                aria-selected={activeTab === tab}
            >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
        ))}
    </div>
);

export default ToggleTabs;
