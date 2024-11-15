import * as ex from 'excalibur';

export const Resources = {
  // in vite the public directory is statically hosted
  SwordImage: new ex.ImageSource('./img/sword.png'),
  CalSpriteSheetImage: new ex.ImageSource('./img/cal.png'),
  BlockImage: new ex.ImageSource('./img/block.png', {
    wrapping: ex.ImageWrapping.Repeat
  }),
  SmallBlock: new ex.ImageSource('./img/small-block.png')
} as const;


export const CalSpriteSheet = ex.SpriteSheet.fromImageSource({
  image: Resources.CalSpriteSheetImage,
  grid: {
    rows: 1,
    columns: 8,
    spriteHeight: 32,
    spriteWidth: 32
  }
})

export const loader = new ex.Loader(Object.values(Resources));
