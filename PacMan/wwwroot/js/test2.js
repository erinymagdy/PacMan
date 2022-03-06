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

let score = 0

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
class Enemy {
    static speed=2
    constructor({ position, velocity, image }) {
        this.position = position,
            this.velocity = velocity,
            this.image = image,
            this.speed = this.speed,
            this.scared= false

    }
    draw() {
         context.drawImage(this.image, this.position.x, this.position.y, width, height);
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
const enemies = [
    new Enemy({
        position:
        {
            x: Boundary.width *17,
            y: Boundary.height *19
        },
        velocity:
        {
            x: Enemy.speed,
            y: 0
        },
        image: enemyImg1
    }),
    new Enemy({
        position:
        {
            x: Boundary.width*5 ,
            y: Boundary.height *9
        },
        velocity:
        {
            x: Enemy.speed,
            y: 0
        },
        image: enemyImg2
    })
]
const map = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 2, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1],
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
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 2, 0, 0, 0, 1],
    [1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1],
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
    [1, 1, 0, 1, 2, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],

]
const editMap =[]

const point = width 
const pointX = player.position.x/point
const pointY= player.position.y /point

function init() {
    player.position.x = point
    player.position.y = point
    player.velocity.x = 0
    player.velocity.y = 0
    score = 0
    scoreEl.innerHTML = score
    editMap.push(...map)
    draw()
}
function draw()
{
    editMap.forEach((row , i) => {
        row.forEach((symbol , j) => {
            switch (symbol) {
                case 1: // wall
                context.drawImage(wall,Boundary.width * j, Boundary.height * i, width, height);
                    break
                case 6: // track
                context.drawImage(track,Boundary.width * j, Boundary.height * i, width, height);
                    break
                case 0:// food2
                context.drawImage(food2,Boundary.width * j, Boundary.height * i, width, height);
                    break
                case 2:// food1
                context.drawImage(food1,Boundary.width * j, Boundary.height * i, width, height);
                    break 
            }
        })
    })
    player.draw()
    enemies.forEach(enemy=>{
        enemy.draw()
    })
      
    player.velocity.y = 0
    player.velocity.x = 0
    
}
function playerCollidesEnemy(){
    for (let i = enemies.length - 1; 0 <= i; i--) {
        const enemy = enemies[i]
        if (Math.hypot(enemy.position.x - player.position.x,
            enemy.position.y - player.position.y)<(width/2 + width/2)){
            if (enemy.scared) {
                enemies[i].image = track
                enemy.draw()
                console.log('player eat enemy')
            }
            else {
                cancelAnimationFrame(animationId)
                console.log('you lose ')
               
            }   
        }
    }

}  
function move() {
    requestAnimationFrame(move)
    context.clearRect(0, 0, canvas.width, canvas.height)
    draw()
    const directions = ['down', 'up', 'right', 'left']
    const direction = directions[Math.floor(Math.random() * directions.length)]
    enemies.forEach(enemy => { 
        console.log((enemy.position.y / point),(enemy.position.x / point))
        switch (direction) {
            case 'down':
                console.log(direction)
                console.log(enemy.position.y / point + 1,(enemy.position.x / point))
                if ((editMap[(enemy.position.y / point) + 1][enemy.position.x / point]) !== 1) {
                    console.log(direction)
                    enemy.velocity.y = Enemy.speed
                    enemy.velocity.x = 0
                    enemy.position.y += point
                   /* enemy.draw()*/
                }
                break
            case 'up':
                console.log(direction)
                console.log((enemy.position.y / point) - 1,enemy.position.x / point)
                if ((editMap[(enemy.position.y / point) - 1][enemy.position.x / point]) !== 1) {
                    console.log(direction)
                    enemy.velocity.y = -Enemy.speed
                    enemy.velocity.x = 0
                    enemy.position.y += point
                   /* enemy.draw()*/
                }
                break
            case 'right':
                console.log(direction)
                console.log(editMap[(enemy.position.y / point)][(enemy.position.x / point) + 1])
                if ((editMap[(enemy.position.y / point) ][(enemy.position.x / point) +1]) !== 1) {
                    console.log(direction)
                    enemy.velocity.y = 0
                    enemy.velocity.x = Enemy.speed
                    enemy.position.x +=  point
                    /*enemy.draw()*/
                }
                break
            case 'left':
                console.log(direction)
                console.log(editMap[(enemy.position.y / point) + 1][(enemy.position.x / point) - 1])
                if ((editMap[(enemy.position.y / point)][(enemy.position.x / point)-1]) !== 1) {
                    console.log(direction)
                    enemy.velocity.y = 0
                    enemy.velocity.x = -Enemy.speed
                    enemy.position.x -= point
                    /*enemy.draw()*/
                }
                break
        }
    })
}
init()
move()
addEventListener('keydown', ({ key}) => {
    switch (key) {
        case 'ArrowUp':
            console.log(editMap[(player.position.y / point) - 1][(player.position.x / point)])
            if ((editMap[(player.position.y / point ) - 1][(player.position.x / point )]) !== 1) {
                if ((editMap[(player.position.y / point) - 1][(player.position.x / point)]) === 0) {
                    score += 10
                    scoreEl.innerHTML = score
                    editMap[(player.position.y / point) - 1][(player.position.x / point)] = 6
                    draw()   
                }
                if ((editMap[(player.position.y / point) - 1][(player.position.x / point)]) === 2) {
                    console.log('big food')
                    editMap[(player.position.y / point) - 1][(player.position.x / point)] = 6
                    draw()   
                    enemies.forEach(enemy => {
                        enemy.scared = true
                        setTimeout(() => {
                            enemy.scared = false
                        }, 3000)
                    })
                }
                enemies.forEach(enemy => {
                    if (((player.position.y / point) - 1 === enemy.position.y / point)
                        && ((player.position.x / point) === enemy.position.x / point)) {
                        if (enemy.scared === true) {
                            enemy.image = track
                            enemy.draw()
                        }
                        else {
                            console.log('you are lose')
                        }

                    }
                })
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
            console.log(editMap[(player.position.y / point)][(player.position.x / point) - 1])
            if ((editMap[(player.position.y / point )][(player.position.x / point ) - 1]) !== 1) {
                if ((editMap[(player.position.y / point )][(player.position.x / point ) - 1]) === 0) {
                    score += 1
                    scoreEl.innerHTML = score
                    editMap[(player.position.y / point)][(player.position.x / point) - 1] = 6
                    draw()

                }
                if ((editMap[(player.position.y / point)][(player.position.x / point) - 1]) === 2) {
                    console.log('big food')
                    editMap[(player.position.y / point)][(player.position.x / point) - 1] = 6
                    enemies.forEach(enemy => {
                        enemy.scared = true
                        setTimeout(() => {
                            enemy.scared = false
                        }, 3000)
                    })
                    draw()
                }
                enemies.forEach(enemy => {
                    if (((player.position.y / point) - 1 === enemy.position.y / point)
                        && ((player.position.x / point) === enemy.position.x / point)) {
                        if (enemy.scared === true) {
                            enemy.image = track
                            enemy.draw()
                        }
                        else {
                            console.log('you are lose')
                        }

                    }
                })
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
            console.log(editMap[(player.position.y / point) + 1][(player.position.x / point)])
            if ((editMap[(player.position.y / point ) + 1][(player.position.x / point )]) !== 1) {
                if ((editMap[(player.position.y / point ) + 1][(player.position.x / point )]) === 0) {
                    score += 10
                    scoreEl.innerHTML = score
                    console.log('big food')
                    editMap[(player.position.y / point ) + 1][(player.position.x / point )] = 6
                    draw()
                }
                if ((editMap[(player.position.y / point) + 1][(player.position.x / point)]) === 2) {
                    console.log('big food')
                    editMap[(player.position.y / point) + 1][(player.position.x / point)] = 6
                    enemies.forEach(enemy => {
                        enemy.scared = true
                        setTimeout(() => {
                            enemy.scared = false
                        }, 3000)
                    })
                    draw()
                }
                enemies.forEach(enemy => {
                    if (((player.position.y / point) - 1 === enemy.position.y / point)
                        && ((player.position.x / point) === enemy.position.x / point)) {
                        if (enemy.scared === true) {
                            enemy.image = track
                            enemy.draw()
                        }
                        else {
                            console.log('you are lose')
                        }

                    }
                })
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
            console.log(((editMap[(player.position.y / point)][(player.position.x / point) + 1])))
            if ((editMap[(player.position.y / point)][(player.position.x / point) + 1]) !== 1) {
                if ((editMap[(player.position.y/point )][(player.position.x/point ) + 1]) === 0) {
                    score += 10
                    scoreEl.innerHTML = score
                    editMap[(player.position.y / point)][(player.position.x / point) + 1] = 6
                    draw()
                }
                if ((editMap[(player.position.y / point)][(player.position.x / point) + 1])=== 2) {
                    editMap[(player.position.y / point)][(player.position.x / point) + 1] = 6
                    enemies.forEach(enemy => {
                        enemy.scared = true
                        setTimeout(() => {
                            enemy.scared = false
                        }, 3000)
                    })
                    draw()
                }
                enemies.forEach(enemy => {
                    if (((player.position.y / point) - 1 === enemy.position.y / point)
                        && ((player.position.x / point) === enemy.position.x / point)) {
                        if (enemy.scared === true) {
                            enemy.image = track
                            enemy.draw()
                        }
                        else {
                            console.log('you are lose')
                        }

                    }
                })
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
