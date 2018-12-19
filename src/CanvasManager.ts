import world from "./world";

let canvasElement: HTMLCanvasElement;
let context: CanvasRenderingContext2D;

export function getContext(): CanvasRenderingContext2D {
  return context;
}

function clearCanvas() {
  context.clearRect(0, 0, canvasElement.width, canvasElement.height);
}

let prevTime = (new Date()).getTime();
function onAnimationFrame() {
  const nowTime = (new Date()).getTime();
  const dt = (nowTime - prevTime) / 1000;

  clearCanvas();
  world.tick(dt);

  prevTime = nowTime;
  window.requestAnimationFrame(onAnimationFrame);
}

window.requestAnimationFrame(onAnimationFrame);

export function setCanvasElement(element: HTMLCanvasElement) {
  canvasElement = element;
  context = canvasElement.getContext('2d');
}