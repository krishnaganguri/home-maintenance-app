import * as ImageManipulator from "expo-image-manipulator";

export async function compressImage1(uri: string) {
  const image = ImageManipulator.ImageManipulator.manipulate(uri);

  image.crop({
    originX: 200,
    originY: 400,
    width: 800,
    height: 500,
  });

  image.resize({
    width: 1200,
  });

  const result = await image.renderAsync();

  const compressed =  await result.saveAsync({
    compress: 1,
    format:
      ImageManipulator.SaveFormat.JPEG,
  });
  return compressed.uri;
}

export async function compressImage(uri: string) {
  const image = ImageManipulator.ImageManipulator.manipulate(uri);

  image.resize({
    width: 1200,
  });

  const result = await image.renderAsync();

  const compressed = await result.saveAsync({
    compress: 0.7,
    format: ImageManipulator.SaveFormat.JPEG,
  });

  return compressed.uri;
}