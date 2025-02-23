import { h, render } from "preact";
import Widget from "./Widget";

const rootElement = document.getElementById("widget");
if (rootElement) {
  render(h(Widget, null), rootElement);
}

window.MyWidget = (element: HTMLElement) => {
  render(h(Widget, null), element);
};

