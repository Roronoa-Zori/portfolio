import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { RotateCcw, Trophy } from 'lucide-react'
import { cn } from '../utils/cn'

const LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

const HUMAN = 'X'
const COMPUTER = 'O'

function evaluate(board) {
  for (const line of LINES) {
    const [a, b, c] = line
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line }
    }
  }
  if (board.every(Boolean)) return { winner: null, line: null, draw: true }
  return null
}

function freeCells(board) {
  const cells = []
  board.forEach((cell, index) => {
    if (!cell) cells.push(index)
  })
  return cells
}

/**
 * Classic minimax with depth-aware scores: a win in fewer moves scores higher,
 * a loss in fewer moves scores lower. Perfect play, so the computer can only be
 * beaten by a mistake — which is the point of the exercise.
 */
function minimax(board, player, depth) {
  const outcome = evaluate(board)
  if (outcome?.winner) return outcome.winner === COMPUTER ? 10 - depth : depth - 10
  if (outcome?.draw) return 0

  const scores = freeCells(board).map((index) => {
    const next = [...board]
    next[index] = player
    return minimax(next, player === COMPUTER ? HUMAN : COMPUTER, depth + 1)
  })

  return player === COMPUTER ? Math.max(...scores) : Math.min(...scores)
}

/** Pick a winning move, breaking ties at random so repeated games differ. */
function bestMove(board) {
  const scored = freeCells(board).map((index) => {
    const next = [...board]
    next[index] = COMPUTER
    return { index, score: minimax(next, HUMAN, 0) }
  })
  if (!scored.length) return null
  const top = Math.max(...scored.map((move) => move.score))
  const pool = scored.filter((move) => move.score === top)
  return pool[Math.floor(Math.random() * pool.length)].index
}

const centering = [16.666, 50, 83.333]

const emptyBoard = () => Array(9).fill(null)

export default function TicTacToe() {
  const [board, setBoard] = useState(emptyBoard)
  const [turn, setTurn] = useState(HUMAN)
  const [mode, setMode] = useState('solo')
  const [scores, setScores] = useState({ X: 0, O: 0, D: 0 })
  const [round, setRound] = useState(1)
  const reduce = useReducedMotion()
  const boardRef = useRef(board)
  boardRef.current = board

  const result = useMemo(() => evaluate(board), [board])
  const finished = Boolean(result)
  const winningCells = result?.line ?? []
  const solo = mode === 'solo'
  const thinking = solo && !finished && turn === COMPUTER

  const registerOutcome = (outcome) => {
    const key = outcome.winner ?? 'D'
    setScores((prev) => ({ ...prev, [key]: prev[key] + 1 }))
  }

  const play = (index) => {
    if (board[index] || finished) return
    if (solo && turn !== HUMAN) return
    const next = [...board]
    next[index] = turn
    setBoard(next)
    const outcome = evaluate(next)
    if (outcome) {
      registerOutcome(outcome)
    } else {
      setTurn(turn === HUMAN ? COMPUTER : HUMAN)
    }
  }

  // Computer turn: wait a beat so the move reads as a response, not a glitch.
  useEffect(() => {
    if (!solo || turn !== COMPUTER) return undefined
    if (evaluate(board)) return undefined

    const timer = window.setTimeout(() => {
      const current = boardRef.current
      if (evaluate(current)) return
      const index = bestMove(current)
      if (index == null) return
      const next = [...current]
      next[index] = COMPUTER
      setBoard(next)
      const outcome = evaluate(next)
      if (outcome) registerOutcome(outcome)
      else setTurn(HUMAN)
    }, 520)

    return () => window.clearTimeout(timer)
  }, [solo, turn, board])

  const newRound = () => {
    setBoard(emptyBoard())
    setTurn(HUMAN)
    setRound((prev) => prev + 1)
  }

  const resetScore = () => {
    setScores({ X: 0, O: 0, D: 0 })
    setRound(1)
    setBoard(emptyBoard())
    setTurn(HUMAN)
  }

  const changeMode = (nextMode) => {
    if (nextMode === mode) return
    setMode(nextMode)
    setScores({ X: 0, O: 0, D: 0 })
    setRound(1)
    setBoard(emptyBoard())
    setTurn(HUMAN)
  }

  const statusText = result
    ? result.winner
      ? solo
        ? result.winner === HUMAN
          ? 'You win — well played'
          : 'Computer wins'
        : `Player ${result.winner} wins`
      : 'Draw — no winner'
    : solo
      ? turn === HUMAN
        ? 'Your turn — you are X'
        : 'Computer is thinking'
      : `Player ${turn}'s turn`

  const labels = solo
    ? [
        { key: 'X', label: 'You' },
        { key: 'D', label: 'Draws' },
        { key: 'O', label: 'Computer' },
      ]
    : [
        { key: 'X', label: 'Player X' },
        { key: 'D', label: 'Draws' },
        { key: 'O', label: 'Player O' },
      ]

  const lineCoords = result?.line
    ? {
        x1: centering[result.line[0] % 3],
        y1: centering[Math.floor(result.line[0] / 3)],
        x2: centering[result.line[2] % 3],
        y2: centering[Math.floor(result.line[2] / 3)],
      }
    : null

  return (
    <div className="flex h-full flex-col border border-paper/20 bg-[#161616] text-paper">
      <div className="flex items-center justify-between gap-3 border-b border-paper/20 px-4 py-3">
        <div className="flex items-baseline gap-2.5">
          <span className="font-mono text-[10px] text-red-bright">01</span>
          <h3 className="font-display text-[16px] font-bold uppercase tracking-[0.02em]">
            Tic-Tac-Toe
          </h3>
        </div>
        <div
          role="group"
          aria-label="Opponent"
          className="flex border border-paper/25 font-mono text-[9.5px] uppercase tracking-[0.1em]"
        >
          <button
            type="button"
            aria-pressed={solo}
            onClick={() => changeMode('solo')}
            className={cn(
              'px-2 py-1 transition-colors',
              solo ? 'bg-paper text-ink' : 'text-paper/60 hover:text-paper',
            )}
          >
            Vs AI
          </button>
          <button
            type="button"
            aria-pressed={!solo}
            onClick={() => changeMode('duo')}
            className={cn(
              'border-l border-paper/25 px-2 py-1 transition-colors',
              !solo ? 'bg-paper text-ink' : 'text-paper/60 hover:text-paper',
            )}
          >
            2P
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col px-4 pb-4 pt-4 sm:px-5">
        {/* scoreboard */}
        <div className="grid grid-cols-3 border border-paper/20">
          {labels.map((item, index) => (
            <div
              key={item.key}
              className={cn(
                'px-3 py-2.5 text-center',
                index === 1 && 'border-x border-paper/20',
                !finished && turn === item.key && item.key !== 'D' && 'bg-paper/[0.06]',
              )}
            >
              <p className="font-display text-[1.6rem] font-bold leading-none tracking-[-0.03em]">
                {item.key === 'D' ? scores.D : scores[item.key]}
              </p>
              <p className="mt-1 font-mono text-[8.5px] uppercase tracking-[0.14em] text-paper/55">
                {item.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-4 w-full max-w-[310px]">
          <div className="relative grid aspect-square grid-cols-3 border border-paper/25">
            {board.map((mark, index) => {
              const winning = winningCells.includes(index)
              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => play(index)}
                  disabled={Boolean(mark) || finished || thinking}
                  aria-label={`Row ${Math.floor(index / 3) + 1}, column ${(index % 3) + 1}${
                    mark ? `, ${mark}` : ', empty'
                  }`}
                  className={cn(
                    'group relative flex items-center justify-center border-paper/20 transition-colors duration-300',
                    index % 3 !== 2 && 'border-r',
                    index < 6 && 'border-b',
                    winning ? 'bg-red/15' : 'hover:bg-paper/[0.05]',
                    !mark && !finished && !thinking ? 'cursor-pointer' : 'cursor-default',
                  )}
                >
                  <motion.span
                    key={mark}
                    initial={reduce ? false : { scale: 0.5, rotate: mark === 'X' ? -12 : 12, opacity: 0 }}
                    animate={{ scale: 1, rotate: 0, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 420, damping: 24 }}
                    className={cn(
                      'font-display text-[clamp(2.3rem,5vw,3.4rem)] font-bold leading-none',
                      mark === 'X' ? 'text-red' : 'text-paper',
                      winning && 'text-paper',
                    )}
                  >
                    {mark}
                  </motion.span>
                  {!mark && !finished && !thinking && (
                    <span className="absolute font-mono text-[9.5px] text-paper/0 transition-colors group-hover:text-paper/55">
                      {turn}
                    </span>
                  )}
                </button>
              )
            })}

            {lineCoords && (
              <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="pointer-events-none absolute inset-0 h-full w-full"
                aria-hidden="true"
              >
                <motion.line
                  x1={lineCoords.x1}
                  y1={lineCoords.y1}
                  x2={lineCoords.x2}
                  y2={lineCoords.y2}
                  stroke="#E5393F"
                  strokeWidth="2.2"
                  strokeLinecap="square"
                  initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: reduce ? 0 : 0.4, ease: 'easeOut' }}
                />
              </svg>
            )}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-paper/60" role="status" aria-live="polite">
            <span className={cn('mr-1.5 inline-block h-[5px] w-[5px]', finished ? 'bg-paper/30' : 'bg-red')} />
            {statusText}
          </p>
          <span className="hidden font-mono text-[9.5px] uppercase tracking-[0.12em] text-paper/55 sm:block">
            Round {String(round).padStart(2, '0')}
          </span>
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-2 pt-4">
          <button
            type="button"
            onClick={newRound}
            className="inline-flex items-center gap-2 border border-paper/30 px-3 py-2 font-mono text-[9.5px] uppercase tracking-[0.14em] text-paper/75 transition-colors hover:border-paper hover:bg-paper hover:text-ink"
          >
            <RotateCcw size={10} strokeWidth={1.8} />
            {finished ? 'New round' : 'Restart'}
          </button>
          <button
            type="button"
            onClick={resetScore}
            className="inline-flex items-center gap-2 px-1 py-2 font-mono text-[9.5px] uppercase tracking-[0.14em] text-paper/55 transition-colors hover:text-paper/70"
          >
            <Trophy size={10} strokeWidth={1.6} />
            Reset score
          </button>
          <span className="ml-auto font-mono text-[9.5px] uppercase tracking-[0.12em] text-paper/55">
            {solo ? 'Minimax AI' : 'Pass & play'}
          </span>
        </div>
      </div>
    </div>
  )
}
