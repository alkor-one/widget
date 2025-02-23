declare global {
  interface Window {
    MyWidget: (el: HTMLElement) => void;
  }
}
export {};