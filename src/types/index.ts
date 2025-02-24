import { ComponentChildren } from 'preact';

export type ToggleTabsProps = {
    activeTab: string;
    setActiveTab: (tab: string) => void;
    tabs: string[];
    theme?: "light" | "dark";
};

export type YearsSelectorProps = {
    value: number;
    onChange: (newYears: number) => void;
};

export type InputFieldProps = {
    label: string;
    id: string;
    name: string;
    value: string | number;
    onInput: (e: Event) => void;
    type?: string;
    children?: ComponentChildren;
};

export type CheckboxFieldProps = {
    label: string;
    id: string;
    checked: boolean;
    onChange: (e: Event) => void;
};
