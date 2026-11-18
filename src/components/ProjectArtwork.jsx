import { cn } from '../utils/cn'

/** A deliberately graphic cover for the games entry — not a fake screenshot. */
export function GamePoster() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-ink">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(234,234,234,.35) 1px, transparent 1px), linear-gradient(90deg, rgba(234,234,234,.35) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
      <div className="absolute left-[8%] top-[18%] grid aspect-square w-[38%] grid-cols-3 border border-paper/40">
        {['X', '', 'O', '', 'X', '', 'O', '', 'X'].map((mark, index) => (
          <span
            key={index}
            className={cn(
              'flex items-center justify-center border border-paper/15 font-display text-[clamp(1rem,2.4vw,2rem)] leading-none',
              mark === 'X' ? 'text-red-bright' : 'text-paper',
              index === 8 && 'bg-red/15',
            )}
          >
            {mark}
          </span>
        ))}
      </div>

      <svg
        viewBox="0 0 220 200"
        aria-hidden="true"
        className="absolute -right-4 top-[12%] h-[74%] w-[56%] transition-transform duration-700 group-hover:translate-x-1"
      >
        <path
          d="M20 150 H70 V110 H120 V70 H175"
          fill="none"
          stroke="#E5393F"
          strokeWidth="13"
          strokeLinejoin="round"
          opacity="0.9"
        />
        <path
          d="M20 150 H70 V110 H120 V70 H175"
          fill="none"
          stroke="#EAEAEA"
          strokeWidth="1"
          strokeDasharray="4 5"
        />
        <rect x="164" y="59" width="22" height="22" fill="#EAEAEA" />
        <circle cx="181" cy="64" r="2.5" fill="#111111" />
        <circle cx="150" cy="95" r="4" fill="#E5393F" />
      </svg>

      <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3 border-t border-paper/25 pt-2.5">
        <span className="font-mono text-[9.5px] uppercase leading-relaxed tracking-[0.16em] text-paper/60">
          Playable studies
          <br />
          <span className="text-paper/55">Tic-tac-toe / Snake</span>
        </span>
        <span className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-red-bright">02 games</span>
      </div>
    </div>
  )
}

/** Original generative line study — clearly labelled as artwork, not coursework capture. */
export function GraphicsPoster() {
  const lines = Array.from({ length: 34 }, (_, index) => index)
  return (
    <div className="relative h-full w-full overflow-hidden bg-bone">
      <svg
        viewBox="0 0 640 420"
        className="absolute inset-0 h-full w-full transition-transform duration-[1.2s] ease-out group-hover:rotate-[1.5deg] group-hover:scale-[1.02]"
        aria-hidden="true"
      >
        <g stroke="#111111" strokeWidth="0.7" opacity="0.55">
          {lines.map((line) => {
            const y = 40 + line * 9.5
            return (
              <path
                key={line}
                d={`M -20 ${y} C 160 ${y - 70 + line * 2.2}, 420 ${y + 80 - line * 3}, 680 ${y - 20}`}
                fill="none"
              />
            )
          })}
        </g>
        <g fill="none" stroke="#E5393F" strokeWidth="1.4">
          <circle cx="410" cy="188" r="112" />
          <circle cx="410" cy="188" r="78" strokeDasharray="3 6" />
          <circle cx="410" cy="188" r="142" strokeDasharray="1 9" opacity="0.6" />
        </g>
        <rect x="330" y="108" width="160" height="160" fill="#EAEAEA" opacity="0.2" />
        <line x1="410" y1="40" x2="410" y2="336" stroke="#111111" strokeWidth="0.8" />
        <line x1="262" y1="188" x2="558" y2="188" stroke="#111111" strokeWidth="0.8" />
        <circle cx="410" cy="188" r="5" fill="#E5393F" />
      </svg>
      <div className="absolute inset-4 flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <span className="font-mono text-[9.5px] uppercase leading-relaxed tracking-[0.16em] text-ink/65">
            Drawing algorithms
            <br />
            <span className="text-ink/62">Line study 01</span>
          </span>
          <span className="h-2 w-2 bg-red" />
        </div>
        <div className="flex items-end justify-between gap-4">
          <span className="label-tight max-w-[22ch] leading-relaxed text-ink/62">
            Generative cover — not a project screenshot
          </span>
          <span className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-ink/62">CSE / CG</span>
        </div>
      </div>
    </div>
  )
}
