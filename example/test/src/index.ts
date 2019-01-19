import { setCanvasElement } from '../../../src/CanvasManager';
import Vector from "../../../src/Vector";
import Character from "../../../src/Character";
import world from "../../../src/world";
import KeyboardController from "../../../src/KeyboardController";

const canvasElement = document.getElementById('canvas') as HTMLCanvasElement;

setCanvasElement(canvasElement);

const sun = new Character(new Vector(250, 250), new Vector(0, 0));
sun.setImage(document.getElementById('sun') as HTMLImageElement);
world.addChildren(sun);

const earth = new Character(new Vector(100, 30), new Vector(0, 0));
earth.setImage(document.getElementById('earth') as HTMLImageElement);
sun.addChildren(earth);

const moon = new Character(new Vector(30, -20), new Vector(0, 0));
moon.setImage(document.getElementById('moon') as HTMLImageElement);
earth.addChildren(moon);

const keyboardController = new KeyboardController();
keyboardController.setCharacter(earth);
