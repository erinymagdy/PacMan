const canvas = document.getElementById("Canvas");
const context = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

const row = 21;
const col = 20;
const wall = document.getElementById("Wall");
const track = document.getElementById("Track");
const food1 = document.getElementById("Food1");
const food2 = document.getElementById("Food2");
const pcRight = document.getElementById("PcRight");
const scoreEl = document.getElementById("Score");

const width = wall.width;
const height = wall.height;

const boundaries = []
const tracks = []
const foods2 = []
const direction = { left: 0, up: 1, right: 2, down: 3 };
let lastKey = ''
let score = 0
const Keys = {
    ArrowUp: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowDown: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    }
}

class Boundary {
    static width = 40
    static height = 40
    constructor({ position, image }) {
        this.position = position,
        this.image = image,
        this.width = width,
        this.height = height
    }
    draw() {
        context.drawImage(this.image, this.position.x, this.position.y, this.image.width, this.image.height)
    }
}
class Player {
    constructor({ position, velocity, image }) {
        this.position = position,
        this.velocity = velocity,
        this.image = image
    }
    draw() {
        context.drawImage(this.image, this.position.x, this.position.y, this.image.width, this.image.height);
    }
    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}
class Food2 {
    constructor({ position, image }) {
        this.position = position,
        this.image = image
    }
    draw() {
        context.drawImage(this.image, this.position.x, this.position.y, this.image.width, this.image.height);
    }
}


const map = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1],
    [1, 6, 6, 1, 0, 1, 6, 6, 6, 6, 6, 6, 6, 1, 0, 1, 6, 6, 1],
    [1, 1, 1, 1, 0, 1, 6, 1, 1, 6, 1, 1, 6, 1, 0, 1, 1, 1, 1],

    [6, 6, 6, 6, 0, 6, 6, 1, 6, 6, 6, 1, 6, 6, 0, 6, 6, 6, 6],

    [1, 1, 1, 1, 0, 1, 6, 1, 1, 1, 1, 1, 6, 1, 0, 1, 1, 1, 1],
    [1, 6, 6, 1, 0, 1, 6, 6, 6, 6, 6, 6, 6, 1, 0, 1, 6, 6, 1],
    [1, 1, 1, 1, 0, 1, 6, 1, 1, 1, 1, 1, 6, 1, 6, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1],
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
    [1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 6, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],

]

const player = new Player({
    position:
    {
        x: Boundary.width  ,
        y: Boundary.height 
    },
    velocity:
    {
        x: 0,
        y: 0
    },
    image: pcRight
})

map.forEach((row, i) => {
    row.forEach((symbol, j) => {
        switch (symbol) {
            case 1: // wall
                boundaries.push(
                    new Boundary({
                        position: {
                            x: Boundary.width * j,
                            y: Boundary.height * i
                        },
                        image : wall
                    })
                )
                break
            case 6: // track
                boundaries.push(
                    new Boundary({
                        position: {
                            x: Boundary.width * j,
                            y: Boundary.height * i
                        },
                        image: track
                    })
                )
                break
            case 0:// food2
                foods2.push(
                    new Food2({
                        position: {
                            x: Boundary.width * j,
                            y: Boundary.height * i
                        },
                        image: food2
                    })
                )
                break
            }
    })
})
function collides({ rect1, rect2 }) { // rect 1: pacman , rect 2: wall
    return 
    (rect1.position.y - rect1.image.height + rect1.velocity.y <= rect2.position.y + rect2.height
        && rect1.position.x + rect1.image.width + rect1.velocity.x >= rect2.position.x
        && rect1.position.y + rect1.image.height + rect1.velocity.y >= rect2.position.y
        && rect1.position.x - rect1.image.width + rect1.velocity.x <= rect2.position.x + rect2.width)
}
function animate() {
    requestAnimationFrame(animate)
    context.clearRect(0, 0, canvas.width, canvas.height)
    if (Keys.ArrowUp.pressed && lastKey == 'ArrowUp') {
        for (let i = 0; i < boundaries.length; i++) {
            const bound = boundaries[i]
            boundaries.forEach((boundary) => {
                if (collides({ rect1: { ...player, velocity: {x :0, y:-5} } , rect2: bound })) {
                    player.velocity.y = 0
                }
                else player.velocity.y = -5
            })
        }
    }
    else if (Keys.ArrowLeft.pressed && lastKey == 'ArrowLeft') {
        for (let i = 0; i < boundaries.length; i++) {
            const bound = boundaries[i]
            boundaries.forEach((boundary) => {
                if (collides({ rect1: { ...player, velocity: { x: -5, y: 0 } }, rect2: bound })) {
                    player.velocity.x = 0
                }
                else player.velocity.x = -5
            })
        }
    }
    else if (Keys.ArrowDown.pressed && lastKey == 'ArrowDown') {
        for (let i = 0; i < boundaries.length; i++) {
            const bound = boundaries[i]
            boundaries.forEach((boundary) => {
                if (collides({ rect1: { ...player, velocity: { x: 0, y: 5 } }, rect2: bound })) {
                    player.velocity.y = 0
                }
                else player.velocity.y = 5
            })
        }
    }
    else if (Keys.ArrowRight.pressed && lastKey == 'ArrowRight') {
        for (let i = 0; i < boundaries.length; i++) {
            const bound = boundaries[i]
            boundaries.forEach((boundary) => {
                if (collides({ rect1: { ...player, velocity: { x: 5, y: 0 } }, rect2: bound })) {
                    player.velocity.x = 0
                }
                else player.velocity.x = 5
            })
        }
    }
    for (let i = foods2.length - 1; 0 < i; i--) {
        const food2 = foods2[i]
        food2.draw()
            if (Math.hypot(food2.position.x - player.position.x,
                food2.position.y - player.position.y)
                < food2.image.width + player.image.width) {
                console.log('touching')
                foods2[i].image = track
                /*   foods2.splice(i,1)*/
                score += 10
                scoreEl.innerHTML = score
            }
    }
    boundaries.forEach((boundary) => {
        boundary.draw()
        if (collides({ rect1: player, rect2: boundary })) {
            player.velocity.y = 0
            player.velocity.x = 0
        }
    })
    player.update()
}
animate()
addEventListener('keydown', ({ key }) => {
    switch (key) {
        case 'ArrowUp':
            Keys.ArrowUp.pressed = true
            lastKey ='ArrowUp'
            break
        case 'ArrowLeft':
            Keys.ArrowLeft.pressed = true
            lastKey = 'ArrowLeft'
            break
        case 'ArrowDown':
            Keys.ArrowDown.pressed = true
            lastKey = 'ArrowDown'
            break
        case 'ArrowRight':
            Keys.ArrowRight.pressed = true
            lastKey = 'ArrowRight'
            break

    }
})

addEventListener('keyup', ({ key }) => {
    switch (key) {
        case 'ArrowUp':
            Keys.ArrowUp.pressed = false
            break
        case 'ArrowLeft':
            Keys.ArrowLeft.pressed = false
            break
        case 'ArrowDown':
            Keys.ArrowDown.pressed = false
            break
        case 'ArrowRight':
            Keys.ArrowRight.pressed = false
            break

    }
})