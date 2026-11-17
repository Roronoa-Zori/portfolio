import { useMemo, useState } from 'react'
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

const centering = [16.666, 50, 83.333]

export default function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState('X')
  const [scores, setScores] = useState({ X: 0, O: 0, D: 0 })
  const [round, setRound] = useState(1)
  const reduce = useReducedMotion()

  const result = useMemo(() => evaluate(board), [board])
  const finished = Boolean(result)
  const winningCells = result?.line ?? []

  const play = (index) => {
    if (board[index] || finished) return
    const next = [...board]
    next[index] = turn
    setBoard(next)
    const outcome = evaluate(next)
    if (outcome) {
      const key = outcome.winner ?? 'D'
      setScores((prev) => ({ ...prev, [key]: prev[key] + 1 }))
    } else {
      setTurn((prev) => (prev === 'X' ? 'O' : 'X'))
    }
  }

  const newRound = () => {
    setBoard(Array(9).fill(null))
    setTurn('X')
    setRound((prev) => prev + 1)
  }

  const resetScore = () => {
    setScores({ X: 0, O: 0, D: 0 })
    setRound(1)
    setBoard(Array(9).fill(null))
    setTurn('X')
  }

  const statusText = result
    ? result.winner
      ? `Player ${result.winner} wins`
      : 'Draw — no winner'
    : `Player ${turn}'s turn`

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
          <span className="font-mono text-[9px] text-red-bright">01</span>
          <h3 className="font-display text-[15px] font-bold uppercase tracking-[0.02em]">
            Tic-Tac-Toe
          </h3>
        </div>
        <span className="flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.14em] text-paper/55">
          <span className="h-[5px] w-[5px] bg-red" /> 2 players
        </span>
      </div>

      <div className="flex flex-1 flex-col px-4 pb-4 pt-4 sm:px-5">
        {/* scoreboard */}
        <div className="grid grid-cols-3 border border-paper/20">
          {[
            { key: 'X', label: 'Player X' },
            { key: 'D', label: 'Draws' },
            { key: 'O', label: 'Player O' },
          ].map((item, index) => (
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
              <p className="mt-1 font-mono text-[7px] uppercase tracking-[0.14em] text-paper/55">
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
                  disabled={Boolean(mark) || finished}
                  aria-label={`Row ${Math.floor(index / 3) + 1}, column ${(index % 3) + 1}${
                    mark ? `, ${mark}` : ', empty'
                  }`}
                  className={cn(
                    'group relative flex items-center justify-center border-paper/20 transition-colors duration-300',
                    index % 3 !== 2 && 'border-r',
                    index < 6 && 'border-b',
                    winning ? 'bg-red/15' : 'hover:bg-paper/[0.05]',
                    !mark && !finished ? 'cursor-pointer' : 'cursor-default',
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
                  {!mark && !finished && (
                    <span className="absolute font-mono text-[8px] text-paper/0 transition-colors group-hover:text-paper/55">
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
          <p className="font-mono text-[8.5px] uppercase tracking-[0.12em] text-paper/60" role="status" aria-live="polite">
            <span className={cn('mr-1.5 inline-block h-[5px] w-[5px]', finished ? 'bg-paper/30' : 'bg-red')} />
            {statusText}
          </p>
          <span className="hidden font-mono text-[8px] uppercase tracking-[0.12em] text-paper/55 sm:block">
            Round {String(round).padStart(2, '0')}
          </span>
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-2 pt-4">
          <button
            type="button"
            onClick={newRound}
            className="inline-flex items-center gap-2 border border-paper/30 px-3 py-2 font-mono text-[8px] uppercase tracking-[0.14em] text-paper/75 transition-colors hover:border-paper hover:bg-paper hover:text-ink"
          >
            <RotateCcw size={10} strokeWidth={1.8} />
            {finished ? 'New round' : 'Restart'}
          </button>
          <button
            type="button"
            onClick={resetScore}
            className="inline-flex items-center gap-2 px-1 py-2 font-mono text-[8px] uppercase tracking-[0.14em] text-paper/55 transition-colors hover:text-paper/70"
          >
            <Trophy size={10} strokeWidth={1.6} />
            Reset score
          </button>
          <span className="ml-auto font-mono text-[8px] uppercase tracking-[0.12em] text-paper/55">
            Pass &amp; play
          </span>
        </div>
      </div>
    </div>
  )
}
