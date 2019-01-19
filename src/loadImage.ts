export default function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise(resolve => {
    const image = new Image();
    image.onload = (() => resolve(image));
    image.src = url;
  });
}
