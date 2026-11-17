import { useRef } from 'react'
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import ArcText from '../components/ArcText'
import Magnetic from '../components/Magnetic'
import { profile } from '../data/site'

const WORD = 'PORTFOLIO'
const OUTLINE_FROM = 4
const EASE_OUT = [0.16, 1, 0.3, 1]

function Word({ animated = false, echo = false }) {
  return (
    <span className="flex items-center">
      {WORD.split('').map((char, index) => {
        const outlined = index >= OUTLINE_FROM
        return (
          <span
            key={`${char}-${index}`}
            className="inline-block overflow-hidden py-[0.035em]"
            aria-hidden="true"
          >
            {animated ? (
              <motion.span
                className={`inline-block ${outlined ? 'text-outline' : ''}`}
                initial={{ y: '118%' }}
                animate={{ y: '0%' }}
                transition={{ delay: 0.42 + index * 0.043, duration: 0.95, ease: EASE_OUT }}
              >
                {char}
              </motion.span>
            ) : (
              <span className={`inline-block ${outlined || echo ? 'text-outline' : ''}`}>
                {char}
              </span>
            )}
          </span>
        )
      })}
    </span>
  )
}

function CollageCard({ children, className = '', rotate = 0, hoverRotate = 0, cursor = 'view' }) {
  return (
    <motion.div
      className={className}
      whileHover={{ rotate: hoverRotate, scale: 1.03, y: -7, zIndex: 40 }}
      transition={{ duration: 0.5, ease: EASE_OUT }}
      style={{ rotate }}
      data-cursor={cursor}
    >
      {children}
    </motion.div>
  )
}

export default function Hero() {
  const sectionRef = useRef(null)
  const reduce = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const wordY = useTransform(scrollYProgress, [0, 1], [0, -50])
  const redY = useTransform(scrollYProgress, [0, 1], [0, -100])
  const redScale = useTransform(scrollYProgress, [0, 1], [1, 0.9])
  const shelfY = useTransform(scrollYProgress, [0, 1], [0, -18])

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 55, damping: 18, mass: 0.6 })
  const sy = useSpring(my, { stiffness: 55, damping: 18, mass: 0.6 })

  const redMouseX = useTransform(sx, (v) => v * 16)
  const wordMouseX = useTransform(sx, (v) => v * 6)
  const card1X = useTransform(sx, (v) => v * 18)
  const card1Y = useTransform(sy, (v) => v * 9)
  const card2X = useTransform(sx, (v) => v * -12)
  const card2Y = useTransform(sy, (v) => v * -7)
  const card3X = useTransform(sx, (v) => v * 22)
  const card3Y = useTransform(sy, (v) => v * 10)
  const card4X = useTransform(sx, (v) => v * -18)
  const card4Y = useTransform(sy, (v) => v * 8)

  const onPointerMove = (event) => {
    if (reduce || event.pointerType === 'touch' || !sectionRef.current) return
    const rect = sectionRef.current.getBoundingClientRect()
    mx.set((event.clientX - rect.left) / rect.width - 0.5)
    my.set((event.clientY - rect.top) / rect.height - 0.5)
  }

  return (
    <section
      id="index"
      ref={sectionRef}
      onPointerMove={onPointerMove}
      className="relative overflow-hidden pb-2 pt-16 lg:pt-[76px]"
      aria-labelledby="hero-title"
    >
      <div className="shell flex min-h-[calc(100svh-4rem)] flex-col justify-between lg:min-h-[calc(100svh-4.75rem)]">
        {/* top meta */}
        <div className="flex items-start justify-between gap-4 pt-4 sm:pt-6">
          <div className="flex items-start gap-2.5">
            <span className="mt-[3px] h-[6px] w-[6px] shrink-0 bg-red" aria-hidden="true" />
            <div>
              <p className="label text-ink/65">Welcome to my</p>
              <p className="label-tight mt-2 text-ink/62">Portfolio — Vol. 01</p>
            </div>
          </div>
          <div className="text-right">
            <p className="label text-ink/60">CSE student · Developer</p>
            <p className="label-tight mt-2 text-ink/62">Rajshahi, Bangladesh</p>
          </div>
        </div>

        {/* wordmark */}
        <motion.div
          style={reduce ? undefined : { y: wordY, x: wordMouseX }}
          className="relative py-[2vh] sm:py-[3vh]"
        >
          <div className="flex flex-col items-center">
            {/* the type block owns the red block, so the block can only ever
                cover the letterforms and never bleed into the meta row */}
            <div className="relative flex w-full flex-col items-center">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 flex items-center justify-center"
              >
                <motion.div
                  style={reduce ? undefined : { y: redY, scaleY: redScale, x: redMouseX }}
                  className="h-[118%] w-[15.5vw] min-w-[72px] max-w-[236px]"
                >
                  <motion.div
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 1.15, ease: EASE_OUT, delay: 0.08 }}
                    className="h-full w-full bg-red"
                  />
                </motion.div>
              </div>

              {/* print-offset echo, built from the same letter grid */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 hidden select-none items-center justify-center opacity-[0.16] sm:flex"
              >
                <span className="display-tight translate-x-[0.022em] translate-y-[0.028em] text-[clamp(3.55rem,13.6vw,14.8rem)]">
                  <Word echo />
                </span>
              </div>

              <h1
                id="hero-title"
                aria-label="Portfolio"
                className="display-tight relative z-10 flex justify-center text-[clamp(3.4rem,13.6vw,14.8rem)]"
              >
                <span className="hidden sm:block" aria-hidden="true">
                  <Word animated />
                </span>
                <span className="flex flex-col items-center sm:hidden" aria-hidden="true">
                  <span className="flex">
                    {WORD.slice(0, 4).split('').map((char, index) => (
                      <span key={`m-${char}-${index}`} className="inline-block overflow-hidden py-[0.035em]">
                        <motion.span
                          className="inline-block"
                          initial={{ y: '118%' }}
                          animate={{ y: '0%' }}
                          transition={{ delay: 0.42 + index * 0.05, duration: 0.9, ease: EASE_OUT }}
                        >
                          {char}
                        </motion.span>
                      </span>
                    ))}
                  </span>
                  <span className="flex">
                    {WORD.slice(4).split('').map((char, index) => (
                      <span key={`m2-${char}-${index}`} className="inline-block overflow-hidden py-[0.035em]">
                        <motion.span
                          className="text-outline inline-block"
                          initial={{ y: '118%' }}
                          animate={{ y: '0%' }}
                          transition={{ delay: 0.62 + index * 0.05, duration: 0.9, ease: EASE_OUT }}
                        >
                          {char}
                        </motion.span>
                      </span>
                    ))}
                  </span>
                </span>
              </h1>
            </div>

            <div className="relative z-20 mt-3 flex w-full items-center justify-between gap-2 border-t border-ink/20 pt-2 sm:mt-[2.2vh]">
              <span className="label text-ink/60">CSE student</span>
              <span className="hidden flex-1 items-center gap-2 px-3 sm:flex" aria-hidden="true">
                <span className="h-px flex-1 bg-ink/20" />
                <span className="h-[5px] w-[5px] bg-red" />
                <span className="h-px flex-1 bg-ink/20" />
              </span>
              <span className="label flex items-center gap-2 text-ink/60">
                <span className="sm:hidden">·</span> Developer
              </span>
              <span className="hidden flex-1 items-center gap-2 px-3 sm:flex" aria-hidden="true">
                <span className="h-px flex-1 bg-ink/20" />
                <span className="h-[5px] w-[5px] bg-red" />
                <span className="h-px flex-1 bg-ink/20" />
              </span>
              <span className="label text-ink/60">Explorer</span>
            </div>
          </div>
        </motion.div>

        {/* collage shelf */}
        <motion.div style={reduce ? undefined : { y: shelfY }} className="relative z-20">
          <div className="flex items-end justify-center pb-1 pt-[0.5vh] sm:-space-x-4 lg:-space-x-5">
            {/* code card */}
            <motion.div
              style={reduce ? undefined : { x: card1X, y: card1Y }}
              className="relative z-[12] hidden md:block"
            >
              <motion.div
                initial={{ y: 26 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.82, duration: 0.75, ease: EASE_OUT }}
              >
                <CollageCard rotate={-9} hoverRotate={-3} cursor="code" className="float-slow">
                <div className="w-[clamp(160px,min(14vw,17vh),210px)] border border-ink bg-ink p-3 text-paper shadow-xl sm:p-3.5">
                  <div className="flex items-center justify-between border-b border-paper/25 pb-2">
                    <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-paper/58">
                      profile.js
                    </span>
                    <span className="flex gap-1">
                      <span className="h-1 w-1 bg-red" />
                      <span className="h-1 w-1 bg-paper/30" />
                      <span className="h-1 w-1 bg-paper/30" />
                    </span>
                  </div>
                  <pre className="mt-3 whitespace-pre-wrap font-mono text-[8px] leading-[1.85] text-paper/75 sm:text-[8.5px]">
{`const mominur = {
  base: 'Rajshahi',
  study: 'CSE, 4th year',
  stack: ['C', 'C++',
    'Java', 'Python'],
  status: 'learning'
}`}
                  </pre>
                  <p className="mt-2 font-mono text-[7px] uppercase tracking-[0.16em] text-red-bright">
                    // open to work
                  </p>
                </div>
                </CollageCard>
              </motion.div>
            </motion.div>

            {/* project card */}
            <motion.div
              style={reduce ? undefined : { x: card2X, y: card2Y }}
              className="relative z-[14] -mr-4 shrink-0 sm:-mr-0"
            >
              <motion.div
                initial={{ y: 32 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.95, duration: 0.8, ease: EASE_OUT }}
              >
                <CollageCard rotate={7} hoverRotate={2} cursor="work">
                <div className="float-slower w-[clamp(132px,min(18vw,21vh),240px)] border border-ink/25 bg-bone p-1.5 shadow-xl sm:p-2">
                  <div className="flex items-center gap-1 border-b border-ink/15 px-1 pb-1.5">
                    <span className="h-1 w-1 bg-red" />
                    <span className="h-1 w-1 bg-ink/25" />
                    <span className="h-1 w-1 bg-ink/25" />
                    <span className="ml-auto font-mono text-[6px] uppercase tracking-[0.14em] text-ink/62">
                      frootdash
                    </span>
                  </div>
                  <img
                    src="/projects/frootdash-home.webp"
                    alt="FrootDash fruit delivery storefront, shown in the hero collage."
                    width="1280"
                    height="646"
                    className="mt-1.5 aspect-[16/10] w-full object-cover object-top grayscale-[0.35] transition-all duration-700 hover:grayscale-0"
                    loading="eager"
                    decoding="async"
                  />
                  <div className="flex items-center justify-between px-1 pb-0.5 pt-1.5">
                    <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-ink/65">
                      Selected work / 01
                    </span>
                    <span className="h-[4px] w-[4px] bg-red" />
                  </div>
                </div>
                </CollageCard>
              </motion.div>
            </motion.div>

            {/* portrait */}
            <motion.div
              style={reduce ? undefined : { x: card3X, y: card3Y }}
              className="relative z-[25] shrink-0"
            >
              <motion.div
                initial={{ y: 38 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.9, duration: 0.85, ease: EASE_OUT }}
              >
                <CollageCard rotate={-2} hoverRotate={0} cursor="hello" className="float-slow">
                <figure className="w-[clamp(148px,min(22vw,25vh),276px)] border border-ink bg-ink p-1.5 shadow-2xl sm:p-2">
                  <div className="relative overflow-hidden">
                    <img
                      src="/images/portrait-hero.webp"
                      alt="Portrait of Md Mominur Rahman on a bridge in Rajshahi."
                      width="1300"
                      height="1300"
                      className="aspect-[4/5] w-full object-cover object-[50%_28%] grayscale-[0.18] transition-all duration-700 hover:scale-[1.03] hover:grayscale-0"
                      fetchPriority="high"
                      decoding="async"
                    />
                    <span className="absolute right-0 top-0 h-5 w-5 border-b border-l border-paper/50" />
                  </div>
                  <figcaption className="flex items-start justify-between gap-2 px-0.5 pb-0.5 pt-2 text-paper">
                    <span className="font-mono text-[6px] uppercase leading-[1.5] tracking-[0.12em] sm:text-[7.5px]">
                      Md Mominur Rahman
                      <br />
                      <span className="text-paper/55">Rajshahi · 2026</span>
                    </span>
                    <span className="font-mono text-[6px] uppercase tracking-[0.12em] text-red-bright sm:text-[7.5px]">
                      Fig. 00
                    </span>
                  </figcaption>
                </figure>
                </CollageCard>
              </motion.div>
            </motion.div>

            {/* certificate card */}
            <motion.div
              style={reduce ? undefined : { x: card4X, y: card4Y }}
              className="relative z-[10] hidden shrink-0 sm:block"
            >
              <motion.div
                initial={{ y: 26 }}
                animate={{ y: 0 }}
                transition={{ delay: 1.05, duration: 0.75, ease: EASE_OUT }}
              >
                <CollageCard rotate={10} hoverRotate={4} cursor="credential" className="float-slower">
                <div className="w-[clamp(96px,min(12vw,14vh),170px)] border border-ink/25 bg-bone p-1.5 shadow-xl">
                  <img
                    src="/certificates/ai-immersive-technology-preview.webp"
                    alt="Preview of the BDSET AI for Immersive Technology certificate."
                    width="900"
                    height="1352"
                    className="aspect-[4/5] w-full object-cover object-top"
                    loading="eager"
                    decoding="async"
                  />
                  <div className="flex items-center justify-between px-0.5 pb-0.5 pt-1.5">
                    <span className="font-mono text-[6px] uppercase tracking-[0.12em] text-ink/65">
                      BDSET · 288h
                    </span>
                    <span className="h-[4px] w-[4px] bg-red" />
                  </div>
                </div>
                </CollageCard>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* bottom meta */}
        <div className="flex items-end justify-between gap-4 border-t border-ink/15 pb-3 pt-3">
          <motion.a
            href="#about"
            className="group flex items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.25, duration: 0.8 }}
            data-cursor="scroll"
          >
            <span className="relative flex h-9 w-9 items-center justify-center rounded-full border border-ink/25 transition-colors group-hover:border-ink group-hover:bg-ink group-hover:text-paper">
              <ArrowDown
                size={13}
                strokeWidth={1.6}
                className="transition-transform duration-300 group-hover:translate-y-0.5"
              />
            </span>
            <span className="hidden flex-col gap-1 sm:flex">
              <span className="label text-ink/60">Scroll to explore</span>
              <span className="label-tight text-ink/62">About / Work / Arcade</span>
            </span>
          </motion.a>

          <div className="flex items-center gap-4 sm:gap-7">
            <div className="hidden text-right sm:block">
              <p className="label-tight text-ink/62">A small digital publication</p>
              <p className="label-tight mt-1.5 text-ink/65">Built with React &amp; care</p>
            </div>
            <Magnetic className="shrink-0">
              <ArcText
                text="OPEN TO INTERNSHIP · 2026 · "
                className="h-[64px] w-[64px] sm:h-[80px] sm:w-[80px]"
              />
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  )
}
