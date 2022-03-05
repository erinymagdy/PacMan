const canvas = document.getElementById("Canvas");
const context = canvas.getContext('2d');

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

const width = wall.width = 40;
const height = wall.height = 40;

canvas.width = col * width;
canvas.height = row * height;

let lastKey = ''
let score = 0

class Square {
    static width = 40
    static height = 40
    constructor({ position, image , type }) {
        this.position = position,
            this.image = image
            this.type = type
    }
    draw() {
        context.drawImage(this.image, this.position.x, this.position.y, width, height)
    }
}
class Boundary {
    static width = 40
    static height = 40
    constructor({ position, image }) {
        this.position = position,
            this.image = image
    }
    draw() {
        context.drawImage(this.image, this.position.x, this.position.y, width,height)
    }
}
class Player {
    constructor({ position, velocity, image }) {
        this.position = position,
            this.velocity = velocity,
            this.image = image

    }
    draw() {
         context.drawImage(this.image, this.position.x, this.position.y, width, height);
    }

}
class Food2 {
    static width = 40
    static height = 40
    constructor({ position, image }) {
        this.position = position,
            this.image = image
    }
    draw() {
        context.drawImage(this.image, this.position.x, this.position.y, width, height);
    }
}
class Food1 {
    static width = 40
    static height = 40
    constructor({ position, image }) {
        this.position = position,
        this.image = image
    }
    draw() {
        context.drawImage(this.image, this.position.x, this.position.y, width, height);
    }
}

const point = Boundary.width 
const squares = []
const boundaries = []
const tracks = []
const foods2 = []
const foods1 = []
const player = new Player({
    position:
    {
        x: Boundary.width ,
        y: Boundary.height 
    },
    velocity:
    {
        x: 0,
        y: 0
    },
    image: pcRight
})
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
                squares.push(
                    new Square({
                        position: {
                            x: Boundary.width * j,
                            y: Boundary.height * i
                        },
                        image: wall,
                        type : 1
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
                squares.push(
                    new Square({
                        position: {
                            x: Boundary.width * j,
                            y: Boundary.height * i
                        },
                        image: wall,
                        type: 6
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
                squares.push(
                    new Square({
                        position: {
                            x: Boundary.width * j,
                            y: Boundary.height * i
                        },
                        image: wall,
                        type: 0
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
                squares.push(
                    new Square({
                        position: {
                            x: Boundary.width * j,
                            y: Boundary.height * i
                        },
                        image: wall,
                        type: 2
                    })
                )
                break 
        }
    })
})


function init() {
    player.position.x = point
    player.position.y = point
    player.velocity.x = 0
    player.velocity.y = 0
    score = 0
    draw()
}
function draw() {
    boundaries.forEach((boudary) => {
        boudary.draw()
    })
    tracks.forEach((trak) => {
        trak.draw()
    })
    foods2.forEach((food2) => {
        food2.draw()
    })
    foods1.forEach((food1) => {
        food1.draw()
    })
    player.draw()
    player.velocity.y = 0
    player.velocity.x = 0
}
function redraw({ type }) {
    if (type = 'smallFood') {
        for (let i = foods2.length - 1; 0 <= i; i--) {
            const food2 = foods2[i]
            if (food2.position.x === (player.position.x) && food2.position.y === player.position.y) {
                food2.draw()
                foods2[i].image = track
                console.log('touch small food')

            }
        }
    }
    else if (type = 'bigFood') {
            for (let i = foods1.length - 1; 0 <= i; i--) {
                const food1 = foods1[i]
                if (food1.position.x === (player.position.x) && food1.position.y === player.position.y) {
                    food1.draw()
                    foods1[i].image = track
                    console.log('touch big food')
                }
            }
        //enemies.forEach(enemy => {
        //    enemy.scared = true

        //    setTimeout(() => {
        //        enemy.scared = false
        //    }, 3000)
        //})

    }


}
function move() {
    requestAnimationFrame(move)
    context.clearRect(0, 0, canvas.width, canvas.height)
    draw()
}
init()
addEventListener('keydown', ({ key}) => {
    switch (key) {
        case 'ArrowUp':
            console.log(map[(player.position.y / point) - 1][(player.position.x / point)])
            if ((map[(player.position.y / point ) - 1][(player.position.x / point )]) !== 1) {
                if ((map[(player.position.y / point) - 1][(player.position.x / point)]) === 0) {
                    score += 10
                    scoreEl.innerHTML = score
                    redraw({ type: 'smallFood' })
                }
                if ((map[(player.position.y / point) - 1][(player.position.x / point)]) === 2) {
                    redraw({ type: 'bigFood' })
                }
                player.velocity.y = -5
                player.position.y -= point
                move()
      
            }
            else {
                player.velocity.y = 0
                player.velocity.x = 0

            }
            break
        case 'ArrowLeft':
            console.log(map[(player.position.y / point)][(player.position.x / point) - 1])
            if ((map[(player.position.y / point )][(player.position.x / point ) - 1]) !== 1) {
                if ((map[(player.position.y / point )][(player.position.x / point ) - 1]) === 0) {
                    score += 1
                    scoreEl.innerHTML = score
                    redraw({ type: 'smallFood' })

                }
                if ((map[(player.position.y / point)][(player.position.x / point) - 1]) === 2) {

                    redraw({ type: 'bigFood' })
                }
                player.velocity.x = -5
                player.position.x -= point
                move()


            }
            else {
                player.velocity.y = 0
                player.velocity.x = 0

            }
            break
        case 'ArrowDown':
            console.log(map[(player.position.y / point) + 1][(player.position.x / point)])
            if ((map[(player.position.y / point ) + 1][(player.position.x / point )]) !== 1) {
                if ((map[(player.position.y / point ) + 1][(player.position.x / point )]) === 0) {
                    score += 10
                    scoreEl.innerHTML = score
                    redraw({ type: 'smallFood' })
                }
                if ((map[(player.position.y / point) + 1][(player.position.x / point)]) === 2) {

                    redraw({ type: 'bigFood' })
                }
                player.velocity.y = 5
                player.position.y += point
                move()

            }
            else {
                player.velocity.y = 0
                player.velocity.x = 0

            }
            break
        case 'ArrowRight':
            console.log(((map[(player.position.y / point)][(player.position.x / point) + 1])))
            if ((map[(player.position.y / point)][(player.position.x / point) + 1]) !== 1) {
                if ((map[(player.position.y/point )][(player.position.x/point ) + 1]) === 0) {
                    score += 10
                    scoreEl.innerHTML = score
                    redraw({type:'smallFood'})
                }
                if ((map[(player.position.y / point)][(player.position.x / point) + 1]) === 2) {

                    redraw({ type: 'bigFood' })
                }
                player.velocity.x = 5
                player.position.x += point
                move()
          
            }
            else {
                player.velocity.y = 0
                player.velocity.x = 0

            }
            break
    }
})
addEventListener('keyup', ({ key }) => {
    switch (key) {
        case 'ArrowUp':
                player.velocity.y = 0
       
            break
        case 'ArrowLeft':
                player.velocity.x = 0
     
            break
        case 'ArrowDown':
                player.velocity.y = 0
 
            break
        case 'ArrowRight':
                player.velocity.x = 0
            break
    }
})
