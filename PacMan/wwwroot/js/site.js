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
const enemyImg1 = document.getElementById("Enemy1");
const enemyImg2 = document.getElementById("Enemy2");


const width = wall.width;
const height = wall.height;

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
class Food1 {
    constructor({ position, image }) {
        this.position = position,
            this.image = image
    }
    draw() {
        context.drawImage(this.image, this.position.x, this.position.y, this.image.width, this.image.height);
    }
}
class Enemy {
    static speed =2
    constructor({ position, velocity, image }) {
        this.position = position,
            this.velocity = velocity,
            this.image = image
        this.prevCollessions = []
        this.speed = this.speed
        this.scared= false
    }
    draw() {

        context.drawImage(this.image, this.position.x, this.position.y, this.image.width, this.image.height);
      /*  c.fillStyle = this.scared? 'blue ': this*/
    }
    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}


const map = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 2, 0, 1, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1],
    [1, 6, 6, 1, 0, 1, 6, 6, 6, 6, 6, 6, 6, 1, 0, 1, 6, 6, 1],
    [1, 1, 1, 1, 0, 1, 6, 1, 1, 6, 1, 1, 6, 1, 0, 1, 1, 1, 1],

    [6, 6, 6, 6, 0, 6, 6, 1, 6, 6, 6, 1, 6, 6, 0, 6, 6, 6, 6],

    [1, 1, 1, 1, 0, 1, 6, 1, 1, 1, 1, 1, 6, 1, 0, 1, 1, 1, 1],
    [1, 6, 6, 1, 0, 1, 6, 6, 6, 6, 6, 6, 6, 1, 0, 1, 6, 6, 1],
    [1, 1, 1, 1, 0, 1, 6, 1, 1, 1, 1, 1, 6, 1, 0, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1],
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
    [1, 1, 0, 1, 2, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],

]
const boundaries = []
const tracks = []
const foods2 = []
const foods1 = []
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
const enemies = [
    new Enemy({
        position:
        {
            x: Boundary.width*6 + Boundary.width/2,
            y: Boundary.height + Boundary.height/2
        },
        velocity:
        {
            x: Enemy.speed,
            y: 0
        },
        image: enemyImg
    }),
    new Enemy({
        position:
        {
            x: Boundary.width * 6 + Boundary.width / 2,
            y: Boundary.height + Boundary.height / 2
        },
        velocity:
        {
            x: Enemy.speed,
            y: 0
        },
        image: enemyImg2
    })
]

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
                        image: wall
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
            case 2:// food1
                foods1.push(
                    new Food1({
                        position: {
                            x: Boundary.width * j,
                            y: Boundary.height * i
                        },
                        image: food1
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
let animationId
function animate() {
    animationId=requestAnimationFrame(animate)
    context.clearRect(0, 0, canvas.width, canvas.height)
    if (Keys.ArrowUp.pressed && lastKey == 'ArrowUp') {
        for (let i = 0; i < boundaries.length; i++) {
            const bound = boundaries[i]
            boundaries.forEach((boundary) => {
                if (collides({ rect1: { ...player, velocity: {x :0, y:-5} } , rect2: bound })) {
                    player.velocity.y = 0
                }
                else
                    player.velocity.y = -5
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
                else
                    player.velocity.x = -5
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
                else
                    player.velocity.y = 5
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
                else
                    player.velocity.x = 5
            })
        }
    }
    // player collides with enemy
    for (let i = enemies.length - 1; 0 <= i; i--) {
        const enemy = enemies[i]
        if (Math.hypot(enemy.position.x - player.position.x,
            enemy.position.y - player.position.y)
            < enemy.image.width + player.image.width) {
            if (enemy.scared) {
                enemies[i].image = track
                console.log('player eat enemy')
            }
            else {
                cancelAnimationFrame(animationId)
                console.log('you lose ')
               
            }     
    }
    // player collides with big food 
    for (let i = foods1.length - 1; 0 <= i; i--) {
        const food1 = foods1[i]
        food1.draw()
        if (Math.hypot(food1.position.x - player.position.x,
            food1.position.y - player.position.y)
            < food1.image.width + player.image.width) {
            console.log('touching big food')
            foods1[i].image = track
            enemies.forEach(enemy => {
                enemy.scared = true

                setTimeout(() => {
                    enemy.scared = false
                }, 3000)
            })
       
        }
    }
    // player collides with small food 
    for (let i = foods2.length - 1; 0 <= i; i--) {
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

    enemies.forEach((enemy )=> {
        enemy.update()
        const collisions =[]
        boundaries.forEach((boundary) => {

            if (!collisions.includes('right') && collides({ rect1: { ...enemy, velocity: { x: Enemy.speed, y: 0 } }, rect2: boundary })) {
                collisions.push('right')
            }
            if (!collisions.includes('left') && collides({ rect1: { ...enemy, velocity: { x: -Enemy.speed, y: 0 } }, rect2: boundary })) {
                collisions.push('left')
            }
            if (!collisions.includes('up') && collides({ rect1: { ...enemy, velocity: { x: 0, y: -Enemy.speed } }, rect2: boundary })) {
                collisions.push('up')
            }
            if (!collisions.includes('down') && collides({ rect1: { ...enemy, velocity: { x: 0, y: Enemy.speed } }, rect2: boundary })) {
                collisions.push('down')
            }
            if (collisions.length > enemy.prevCollessions.length)
                enemy.prevCollessions = collisions
            if (JSON.stringify(collisions) !== JSON.stringify(enemy.prevCollessions)) {
                if (enemy.velocity.x > 0) enemy.prevCollessions.push('right')
                if (enemy.velocity.x < 0) enemy.prevCollessions.push('left')
                if (enemy.velocity.y < 0) enemy.prevCollessions.push('up')
                if(enemy.velocity.y > 0) enemy.prevCollessions.push('down')
                const pathways = enemy.prevCollessions.filter((collision) => {
                    return !collisions.includes(collision)
                })
                const direction = pathways[Math.floor(Math.random() * pathways.length)]
                switch (direction) {
                    case 'down':
                        enemy.velocity.y = Enemy.speed
                        enemy.velocity.x = 0
                        break
                    case 'up':
                        enemy.velocity.y = -Enemy.speed
                        enemy.velocity.x = 0
                        break
                    case 'right':
                        enemy.velocity.y = 0
                        enemy.velocity.x = Enemy.speed
                        break
                    case 'left':
                        enemy.velocity.y = 0
                        enemy.velocity.x = -Enemy.speed
                        break
                }
                enemy.prevCollessions=[]
            }
        })

    })
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