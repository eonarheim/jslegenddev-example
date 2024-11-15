// @ts-nocheck

// Phaser example provided by jsledgenddev

class Player extends Phaser.GameObject.Sprite {
   constructor(scene, x, y) {
     super(scene, x, y);
     this.scene.add.existing(this); // add the Player to the scene
     this.scene.physics.add.existing(this); // add the Player to the physic system
     this.randomProperty = "test" // set your custom props here
     this.play({key: "run", repeat: -1}); // play the run animation when the Player object is created and repeat it indefinitely
   }


   // this method needs to be manually called on the created object or somewhere else in the class, etc...
   myCustomMethods() {
       // your code
   }
}
