import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Pause, Play, RotateCcw } from 'lucide-react'
import { cn } from '../utils/cn'

const GRID = 20
const SIZE = 480
const CELL = SIZE / GRID
const BEST_KEY = 'mominur-snake-best-v1'

const freshSnake = () => [
  { x: 9, y: 10 },
  { x: 8, y: 10 },
  { x: 7, y: 10 },
]

function randomFood(snake) {
  const free = []
  for (let y = 0; y < GRID; y += 1) {
    for (let x = 0; x < GRID; x += 1) {
      if (!snake.some((segment) => segment.x === x && segment.y === y)) free.push({ x, y })
    }
  }
  return free[Math.floor(Math.random() * free.length)] ?? { x: 0, y: 0 }
}

function readBest() {
  try {
    return Number(window.localStorage.getItem(BEST_KEY)) || 0
  } catch {
    return 0
  }
}

export default function Snake() {
  const [status, setStatusState] = useState('idle')
  const [score, setScore] = useState(0)
  const [best, setBest] = useState(readBest)
  const reduce = useReducedMotion()

  const statusRef = useRef('idle')
  const gameRef = useRef({
    snake: freshSnake(),
    dir: { x: 1, y: 0 },
    nextDir: { x: 1, y: 0 },
    food: { x: 14, y: 10 },
    score: 0,
  })
  const speedRef = useRef(150)
  const canvasRef = useRef(null)
  const wrapperRef = useRef(null)
  const touchRef = useRef(null)

  const setStatus = (next) => {
    statusRef.current = next
    setStatusState(next)
  }

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const game = gameRef.current

    ctx.fillStyle = '#111111'
    ctx.fillRect(0, 0, SIZE, SIZE)

    ctx.strokeStyle = 'rgba(234,234,234,0.055)'
    ctx.lineWidth = 1
    for (let i = 1; i < GRID; i += 1) {
      const point = Math.round(i * CELL) + 0.5
      ctx.beginPath()
      ctx.moveTo(point, 0)
      ctx.lineTo(point, SIZE)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(0, point)
      ctx.lineTo(SIZE, point)
      ctx.stroke()
    }

    const fx = game.food.x * CELL
    const fy = game.food.y * CELL
    ctx.fillStyle = '#E5393F'
    ctx.fillRect(fx + 4, fy + 4, CELL - 8, CELL - 8)
    ctx.fillStyle = '#111111'
    ctx.fillRect(fx + CELL / 2 - 5, fy + CELL / 2 - 1, 10, 2)
    ctx.fillRect(fx + CELL / 2 - 1, fy + CELL / 2 - 5, 2, 10)

    game.snake.forEach((segment, index) => {
      const x = segment.x * CELL
      const y = segment.y * CELL
      if (index === 0) {
        ctx.fillStyle = '#E5393F'
        ctx.fillRect(x + 2, y + 2, CELL - 4, CELL - 4)
        ctx.fillStyle = '#EAEAEA'
        ctx.fillRect(x + 6, y + 6, 3, 3)
        ctx.fillRect(x + CELL - 9, y + 6, 3, 3)
      } else {
        const fade = 0.9 - (index / game.snake.length) * 0.55
        ctx.fillStyle = `rgba(234,234,234,${fade.toFixed(3)})`
        ctx.fillRect(x + 2, y + 2, CELL - 4, CELL - 4)
      }
    })
  }, [])

  // Game loop — one rAF, stepped on an accumulator so speed can increase cleanly.
  useEffect(() => {
    let raf = 0
    let last = 0
    let acc = 0

    const tick = () => {
      const game = gameRef.current
      game.dir = game.nextDir
      const head = {
        x: game.snake[0].x + game.dir.x,
        y: game.snake[0].y + game.dir.y,
      }

      const hitsWall = head.x < 0 || head.y < 0 || head.x >= GRID || head.y >= GRID
      const hitsSelf = game.snake
        .slice(0, -1)
        .some((segment) => segment.x === head.x && segment.y === head.y)

      if (hitsWall || hitsSelf) {
        setStatus('over')
        setBest((previous) => {
          const next = Math.max(previous, game.score)
          try {
            window.localStorage.setItem(BEST_KEY, String(next))
          } catch {
            /* storage may be unavailable — score still works for this session */
          }
          return next
        })
        draw()
        return
      }

      game.snake = [head, ...game.snake]

      if (head.x === game.food.x && head.y === game.food.y) {
        game.score += 1
        setScore(game.score)
        speedRef.current = Math.max(72, 150 - Math.floor(game.score / 3) * 9)
        game.food = randomFood(game.snake)
      } else {
        game.snake.pop()
      }

      draw()
    }

    const frame = (time) => {
      raf = window.requestAnimationFrame(frame)
      if (statusRef.current !== 'playing') {
        last = time
        return
      }
      if (!last) last = time
      acc += Math.min(time - last, 120)
      last = time
      if (acc >= speedRef.current) {
        acc = 0
        tick()
      }
    }

    raf = window.requestAnimationFrame(frame)
    return () => window.cancelAnimationFrame(raf)
  }, [draw])

  useEffect(() => {
    draw()
    const onVisibility = () => {
      if (document.hidden && statusRef.current === 'playing') setStatus('paused')
    }
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [draw])

  const startGame = () => {
    const game = gameRef.current
    game.snake = freshSnake()
    game.dir = { x: 1, y: 0 }
    game.nextDir = { x: 1, y: 0 }
    game.food = randomFood(game.snake)
    game.score = 0
    speedRef.current = 150
    setScore(0)
    setStatus('playing')
    draw()
    window.requestAnimationFrame(() => wrapperRef.current?.focus({ preventScroll: true }))
  }

  const togglePause = () => {
    if (statusRef.current === 'playing') {
      setStatus('paused')
    } else if (statusRef.current === 'paused') {
      setStatus('playing')
    } else {
      startGame()
    }
  }

  const turn = (x, y) => {
    if (statusRef.current !== 'playing') return
    const game = gameRef.current
    if (game.dir.x === -x && game.dir.y === -y) return
    if (game.nextDir.x === x && game.nextDir.y === y) return
    game.nextDir = { x, y }
  }

  const handleDirection = (x, y) => {
    if (statusRef.current === 'idle' || statusRef.current === 'over') {
      startGame()
    }
    turn(x, y)
  }

  const onKeyDown = (event) => {
    const key = event.key.toLowerCase()
    const directions = {
      arrowup: [0, -1],
      w: [0, -1],
      arrowdown: [0, 1],
      s: [0, 1],
      arrowleft: [-1, 0],
      a: [-1, 0],
      arrowright: [1, 0],
      d: [1, 0],
    }

    if (directions[key]) {
      event.preventDefault()
      handleDirection(...directions[key])
      return
    }
    if (key === ' ') {
      event.preventDefault()
      if (statusRef.current === 'playing' || statusRef.current === 'paused') togglePause()
      else startGame()
      return
    }
    if (key === 'p') {
      event.preventDefault()
      togglePause()
      return
    }
    if (key === 'r') {
      event.preventDefault()
      startGame()
    }
  }

  const onTouchStart = (event) => {
    const touch = event.changedTouches[0]
    touchRef.current = { x: touch.clientX, y: touch.clientY }
  }

  const onTouchEnd = (event) => {
    if (!touchRef.current) return
    const touch = event.changedTouches[0]
    const dx = touch.clientX - touchRef.current.x
    const dy = touch.clientY - touchRef.current.y
    touchRef.current = null
    if (Math.abs(dx) < 18 && Math.abs(dy) < 18) return
    if (Math.abs(dx) > Math.abs(dy)) handleDirection(dx > 0 ? 1 : -1, 0)
    else handleDirection(0, dy > 0 ? 1 : -1)
  }

  return (
    <div className="flex h-full flex-col border border-paper/20 bg-[#161616] text-paper">
      <div className="flex items-center justify-between gap-3 border-b border-paper/20 px-4 py-3">
        <div className="flex items-baseline gap-2.5">
          <span className="font-mono text-[10px] text-red-bright">02</span>
          <h3 className="font-display text-[16px] font-bold uppercase tracking-[0.02em]">Snake</h3>
        </div>
        <span className="flex items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-[0.14em] text-paper/55">
          <span className="h-[5px] w-[5px] bg-red" /> 1 player
        </span>
      </div>

      <div className="flex flex-1 flex-col px-4 pb-4 pt-4 sm:px-5">
        <div className="flex items-center justify-between border border-paper/20 px-3 py-2">
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-[8.5px] uppercase tracking-[0.14em] text-paper/55">Score</span>
            <span className="font-display text-xl font-bold leading-none tabular-nums">{score}</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-[8.5px] uppercase tracking-[0.14em] text-paper/55">Best</span>
            <span className="font-display text-xl font-bold leading-none tabular-nums text-red">{best}</span>
          </div>
          <div className="hidden items-baseline gap-2 xs:flex">
            <span className="font-mono text-[8.5px] uppercase tracking-[0.14em] text-paper/55">Grid</span>
            <span className="font-mono text-[10px] uppercase text-paper/60">20×20</span>
          </div>
        </div>

        <div
          ref={wrapperRef}
          role="application"
          tabIndex={0}
          onKeyDown={onKeyDown}
          aria-label="Snake game. Use arrow keys or WASD to steer, space to pause, R to restart."
          className="game-focus relative mx-auto mt-3 w-full max-w-[330px] touch-none"
        >
          <canvas
            ref={canvasRef}
            width={SIZE}
            height={SIZE}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            aria-hidden="true"
            className="block h-auto w-full border border-paper/20"
          />

          <AnimatePresence>
            {status !== 'playing' && (
              <motion.div
                key={status}
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-ink/85 px-5 text-center backdrop-blur-[2px]"
              >
                <p className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-red-bright">
                  {status === 'idle' ? 'Ready' : status === 'paused' ? 'Paused' : 'Game over'}
                </p>
                <p className="display text-[clamp(1.6rem,3.2vw,2.2rem)] text-paper">
                  {status === 'idle' ? 'INSERT COIN' : status === 'paused' ? 'TAKE FIVE' : 'WALL 1 — YOU 0'}
                </p>
                {status === 'over' && (
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-paper/60">
                    Score {score} {score >= best && score > 0 ? '· new best' : `· best ${best}`}
                  </p>
                )}
                {status === 'idle' && (
                  <p className="max-w-[24ch] text-[12px] leading-relaxed text-paper/55">
                    Eat the red squares. Avoid the walls and your own tail.
                  </p>
                )}
                <button
                  type="button"
                  onClick={status === 'paused' ? togglePause : startGame}
                  className="mt-1 inline-flex items-center gap-2 border border-paper bg-paper px-4 py-2 font-mono text-[9.5px] uppercase tracking-[0.16em] text-ink transition-colors hover:bg-red hover:border-red hover:text-paper"
                >
                  {status === 'idle' ? 'Start' : status === 'paused' ? 'Resume' : 'Play again'}
                  {status === 'paused' ? <Play size={10} fill="currentColor" /> : <ArrowRight size={10} />}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={togglePause}
              className="inline-flex h-8 w-8 items-center justify-center border border-paper/25 text-paper/60 transition-colors hover:border-paper hover:text-paper"
              aria-label={status === 'paused' ? 'Resume game' : 'Pause game'}
            >
              {status === 'paused' ? <Play size={11} fill="currentColor" /> : <Pause size={11} />}
            </button>
            <button
              type="button"
              onClick={startGame}
              className="inline-flex h-8 w-8 items-center justify-center border border-paper/25 text-paper/60 transition-colors hover:border-paper hover:text-paper"
              aria-label="Restart game"
            >
              <RotateCcw size={11} strokeWidth={1.8} />
            </button>
            <span className="ml-1 font-mono text-[9.5px] uppercase leading-relaxed tracking-[0.1em] text-paper/55">
              Arrows / WASD
              <br />
              Space pauses
            </span>
          </div>

          <div
            className="game-pad grid shrink-0 grid-cols-3 gap-1"
            role="group"
            aria-label="Touch controls"
          >
            <span />
            <button
              type="button"
              onClick={() => handleDirection(0, -1)}
              className="flex h-8 w-8 items-center justify-center border border-paper/25 text-paper/60 transition-colors hover:border-paper hover:bg-paper hover:text-ink"
              aria-label="Move up"
            >
              <ArrowUp size={12} />
            </button>
            <span />
            <button
              type="button"
              onClick={() => handleDirection(-1, 0)}
              className="flex h-8 w-8 items-center justify-center border border-paper/25 text-paper/60 transition-colors hover:border-paper hover:bg-paper hover:text-ink"
              aria-label="Move left"
            >
              <ArrowLeft size={12} />
            </button>
            <button
              type="button"
              onClick={() => handleDirection(0, 1)}
              className="flex h-8 w-8 items-center justify-center border border-paper/25 text-paper/60 transition-colors hover:border-paper hover:bg-paper hover:text-ink"
              aria-label="Move down"
            >
              <ArrowDown size={12} />
            </button>
            <button
              type="button"
              onClick={() => handleDirection(1, 0)}
              className="flex h-8 w-8 items-center justify-center border border-paper/25 text-paper/60 transition-colors hover:border-paper hover:bg-paper hover:text-ink"
              aria-label="Move right"
            >
              <ArrowRight size={12} />
            </button>
          </div>
        </div>

        <p className="sr-only" aria-live="polite">
          {status === 'over' ? `Game over. Your score is ${score}.` : `Game ${status}. Score ${score}.`}
        </p>
      </div>
    </div>
  )
}
