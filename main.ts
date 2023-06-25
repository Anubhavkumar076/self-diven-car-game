namespace SpriteKind {
    export const Cover = SpriteKind.create()
    export const Power = SpriteKind.create()
    export const Tentacle = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    game.over(false)
})
function nextLevel () {
    info.changeScoreBy(1)
    scene.setTileMap(tilemap2())
    for (let value2 of sprites.allOfKind(SpriteKind.Cover)) {
        value2.destroy()
    }
    for (let value22 of sprites.allOfKind(SpriteKind.Enemy)) {
        value22.destroy()
    }
    for (let value3 of scene.getTilesByType(3)) {
        coverSprite = sprites.create(grassTiles[randint(0, grassTiles.length - 1)], SpriteKind.Cover)
        scene.place(value3, coverSprite)
        coverSprite.setFlag(SpriteFlag.Ghost, true)
        coverSprite.z = -1
    }
    if (Math.percentChance(3)) {
        powerup = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . d . . . . . . . . 
            . . . . . . 1 d 1 . . . . . . . 
            . . . . . . 1 . 1 . . . . . . . 
            . . . . . 1 9 9 9 1 . . . . . . 
            . . . . . 1 9 9 9 1 . . . . . . 
            . . . . . 1 9 9 9 1 . . . . . . 
            . . . . . 1 1 1 1 1 . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Power)
        scene.placeOnRandomTile(powerup, 5)
    }
    tiles.placeOnTile(thePlayer, tiles.getTileLocation(5, height - 1))
    speed = 100
}
function tilemap2 () {
    tileMap = image.create(10, randint(20, 50))
    height = tileMap.height
for (let index = 0; index <= height; index++) {
        color = randint(2, 6)
        tileMap.drawLine(0, index - 1, 10, index - 1, color)
        if (color == 2 || color == 4 || color == 6) {
            tileMap.setPixel(0, index - 1, 10)
            tileMap.setPixel(9, index - 1, 11)
        }
    }
    tileMap.drawLine(0, 0, 10, 0, 9)
    tileMap.drawLine(0, height - 1, 10, height - 1, 3)
    return tileMap
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Power, function (sprite, otherSprite) {
    speed = 125
    otherSprite.destroy()
})
scene.onHitTile(SpriteKind.Player, 9, function (sprite) {
    nextLevel()
})
let seaMonster: Sprite = null
let car: Sprite = null
let color = 0
let tileMap: Image = null
let speed = 0
let height = 0
let powerup: Sprite = null
let coverSprite: Sprite = null
let grassTiles: Image[] = []
let thePlayer: Sprite = null
thePlayer = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . b 5 5 b . . . 
    . . . . . . b b b b b b . . . . 
    . . . . . b b 5 5 5 5 5 b . . . 
    . b b b b b 5 5 5 5 5 5 5 b . . 
    . b d 5 b 5 5 5 5 5 5 5 5 b . . 
    . . b 5 5 b 5 d 1 f 5 d 4 f . . 
    . . b d 5 5 b 1 f f 5 4 4 c . . 
    b b d b 5 5 5 d f b 4 4 4 4 b . 
    b d d c d 5 5 b 5 4 4 4 4 4 4 b 
    c d d d c c b 5 5 5 5 5 5 5 b . 
    c b d d d d d 5 5 5 5 5 5 5 b . 
    . c d d d d d d 5 5 5 5 5 d b . 
    . . c b d d d d d 5 5 5 b b . . 
    . . . c c c c c c c c b b . . . 
    `, SpriteKind.Player)
scene.cameraFollowSprite(thePlayer)
animation.runImageAnimation(
thePlayer,
[img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . b 5 5 b . . . 
    . . . . . . b b b b b b . . . . 
    . . . . . b b 5 5 5 5 5 b . . . 
    . b b b b b 5 5 5 5 5 5 5 b . . 
    . b d 5 b 5 5 5 5 5 5 5 5 b . . 
    . . b 5 5 b 5 d 1 f 5 d 4 f . . 
    . . b d 5 5 b 1 f f 5 4 4 c . . 
    b b d b 5 5 5 d f b 4 4 4 4 b . 
    b d d c d 5 5 b 5 4 4 4 4 4 4 b 
    c d d d c c b 5 5 5 5 5 5 5 b . 
    c b d d d d d 5 5 5 5 5 5 5 b . 
    . c d d d d d d 5 5 5 5 5 d b . 
    . . c b d d d d d 5 5 5 b b . . 
    . . . c c c c c c c c b b . . . 
    `,img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . b 5 b . . . 
    . . . . . . . . . b 5 b . . . . 
    . . . . . . b b b b b b . . . . 
    . . . . . b b 5 5 5 5 5 b . . . 
    . b b b b b 5 5 5 5 5 5 5 b . . 
    . b d 5 b 5 5 5 5 5 5 5 5 b . . 
    . . b 5 5 b 5 d 1 f 5 d 4 f . . 
    . . b d 5 5 b 1 f f 5 4 4 c . . 
    b b d b 5 5 5 d f b 4 4 4 4 4 b 
    b d d c d 5 5 b 5 4 4 4 4 4 b . 
    c d d d c c b 5 5 5 5 5 5 5 b . 
    c b d d d d d 5 5 5 5 5 5 5 b . 
    . c d d d d d d 5 5 5 5 5 d b . 
    . . c b d d d d d 5 5 5 b b . . 
    . . . c c c c c c c c b b . . . 
    `,img`
    . . . . . . . . . . b 5 b . . . 
    . . . . . . . . . b 5 b . . . . 
    . . . . . . . . . b c . . . . . 
    . . . . . . b b b b b b . . . . 
    . . . . . b b 5 5 5 5 5 b . . . 
    . . . . b b 5 d 1 f 5 5 d f . . 
    . . . . b 5 5 1 f f 5 d 4 c . . 
    . . . . b 5 5 d f b d d 4 4 . . 
    b d d d b b d 5 5 5 4 4 4 4 4 b 
    b b d 5 5 5 b 5 5 4 4 4 4 4 b . 
    b d c 5 5 5 5 d 5 5 5 5 5 b . . 
    c d d c d 5 5 b 5 5 5 5 5 5 b . 
    c b d d c c b 5 5 5 5 5 5 5 b . 
    . c d d d d d d 5 5 5 5 5 d b . 
    . . c b d d d d d 5 5 5 b b . . 
    . . . c c c c c c c c b b . . . 
    `,img`
    . . . . . . . . . . b 5 b . . . 
    . . . . . . . . . b 5 b . . . . 
    . . . . . . b b b b b b . . . . 
    . . . . . b b 5 5 5 5 5 b . . . 
    . . . . b b 5 d 1 f 5 d 4 c . . 
    . . . . b 5 5 1 f f d d 4 4 4 b 
    . . . . b 5 5 d f b 4 4 4 4 b . 
    . . . b d 5 5 5 5 4 4 4 4 b . . 
    . . b d d 5 5 5 5 5 5 5 5 b . . 
    . b d d d d 5 5 5 5 5 5 5 5 b . 
    b d d d b b b 5 5 5 5 5 5 5 b . 
    c d d b 5 5 d c 5 5 5 5 5 5 b . 
    c b b d 5 d c d 5 5 5 5 5 5 b . 
    . b 5 5 b c d d 5 5 5 5 5 d b . 
    b b c c c d d d d 5 5 5 b b . . 
    . . . c c c c c c c c b b . . . 
    `,img`
    . . . . . . . . . . b 5 b . . . 
    . . . . . . . . . b 5 b . . . . 
    . . . . . . b b b b b b . . . . 
    . . . . . b b 5 5 5 5 5 b . . . 
    . . . . b b 5 d 1 f 5 d 4 c . . 
    . . . . b 5 5 1 f f d d 4 4 4 b 
    . . . . b 5 5 d f b 4 4 4 4 b . 
    . . . b d 5 5 5 5 4 4 4 4 b . . 
    . b b d d d 5 5 5 5 5 5 5 b . . 
    b d d d b b b 5 5 5 5 5 5 5 b . 
    c d d b 5 5 d c 5 5 5 5 5 5 b . 
    c b b d 5 d c d 5 5 5 5 5 5 b . 
    c b 5 5 b c d d 5 5 5 5 5 5 b . 
    b b c c c d d d 5 5 5 5 5 d b . 
    . . . . c c d d d 5 5 5 b b . . 
    . . . . . . c c c c c b b . . . 
    `,img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . b 5 b . . . 
    . . . . . . . . . b 5 b . . . . 
    . . . . . . b b b b b b . . . . 
    . . . . . b b 5 5 5 5 5 b . . . 
    . . . . b b 5 d 1 f 5 5 d f . . 
    . . . . b 5 5 1 f f 5 d 4 c . . 
    . . . . b 5 5 d f b d d 4 4 . . 
    . b b b d 5 5 5 5 5 4 4 4 4 4 b 
    b d d d b b d 5 5 4 4 4 4 4 b . 
    b b d 5 5 5 b 5 5 5 5 5 5 b . . 
    c d c 5 5 5 5 d 5 5 5 5 5 5 b . 
    c b d c d 5 5 b 5 5 5 5 5 5 b . 
    . c d d c c b d 5 5 5 5 5 d b . 
    . . c b d d d d d 5 5 5 b b . . 
    . . . c c c c c c c c b b . . . 
    `],
100,
true
)
grassTiles = [
img`
    5 7 5 7 7 7 7 7 7 7 7 7 7 7 7 7 
    7 7 7 7 7 7 7 7 7 7 7 7 7 1 7 7 
    7 7 7 1 1 7 7 7 7 7 7 7 1 7 1 7 
    7 7 3 1 1 3 7 7 7 5 7 7 6 1 6 7 
    7 1 1 6 6 1 1 7 7 5 7 7 7 7 7 7 
    7 d 1 7 7 1 d 7 7 6 7 7 7 7 7 7 
    7 6 3 1 1 3 6 7 7 7 7 5 7 7 7 7 
    7 7 6 d d 6 7 7 7 7 5 5 6 7 7 7 
    7 7 7 7 7 7 7 1 7 7 5 6 7 7 7 7 
    7 7 7 7 7 7 1 7 1 7 7 7 1 1 7 7 
    7 7 1 7 7 7 6 1 6 7 7 3 1 1 3 7 
    7 1 7 1 7 7 7 7 7 7 1 1 6 6 1 1 
    7 6 1 6 7 7 7 7 7 7 d 1 7 7 1 d 
    7 7 7 7 7 7 7 7 7 7 6 3 1 1 3 6 
    7 7 7 7 7 7 7 7 7 7 7 6 d d 6 7 
    7 7 5 7 7 7 7 7 7 7 7 7 7 7 7 7 
    `,
img`
    7 7 7 7 5 7 7 7 7 7 7 7 7 7 7 7 
    7 7 5 7 5 5 7 7 7 7 7 7 7 7 7 7 
    7 6 5 5 7 5 7 5 5 7 7 7 7 7 7 7 
    7 7 6 5 7 7 5 5 6 7 7 7 7 7 7 7 
    7 7 7 6 7 7 5 6 7 7 7 7 7 7 7 7 
    7 7 7 7 7 7 7 7 7 7 7 7 5 7 7 7 
    7 7 7 7 7 7 7 7 7 7 7 7 5 7 7 7 
    7 7 7 7 7 7 7 7 7 7 7 7 6 7 7 7 
    7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
    7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
    7 7 7 5 7 7 7 7 7 7 7 7 7 7 7 7 
    7 7 7 5 7 7 7 7 7 7 7 7 7 7 7 7 
    7 7 7 6 7 7 7 7 7 7 7 7 7 7 7 7 
    7 7 7 7 7 7 7 7 7 7 7 7 7 5 7 7 
    7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
    7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
    `,
img`
    5 7 5 7 7 7 7 7 7 7 7 7 7 7 7 7 
    7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
    7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
    7 7 7 7 7 5 7 7 7 7 7 7 7 7 7 7 
    7 7 7 5 7 5 5 7 7 7 7 7 5 7 7 7 
    7 7 6 5 5 7 5 7 5 5 7 7 7 7 7 7 
    7 7 7 6 5 7 7 5 5 6 7 7 7 7 7 7 
    7 7 7 7 6 7 7 5 6 7 7 7 7 7 7 7 
    7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
    7 7 5 7 7 7 7 7 7 7 7 7 7 7 7 7 
    7 7 7 7 7 7 7 7 7 7 7 5 5 7 7 7 
    7 7 7 7 7 7 7 7 7 7 5 5 6 7 7 7 
    7 7 7 7 7 7 7 7 5 5 7 6 7 7 7 7 
    7 7 7 7 7 7 7 7 7 5 5 7 7 7 7 7 
    7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 5 
    7 7 5 7 7 7 7 7 7 7 7 7 7 7 7 5 
    `,
img`
    d d d d d d d d d d d d d d d d 
    d d d 1 1 d d d d d d d d b d d 
    d d d 1 1 d d d d d d d d d d d 
    d d d d d d d d d d d d d d d d 
    d d b d d d d d d b b d d d d d 
    d d d d d d d d d b b d d d d d 
    d d d d d d d d d d d d d d d d 
    d d d d d d d d d d d d d d d d 
    d d d d d b d d d d d d d d d d 
    d d d d d d d d d d d d d d d d 
    d d d d d d d d d d d d d d d d 
    1 1 d d d d d d d d d d d d d d 
    1 1 d d d d d d d d d d b d d d 
    d d d d d d 1 d d d d d d d d d 
    d d d d d d d d d d d d d d d d 
    d d d d d d d d d d d d d d b d 
    `
]
let carRightImages = [img`
    . . . . . . . . . . . . . . . . 
    . . . . 6 6 6 6 6 6 6 6 . . . . 
    . . . 6 9 6 6 6 6 6 6 c 6 . . . 
    . . 6 c 9 6 6 6 6 6 6 c c 6 . . 
    . 6 c c 9 9 9 9 9 9 6 c c 9 6 d 
    . 6 c 6 8 8 8 8 8 8 8 b c 9 6 6 
    . 6 6 8 b b 8 b b b 8 8 b 9 6 6 
    . 6 8 b b b 8 b b b b 8 6 6 6 6 
    . 8 8 6 6 6 8 6 6 6 6 6 8 6 6 6 
    . 8 8 8 8 8 8 f 8 8 8 f 8 6 d d 
    . 8 8 8 8 8 8 f 8 8 f 8 8 8 6 d 
    . 8 8 8 8 8 8 f f f 8 8 8 8 8 8 
    . 8 f f f f 8 8 8 8 f f f 8 8 8 
    . . f f f f f 8 8 f f f f f 8 . 
    . . . f f f . . . . f f f f . . 
    . . . . . . . . . . . . . . . . 
    `, img`
    . . . . . . . . . . . . . . . . 
    . . . . 2 2 2 2 2 2 2 2 . . . . 
    . . . 2 4 2 2 2 2 2 2 c 2 . . . 
    . . 2 c 4 2 2 2 2 2 2 c c 2 . . 
    . 2 c c 4 4 4 4 4 4 2 c c 4 2 d 
    . 2 c 2 e e e e e e e b c 4 2 2 
    . 2 2 e b b e b b b e e b 4 2 2 
    . 2 e b b b e b b b b e 2 2 2 2 
    . e e 2 2 2 e 2 2 2 2 2 e 2 2 2 
    . e e e e e e f e e e f e 2 d d 
    . e e e e e e f e e f e e e 2 d 
    . e e e e e e f f f e e e e e e 
    . e f f f f e e e e f f f e e e 
    . . f f f f f e e f f f f f e . 
    . . . f f f . . . . f f f f . . 
    . . . . . . . . . . . . . . . . 
    `, img`
    . . . . . . . . . . . . . . . . 
    . . . . 3 3 3 3 3 3 3 3 . . . . 
    . . . 3 d 3 3 3 3 3 3 c 3 . . . 
    . . 3 c d 3 3 3 3 3 3 c c 3 . . 
    . 3 c c d d d d d d 3 c c d 3 d 
    . 3 c 3 a a a a a a a b c d 3 3 
    . 3 3 a b b a b b b a a b d 3 3 
    . 3 a b b b a b b b b a 3 3 3 3 
    . a a 3 3 3 a 3 3 3 3 3 a 3 3 3 
    . a a a a a a f a a a f a 3 d d 
    . a a a a a a f a a f a a a 3 d 
    . a a a a a a f f f a a a a a a 
    . a f f f f a a a a f f f a a a 
    . . f f f f f a a f f f f f a . 
    . . . f f f . . . . f f f f . . 
    . . . . . . . . . . . . . . . . 
    `]
let carLeftImages = [img`
    . . . . . . . . . . . . . . . . 
    . . . . . . 6 6 6 6 6 6 6 6 . . 
    . . . . . 6 c 6 6 6 6 6 6 9 6 . 
    . . . . 6 c c 6 6 6 6 6 6 9 c 6 
    . . d 6 9 c c 6 9 9 9 9 9 9 c c 
    . d 6 6 9 c b 8 8 8 8 8 8 8 6 c 
    . 6 6 6 9 b 8 8 b b b 8 b b 8 6 
    . 6 6 6 6 6 8 b b b b 8 b b b 8 
    . 6 6 6 6 8 6 6 6 6 6 8 6 6 6 8 
    . 6 d d 6 8 f 8 8 8 f 8 8 8 8 8 
    . d d 6 8 8 8 f 8 8 f 8 8 8 8 8 
    . 8 8 8 8 8 8 8 f f f 8 8 8 8 8 
    . 8 8 8 8 f f f 8 8 8 8 f f f f 
    . . . 8 f f f f f 8 8 f f f f f 
    . . . . f f f f . . . . f f f . 
    . . . . . . . . . . . . . . . . 
    `, img`
    . . . . . . . . . . . . . . . . 
    . . . . . . 2 2 2 2 2 2 2 2 . . 
    . . . . . 2 c 2 2 2 2 2 2 4 2 . 
    . . . . 2 c c 2 2 2 2 2 2 4 c 2 
    . . d 2 4 c c 2 4 4 4 4 4 4 c c 
    . d 2 2 4 c b e e e e e e e 2 c 
    . 2 2 2 4 b e e b b b e b b e 2 
    . 2 2 2 2 2 e b b b b e b b b e 
    . 2 2 2 2 e 2 2 2 2 2 e 2 2 2 e 
    . 2 d d 2 e f e e e f e e e e e 
    . d d 2 e e e f e e f e e e e e 
    . e e e e e e e f f f e e e e e 
    . e e e e f f f e e e e f f f f 
    . . . e f f f f f e e f f f f f 
    . . . . f f f f . . . . f f f . 
    . . . . . . . . . . . . . . . . 
    `, img`
    . . . . . . . . . . . . . . . . 
    . . . . . . 3 3 3 3 3 3 3 3 . . 
    . . . . . 3 c 3 3 3 3 3 3 d 3 . 
    . . . . 3 c c 3 3 3 3 3 3 d c 3 
    . . d 3 d c c 3 d d d d d d c c 
    . d 3 3 d c b a a a a a a a 3 c 
    . 3 3 3 d b a a b b b a b b a 3 
    . 3 3 3 3 3 a b b b b a b b b a 
    . 3 3 3 3 a 3 3 3 3 3 a 3 3 3 a 
    . 3 d d 3 a f a a a f a a a a a 
    . d d 3 a a a f a a f a a a a a 
    . a a a a a a a f f f a a a a a 
    . a a a a f f f a a a a f f f f 
    . . . a f f f f f a a f f f f f 
    . . . . f f f f . . . . f f f . 
    . . . . . . . . . . . . . . . . 
    `]
scene.setTile(2, img`
    c c c c c c c c c c c c c c c c 
    b b b b b b b b b b b b b b b b 
    d d d d d d d d d d d d d d d d 
    b b b b b b b b b b b b b b b b 
    b b b b b b b b b b b b b b b b 
    b b b b b b b b b b b b b b b b 
    b b b b b b b b b b b b b b b b 
    b 1 1 1 1 d b b b 1 1 1 1 d b b 
    b d 1 1 1 1 b b b d 1 1 1 1 b b 
    b b b b b b b b b b b b b b b b 
    b b b b b b b b b b b b b b b b 
    b b b b b b b b b b b b b b b b 
    b b b b b b b b b b b b b b b b 
    d d d d d d d d d d d d d d d d 
    b b b b b b b b b b b b b b b b 
    c c c c c c c c c c c c c c c c 
    `, false)
scene.setTile(3, img`
    5 7 5 7 7 7 7 7 7 7 7 7 7 7 7 7 
    7 7 7 7 7 7 7 7 7 7 7 7 7 1 7 7 
    7 7 7 1 1 7 7 7 7 7 7 7 1 7 1 7 
    7 7 3 1 1 3 7 7 7 5 7 7 6 1 6 7 
    7 1 1 6 6 1 1 7 7 5 7 7 7 7 7 7 
    7 d 1 7 7 1 d 7 7 6 7 7 7 7 7 7 
    7 6 3 1 1 3 6 7 7 7 7 5 7 7 7 7 
    7 7 6 d d 6 7 7 7 7 5 5 6 7 7 7 
    7 7 7 7 7 7 7 1 7 7 5 6 7 7 7 7 
    7 7 7 7 7 7 1 7 1 7 7 7 1 1 7 7 
    7 7 1 7 7 7 6 1 6 7 7 3 1 1 3 7 
    7 1 7 1 7 7 7 7 7 7 1 1 6 6 1 1 
    7 6 1 6 7 7 7 7 7 7 d 1 7 7 1 d 
    7 7 7 7 7 7 7 7 7 7 6 3 1 1 3 6 
    7 7 7 7 7 7 7 7 7 7 7 6 d d 6 7 
    7 7 5 7 7 7 7 7 7 7 7 7 7 7 7 7 
    `, false)
scene.setTile(4, img`
    c c c c c c c c c c c c c c c c 
    b b b b b b b b b b b b b b b b 
    d d d d d d d d d d d d d d d d 
    b b b b b b b b b b b b b b b b 
    b b b b b b b b b b b b b b b b 
    b b b b b b b b b b b b b b b b 
    b b b b b b b b b b b b b b b b 
    b 1 1 1 1 d b b b 1 1 1 1 d b b 
    b d 1 1 1 1 b b b d 1 1 1 1 b b 
    b b b b b b b b b b b b b b b b 
    b b b b b b b b b b b b b b b b 
    b b b b b b b b b b b b b b b b 
    b b b b b b b b b b b b b b b b 
    d d d d d d d d d d d d d d d d 
    b b b b b b b b b b b b b b b b 
    c c c c c c c c c c c c c c c c 
    `, false)
scene.setTile(5, img`
    8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 
    8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 
    8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 
    8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 
    8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 
    8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 
    8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 
    8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 
    8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 
    8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 
    8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 
    8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 
    8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 
    8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 
    8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 
    8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 
    `, false)
scene.setTile(6, img`
    c c c c c c c c c c c c c c c c 
    b b b b b b b b b b b b b b b b 
    d d d d d d d d d d d d d d d d 
    b b b b b b b b b b b b b b b b 
    b b b b b b b b b b b b b b b b 
    b b b b b b b b b b b b b b b b 
    b b b b b b b b b b b b b b b b 
    b 1 1 1 1 d b b b 1 1 1 1 d b b 
    b d 1 1 1 1 b b b d 1 1 1 1 b b 
    b b b b b b b b b b b b b b b b 
    b b b b b b b b b b b b b b b b 
    b b b b b b b b b b b b b b b b 
    b b b b b b b b b b b b b b b b 
    d d d d d d d d d d d d d d d d 
    b b b b b b b b b b b b b b b b 
    c c c c c c c c c c c c c c c c 
    `, false)
scene.setTile(9, img`
    5 7 5 7 7 7 7 7 7 7 7 7 7 7 7 7 
    7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
    7 7 7 7 7 7 7 e 7 7 7 7 7 7 7 7 
    7 7 7 7 7 2 2 e 7 7 7 7 7 7 7 7 
    7 7 7 2 2 2 2 e 7 7 7 7 5 7 7 7 
    7 7 2 2 2 2 2 e 5 5 7 7 7 7 7 7 
    7 7 7 2 2 2 2 e 5 6 7 7 7 7 7 7 
    7 7 7 7 6 2 2 e 6 7 7 7 7 7 7 7 
    7 7 7 7 7 7 7 e 7 7 7 7 7 7 7 7 
    7 7 5 7 7 7 7 e 7 7 7 7 7 7 7 7 
    7 7 7 7 7 7 7 e 7 7 7 5 5 7 7 7 
    7 7 7 7 7 7 7 e 7 7 5 5 6 7 7 7 
    7 7 7 7 7 7 7 e 5 5 7 6 7 7 7 7 
    7 7 7 7 7 7 7 e 7 5 5 7 7 7 7 7 
    7 7 7 7 7 7 7 e 7 7 7 7 7 7 7 5 
    7 7 5 7 7 7 7 e 7 7 7 7 7 7 7 5 
    `, true)
scene.setTile(10, img`
    c c c c c c c c c c c c c c c c 
    b b b b b b b b b b b b b b b b 
    d d d d d d d d d d d d d d d d 
    b b b b b b b b b b b b b b b b 
    b b b b b b b b b b b b b b b b 
    b b b b b b b b b b b b b b b b 
    b b b b b b b b b b b b b b b b 
    b 1 1 1 1 d b b b 1 1 1 1 d b b 
    b d 1 1 1 1 b b b d 1 1 1 1 b b 
    b b b b b b b b b b b b b b b b 
    b b b b b b b b b b b b b b b b 
    b b b b b b b b b b b b b b b b 
    b b b b b b b b b b b b b b b b 
    d d d d d d d d d d d d d d d d 
    b b b b b b b b b b b b b b b b 
    c c c c c c c c c c c c c c c c 
    `, false)
scene.setTile(11, img`
    c c c c c c c c c c c c c c c c 
    b b b b b b b b b b b b b b b b 
    d d d d d d d d d d d d d d d d 
    b b b b b b b b b b b b b b b b 
    b b b b b b b b b b b b b b b b 
    b b b b b b b b b b b b b b b b 
    b b b b b b b b b b b b b b b b 
    b 1 1 1 1 d b b b 1 1 1 1 d b b 
    b d 1 1 1 1 b b b d 1 1 1 1 b b 
    b b b b b b b b b b b b b b b b 
    b b b b b b b b b b b b b b b b 
    b b b b b b b b b b b b b b b b 
    b b b b b b b b b b b b b b b b 
    d d d d d d d d d d d d d d d d 
    b b b b b b b b b b b b b b b b 
    c c c c c c c c c c c c c c c c 
    `, false)
info.setScore(0)
nextLevel()
game.onUpdateInterval(500, function () {
    for (let index = 0; index < 2; index++) {
        if (Math.percentChance(50)) {
            car = sprites.create(carRightImages[randint(0, carRightImages.length - 1)], SpriteKind.Enemy)
            car.vx = 50
            if (Math.percentChance(5)) {
                animation.runImageAnimation(
                car,
                [img`
                    . . . . . 2 2 . 8 8 . . . . . . 
                    . . . . 6 2 2 6 8 8 6 6 . . . . 
                    . . . 6 9 6 6 6 6 6 6 c 6 . . . 
                    . . 6 c 9 6 6 6 6 6 6 c c 6 . . 
                    . 6 c c 9 9 9 9 9 9 6 c c 9 6 d 
                    . 6 c 6 8 8 8 8 8 8 8 b c 9 6 6 
                    . 6 6 8 b b 8 b b b 8 8 b 9 6 6 
                    . 6 8 b b b 8 b b b b 8 6 6 6 6 
                    . 8 8 6 6 6 8 6 6 6 6 6 8 6 6 6 
                    . 8 8 8 8 8 8 f 8 8 8 f 8 6 d d 
                    . 8 8 8 8 8 8 f 8 8 f 8 8 8 6 d 
                    . 8 8 8 8 8 8 f f f 8 8 8 8 8 8 
                    . 8 f f f f 8 8 8 8 f f f 8 8 8 
                    . . f f f f f 8 8 f f f f f 8 . 
                    . . . f f f . . . . f f f f . . 
                    . . . . . . . . . . . . . . . . 
                    `,img`
                    . . . . . 8 8 . 2 2 . . . . . . 
                    . . . . 6 8 8 6 2 2 6 6 . . . . 
                    . . . 6 9 6 6 6 6 6 6 c 6 . . . 
                    . . 6 c 9 6 6 6 6 6 6 c c 6 . . 
                    . 6 c c 9 9 9 9 9 9 6 c c 9 6 d 
                    . 6 c 6 8 8 8 8 8 8 8 b c 9 6 6 
                    . 6 6 8 b b 8 b b b 8 8 b 9 6 6 
                    . 6 8 b b b 8 b b b b 8 6 6 6 6 
                    . 8 8 6 6 6 8 6 6 6 6 6 8 6 6 6 
                    . 8 8 8 8 8 8 f 8 8 8 f 8 6 d d 
                    . 8 8 8 8 8 8 f 8 8 f 8 8 8 6 d 
                    . 8 8 8 8 8 8 f f f 8 8 8 8 8 8 
                    . 8 f f f f 8 8 8 8 f f f 8 8 8 
                    . . f f f f f 8 8 f f f f f 8 . 
                    . . . f f f . . . . f f f f . . 
                    . . . . . . . . . . . . . . . . 
                    `],
                500,
                true
                )
            }
            scene.place(scene.getTilesByType(10)[randint(0, scene.getTilesByType(10).length - 1)], car)
        } else {
            car = sprites.create(carLeftImages[randint(0, carLeftImages.length - 1)], SpriteKind.Enemy)
            car.vx = -50
            if (Math.percentChance(5)) {
                animation.runImageAnimation(
                car,
                [img`
                    . . . . . . . . 2 2 . 8 8 . . . 
                    . . . . . . 6 6 2 2 6 8 8 6 . . 
                    . . . . . 6 c 6 6 6 6 6 6 9 6 . 
                    . . . . 6 c c 6 6 6 6 6 6 9 c 6 
                    . . d 6 9 c c 6 9 9 9 9 9 9 c c 
                    . d 6 6 9 c b 8 8 8 8 8 8 8 6 c 
                    . 6 6 6 9 b 8 8 b b b 8 b b 8 6 
                    . 6 6 6 6 6 8 b b b b 8 b b b 8 
                    . 6 6 6 6 8 6 6 6 6 6 8 6 6 6 8 
                    . 6 d d 6 8 f 8 8 8 f 8 8 8 8 8 
                    . d d 6 8 8 8 f 8 8 f 8 8 8 8 8 
                    . 8 8 8 8 8 8 8 f f f 8 8 8 8 8 
                    . 8 8 8 8 f f f 8 8 8 8 f f f f 
                    . . . 8 f f f f f 8 8 f f f f f 
                    . . . . f f f f . . . . f f f . 
                    . . . . . . . . . . . . . . . . 
                    `,img`
                    . . . . . . . . 8 8 . 2 2 . . . 
                    . . . . . . 6 6 8 8 6 2 2 6 . . 
                    . . . . . 6 c 6 6 6 6 6 6 9 6 . 
                    . . . . 6 c c 6 6 6 6 6 6 9 c 6 
                    . . d 6 9 c c 6 9 9 9 9 9 9 c c 
                    . d 6 6 9 c b 8 8 8 8 8 8 8 6 c 
                    . 6 6 6 9 b 8 8 b b b 8 b b 8 6 
                    . 6 6 6 6 6 8 b b b b 8 b b b 8 
                    . 6 6 6 6 8 6 6 6 6 6 8 6 6 6 8 
                    . 6 d d 6 8 f 8 8 8 f 8 8 8 8 8 
                    . d d 6 8 8 8 f 8 8 f 8 8 8 8 8 
                    . 8 8 8 8 8 8 8 f f f 8 8 8 8 8 
                    . 8 8 8 8 f f f 8 8 8 8 f f f f 
                    . . . 8 f f f f f 8 8 f f f f f 
                    . . . . f f f f . . . . f f f . 
                    . . . . . . . . . . . . . . . . 
                    `],
                500,
                true
                )
            }
            scene.place(scene.getTilesByType(11)[randint(0, scene.getTilesByType(11).length - 1)], car)
        }
        car.setFlag(SpriteFlag.DestroyOnWall, true)
    }
})
game.onUpdateInterval(2000, function () {
    for (let index = 0; index < 2; index++) {
        seaMonster = sprites.create(img`
            . a a a . . . . . . . . . . 3 3 
            . a a a . . . . . . . . . . 3 3 
            a a a a a . . . . . . 3 3 a a a 
            a 3 3 a a a a . . . . 3 3 a a a 
            a 3 3 a a a a . . . . a a a a a 
            . a a a a a a . . . . a a a a . 
            . a a a a a 3 3 . . . a a a a . 
            . . a a a a 3 3 a . . a a a a . 
            . . . a a a a a a . 3 3 a a a . 
            . . . . a a a a a . 3 3 a a a a 
            . . . . a a a a a . . a a a a a 
            . . . . a a 3 3 a . . . a a a a 
            . . . . a a 3 3 . . . a a a a a 
            . . . a a a a a . . 3 3 a a a a 
            . . a 3 3 a a a . . 3 3 a a a a 
            . . a 3 3 a a a . . a a a a a a 
            `, SpriteKind.Enemy)
        scene.placeOnRandomTile(seaMonster, 5)
        seaMonster.lifespan = 2000
        animation.runImageAnimation(
        seaMonster,
        [img`
            . a a a . . . . . . . . . . 3 3 
            . a a a . . . . . . . . . . 3 3 
            a a a a a . . . . . . 3 3 a a a 
            a 3 3 a a a a . . . . 3 3 a a a 
            a 3 3 a a a a . . . . a a a a a 
            . a a a a a a . . . . a a a a . 
            . a a a a a 3 3 . . . a a a a . 
            . . a a a a 3 3 a . . a a a a . 
            . . . a a a a a a . 3 3 a a a . 
            . . . . a a a a a . 3 3 a a a a 
            . . . . a a a a a . . a a a a a 
            . . . . a a 3 3 a . . . a a a a 
            . . . . a a 3 3 . . . a a a a a 
            . . . a a a a a . . 3 3 a a a a 
            . . a 3 3 a a a . . 3 3 a a a a 
            . . a 3 3 a a a . . a a a a a a 
            `,img`
            . . . . . . a a a . . . a a . . 
            . . . . . a a a a . . . a a a . 
            . . . 3 3 a a a a 3 3 a a a a . 
            . . . 3 3 a a a . 3 3 a a a a . 
            . . . a a a a a . a a a a a a . 
            . . a a a a a . . a a a a a a . 
            . . a a a a . . . a a a a a a . 
            3 3 a a a a a . . a a a a a a . 
            3 3 a a a a a . . . 3 3 a a a a 
            a a a a a a a . . . 3 3 a a a a 
            a a a a a a a . . . . a a a a a 
            a a a a 3 3 a . . . . . a a a a 
            a a a a 3 3 . . . . . a a a a a 
            . a a a a a . . . . 3 3 a a a a 
            a 3 3 a a a . . . . 3 3 a a a a 
            a 3 3 a a a . . . . a a a a a a 
            `],
        200,
        true
        )
    }
})
game.onUpdate(function () {
    controller.moveSprite(thePlayer, speed, speed)
})
