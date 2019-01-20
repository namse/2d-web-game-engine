import { setCanvasElement } from '../../../src/CanvasManager';
import world from "../../../src/world";
import Text from "../../../src/Text";
import Vector from '../../../src/Vector';
import LayerMenu from './LayerMenu';
import MouseController from '../../../src/MouseController';
import AssetMenu from './AssetMenu';
import TileMap from './TileMap';

const canvasElement = document.getElementById('canvas') as HTMLCanvasElement;

setCanvasElement(canvasElement);

const title = new Text(new Vector(250, 50), 'Tile-map Editor', 20);
world.addChildren(title);

const layerMenu = new LayerMenu(new Vector(20, 100), new Vector(100, 400));
world.addChildren(layerMenu);

const assetMenu = new AssetMenu(new Vector(140, 100), new Vector(AssetMenu.columnCount * AssetMenu.tileSize , 400));
world.addChildren(assetMenu);

const tileMap = new TileMap(new Vector(assetMenu.location.x + assetMenu.size.x + 20, 100), new Vector(500, 500));
world.addChildren(tileMap);

const mouseController = new MouseController();


