const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 300,
    physics: { default: "arcade", arcade: { gravity: { y: 500 }, debug: false } },
    scene: { preload, create, update }
};

const game = new Phaser.Game(config);
let dino, cursors, chao, obstaculos;

function preload() {
    this.load.image("dino", "https://i.imgur.com/TbM7tR8.png"); // Dino
    this.load.image("chao", "https://i.imgur.com/oP1C7hS.png"); // Chão
    this.load.image("cacto", "https://i.imgur.com/ybUjE4y.png"); // Obstáculo
}

function create() {
    chao = this.physics.add.staticImage(400, 280, "chao");
    dino = this.physics.add.sprite(100, 200, "dino").setScale(0.5);
    
    dino.setCollideWorldBounds(true);
    this.physics.add.collider(dino, chao);

    obstaculos = this.physics.add.group();

    cursors = this.input.keyboard.createCursorKeys();

    this.time.addEvent({ delay: 1500, callback: spawnObstaculo, callbackScope: this, loop: true });
}

function update() {
    if (cursors.up.isDown && dino.body.touching.down) {
        dino.setVelocityY(-300);
    }

    Phaser.Actions.IncX(obstaculos.getChildren(), -5);
}

function spawnObstaculo() {
    let obstaculo = obstaculos.create(800, 250, "cacto").setScale(0.5);
    obstaculo.setVelocityX(-200);
}
