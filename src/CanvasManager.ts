import world from "./world";

let canvasElement: HTMLCanvasElement;
let context: CanvasRenderingContext2D;

export function getContext(): CanvasRenderingContext2D {
  return context;
}

function clearCanvas() {
  context.clearRect(0, 0, canvasElement.width, canvasElement.height);
}

let frameCount = 0;
let lastFrameTime = (new Date()).getTime();
let isShowFps = false;

let prevTime = (new Date()).getTime();
function onAnimationFrame() {
  const nowTime = (new Date()).getTime();
  const dt = (nowTime - prevTime) / 1000;

  frameCount += 1;
  if (frameCount === 9) {
    const deltaTimeFor10Frames = (nowTime - lastFrameTime) / 1000;
    const fps = 10 / (deltaTimeFor10Frames);
    if (isShowFps) {
      console.log(fps);
    }
    frameCount = 0;
    lastFrameTime = nowTime;
  }

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

export function getCanvasElement() {
  return canvasElement;
}

export function toggleFpsLog(isEnable: boolean) {
  isShowFps = isEnable;
}
