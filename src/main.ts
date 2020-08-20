const cellSize = 10
const fieldSide = 64

const canvas = document.getElementById("life") as HTMLCanvasElement
canvas.width = fieldSide * cellSize
canvas.height = fieldSide * cellSize

const ctx = canvas.getContext("2d") as CanvasRenderingContext2D
ctx.fillStyle = "#000000"

const field = new Array(Math.pow(fieldSide, 2)).fill(0)
randomize(field)

function randomize(arry: any[]) {
    arry.forEach((_, index) => {
        arry[index] = Math.round(Math.random())
    })
}

function mainLoop() {
    ctx.clearRect(0, 0, fieldSide * cellSize, fieldSide * cellSize)

    field.forEach((cell, index) => {
        const x = Math.floor(index / fieldSide)
        const y = index % fieldSide

        if (cell > 0) {
            ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize)
        }
    })
}

setInterval(mainLoop, 500)
