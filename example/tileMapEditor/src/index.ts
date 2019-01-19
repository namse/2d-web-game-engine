import { setCanvasElement } from '../../../src/CanvasManager';
import world from "../../../src/world";
import Text from "../../../src/Text";
import Vector from '../../../src/Vector';
import LayerMenu from './LayerMenu';
import MouseController from '../../../src/MouseController';

const canvasElement = document.getElementById('canvas') as HTMLCanvasElement;

setCanvasElement(canvasElement);

const title = new Text(new Vector(250, 50), 'Tile-map Editor', 20);
world.addChildren(title);

const layerMenu = new LayerMenu(new Vector(20, 100), new Vector(100, 400));
world.addChildren(layerMenu);

const mouseController = new MouseController();
