import { setCanvasElement } from '../../src/CanvasManager';
import Vector from "../../src/Vector";
import Sprite from "../../src/Sprite";
import world from "../../src/world";

const canvasElement = document.getElementById('canvas') as HTMLCanvasElement;

setCanvasElement(canvasElement);

const sun = new Sprite(new Vector(250, 250));
world.addChildren(sun);

const earth = new Sprite(new Vector(30, 30));
sun.addChildren(earth);

const moon = new Sprite(new Vector(5, 0));
earth.addChildren(moon);


