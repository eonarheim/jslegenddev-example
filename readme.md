# Small Example for JS Legend Dev

This is a small example in idiomatic Excalibur to make functionality implied by the provided phaser source `./src/phaser.ts`

Notes:
* The current released version is v0.29.3, but v0.30.0 is coming VERY soon.
* There are a few bugs and A LOT of perf improvements in the latest alpha of v0.30.0
  - https://www.npmjs.com/package/excalibur?activeTab=versions


## Running Locally

* Install [node.js](https://nodejs.org/en/download/prebuilt-installer)
* `npm install`
* `npm run start`

This will use the vite dev server, it will also statically host the `public/img` folder

## About Excalibur Projects

This project is how I build my "idiomatic" projects, there are plenty of ways to structure things but I like this best.

1. `main.ts` Is the entry point to the game, I like to keep to just game configuration and as simple as possible. You can put the whole game in one file but I don't recommend it.
2. `level.ts` is an `ex.Scene` implementation, I like to use these as the composition root of a game. This is where I usually assemble actors.
3. `player.ts` is an `ex.Actor` implementation, it controls all the user input and responds accordingly to them. It also has `ex.CollisionType.Active` physics turned on which means it'll participate in collisions.
4. `ground.ts` is another `ex.Actor` implementation, this one is pretty simple. It has `ex.CollisionType.Fixed` physics turned on which you can think of as an immovable object. Additionally it's using sprite tiling to layout a block pattern.
5. `resources.ts` is where we define all of our assets and our loader. `ex.ImageSource` can be hinted to allow for wrapping. Additionally I like to put my `ex.SpriteSheet` parsing in this file as well. 

This TypeScript `as const` trick gives you strongly typed key-value pairs on `Resources`, so if you load an `ex.Sound` or another resource type the value will have the right TypeScript type.

```typescript
export const Resources = {
  // in vite the public directory is statically hosted
  SwordImage: new ex.ImageSource('./img/sword.png'),
  CalSpriteSheetImage: new ex.ImageSource('./img/cal.png'),
  BlockImage: new ex.ImageSource('./img/block.png', {
    wrapping: ex.ImageWrapping.Repeat
  }),
  SmallBlock: new ex.ImageSource('./img/small-block.png')
} as const;
```

## When should I use the constructor vs. onInitialize()

* Constructors are good for things that will always be constant and do not rely on loaded assets. 
* `onInitialize()` is useful for a few things
  * Defer potentially expensive logic to before the first update
  * Guarantee assets are loaded
  * Guarantee other excalibur primitives are initialized
  * Guarantee that the actor is a member of a scene