import SectionHeader from '../components/SectionHeader'
import Reveal from '../components/Reveal'
import TicTacToe from '../games/TicTacToe'
import Snake from '../games/Snake'

const ticker = ['Insert coin', 'Two games', 'No logins', 'No downloads', 'Play nice']

export default function Arcade() {
  return (
    <section
      id="arcade"
      className="relative scroll-mt-24 overflow-hidden border-y border-ink bg-ink py-20 text-paper sm:py-28 lg:py-32"
    >
      <div className="shell">
        <SectionHeader
          dark
          number="06"
          eyebrow="Arcade"
          note="Two working games, built for this site. Keyboard, mouse or touch — no sign-up, no download."
          title={
            <>
              TAKE A
              <br />
              <span className="text-outline-paper">BREAK.</span>
            </>
          }
        />

        <div className="mt-8 flex flex-col justify-between gap-5 border-b border-paper/20 pb-5 sm:flex-row sm:items-end">
          <p className="max-w-[44ch] text-[14px] leading-[1.7] text-paper/60">
            A good game is a small, honest system: rules, state, input and feedback. These two are
            here because they work — not because they fill a grid.
          </p>
          <div className="flex gap-6">
            {[
              { value: '02', label: 'Games' },
              { value: '00', label: 'Logins' },
              { value: '∞', label: 'Rounds' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-xl font-bold leading-none tracking-[-0.03em]">
                  {stat.value}
                </p>
                <p className="mt-1 font-mono text-[7px] uppercase tracking-[0.14em] text-paper/55">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 grid items-stretch gap-6 lg:grid-cols-2">
          <Reveal amount={0.05}>
            <TicTacToe />
          </Reveal>
          <Reveal amount={0.05} delay={0.08}>
            <Snake />
          </Reveal>
        </div>

        <div className="mt-7 overflow-hidden border-y border-paper/20 py-2">
          <div className="flex w-max animate-marquee">
            {[0, 1].map((copy) => (
              <div
                key={copy}
                aria-hidden={copy === 1}
                className="flex shrink-0 items-center gap-6 pr-6 font-mono text-[9px] uppercase tracking-[0.24em] text-paper/55"
              >
                {ticker.map((item) => (
                  <span key={`${copy}-${item}`} className="flex items-center gap-6">
                    {item}
                    <span className="text-red-bright">✳</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="label-tight text-paper/55">
            Controls — keyboard, mouse, touch and swipe
          </p>
          <p className="label-tight text-paper/55">
            Animations respect reduced-motion settings
          </p>
        </div>
      </div>
    </section>
  )
}
