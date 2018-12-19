import world from "./world";

let canvasElement: HTMLCanvasElement;
let context: CanvasRenderingContext2D;

export function getContext(): CanvasRenderingContext2D {
  return context;
}

function onAnimationFrame() {
  world.tick();
  window.requestAnimationFrame(onAnimationFrame);
}

window.requestAnimationFrame(onAnimationFrame);

export function setCanvasElement(element: HTMLCanvasElement) {
  canvasElement = element;
  context = canvasElement.getContext('2d');
}