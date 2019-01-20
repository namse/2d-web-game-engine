import { MouseMode } from "./MouseMode";

export interface Brush {
  assetImage: HTMLImageElement,
  x: number,
  y: number,
}

const proxyHandler = {
  set(target: any, name: string, value: any) {
    target[name] = value;
    return true;
  }
}

interface State {
  mouseMode: MouseMode;
  brush: Brush;
}

const defaultState: State = {
  mouseMode: MouseMode.Move,
  brush: undefined,
}

const state = new Proxy<State>(defaultState, proxyHandler);

export default state;
