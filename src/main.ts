const cellSize = 10
const fieldSide = 64
const seed = 0.4

const canvas = document.getElementById("life") as HTMLCanvasElement
canvas.width = fieldSide * cellSize
canvas.height = fieldSide * cellSize

const ctx = canvas.getContext("2d") as CanvasRenderingContext2D
ctx.fillStyle = "#000000"

const field = new Array(Math.pow(fieldSide, 2))
    .fill(0)
    .map(() => Math.round(Math.random() - seed))

function mainLoop(): void {
    ctx.clearRect(0, 0, fieldSide * cellSize, fieldSide * cellSize)

    field.forEach((cell, index) => {
        const x = Math.floor(index / fieldSide)
        const y = index % fieldSide

        if (cell > 0) {
            ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize)
        }
    })

    evolve()
}

function evolve(): void {
    field.forEach((cell, index) => {
        const dead = cell === 0
        const neighbors = countLivingNeighbors(index)

        if (dead && neighbors === 3) {
            // Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
            field[index] = 1
        } else if (!dead && neighbors < 2) {
            // Any live cell with fewer than two live neighbours dies, as if by underpopulation.
            field[index] = 0
        } else if (!dead && neighbors > 3) {
            // Any live cell with more than three live neighbours dies, as if by overpopulation.
            field[index] = 0
        }
    })
}

//   [i - row - 1] [i - row] [i - row + 1]
//   [i - 1]       [i]       [i + 1]
//   [i + row - 1] [i + row] [i + row + 1]
function countLivingNeighbors(cellIndex: number): number {
    const isLeftBorder = cellIndex === 0 || (cellIndex - 1) % fieldSide === 0
    const isRightBorder = cellIndex % fieldSide === 0

    const indices = [cellIndex - fieldSide, cellIndex + fieldSide]

    if (!isLeftBorder) {
        indices.push(
            cellIndex - fieldSide - 1,
            cellIndex - 1,
            cellIndex + fieldSide - 1,
        )
    }

    if (!isRightBorder) {
        indices.push(
            cellIndex - fieldSide + 1,
            cellIndex + 1,
            cellIndex + fieldSide + 1,
        )
    }

    return indices
        .filter((index) => index >= 0 && index < field.length)
        .reduce((acc, index) => acc + field[index], 0)
}

setInterval(mainLoop, 500)
