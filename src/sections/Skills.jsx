import { useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import SectionHeader from '../components/SectionHeader'
import Reveal from '../components/Reveal'
import { skillGroups } from '../data/skills'
import { cn } from '../utils/cn'

function Tab({
  group,
  active,
  onClick,
  onKeyDown,
  buttonRef,
  dark = false,
}) {
  return (
    <button
      ref={buttonRef}
      type="button"
      role="tab"
      id={`skill-tab-${group.id}`}
      aria-selected={active}
      aria-controls="skill-panel"
      tabIndex={active ? 0 : -1}
      onClick={onClick}
      onKeyDown={onKeyDown}
      className={cn(
        'group flex w-full items-center justify-between gap-4 border-b py-3.5 text-left transition-colors duration-300',
        active ? 'border-ink' : 'border-ink/15 hover:border-ink/40',
      )}
    >
      <span className="flex items-baseline gap-3">
        <span className={cn('font-mono text-[9px] tracking-[0.12em]', active ? 'text-red-text' : 'text-ink/62')}>
          {group.index}
        </span>
        <span
          className={cn(
            'font-display text-[clamp(1.15rem,2vw,1.6rem)] font-bold uppercase leading-none tracking-[-0.02em] transition-colors duration-300',
            active ? 'text-ink' : 'text-ink/62 group-hover:text-ink/70',
          )}
        >
          {group.name}
        </span>
      </span>
      <span className={cn('label-tight', active ? 'text-ink/60' : 'text-ink/62')}>
        {String(group.items.length).padStart(2, '0')}
      </span>
    </button>
  )
}

export default function Skills() {
  const [activeId, setActiveId] = useState(skillGroups[0].id)
  const [activeSkill, setActiveSkill] = useState(skillGroups[0].items[0].name)
  const reduce = useReducedMotion()
  const tabRefs = useRef([])

  const group = skillGroups.find((item) => item.id === activeId) ?? skillGroups[0]
  const activeItem = group.items.find((item) => item.name === activeSkill) ?? group.items[0]

  const selectGroup = (nextGroup) => {
    setActiveId(nextGroup.id)
    setActiveSkill(nextGroup.items[0].name)
  }

  const onTabKeyDown = (event, index) => {
    const keys = ['ArrowDown', 'ArrowRight', 'ArrowUp', 'ArrowLeft', 'Home', 'End']
    if (!keys.includes(event.key)) return
    event.preventDefault()
    let nextIndex = index
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
      nextIndex = (index + 1) % skillGroups.length
    } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
      nextIndex = (index - 1 + skillGroups.length) % skillGroups.length
    } else if (event.key === 'Home') {
      nextIndex = 0
    } else if (event.key === 'End') {
      nextIndex = skillGroups.length - 1
    }
    selectGroup(skillGroups[nextIndex])
    tabRefs.current[nextIndex]?.focus()
  }

  return (
    <section id="skills" className="relative scroll-mt-24 border-y border-ink/15 py-20 sm:py-28 lg:py-32">
      <div className="shell">
        <SectionHeader
          number="02"
          eyebrow="Toolkit"
          note="Only what the CV and certificates support. No percentages, no invented proficiency levels."
          title={
            <>
              WHAT I
              <br />
              <span className="text-outline">ACTUALLY USE.</span>
            </>
          }
        />

        <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Reveal>
              <div
                role="tablist"
                aria-label="Skill categories"
                aria-orientation="vertical"
                className="border-t border-ink"
              >
                {skillGroups.map((item, index) => (
                  <Tab
                    key={item.id}
                    group={item}
                    active={item.id === group.id}
                    onClick={() => selectGroup(item)}
                    onKeyDown={(event) => onTabKeyDown(event, index)}
                    buttonRef={(node) => {
                      tabRefs.current[index] = node
                    }}
                  />
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.08} className="mt-6">
              <p className="field-note max-w-[38ch] text-ink/62">
                Evidence tags come from the supplied documents. Training exposure is labelled as
                training, not expertise.
              </p>
              <div className="mt-5 flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center border border-ink/20">
                  <span className="font-mono text-[9px] text-ink/62">{group.index}</span>
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink/62">
                  {group.items.length} entries · updated 2026
                </span>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-8 lg:border-l lg:border-ink/15 lg:pl-8">
            <div
              id="skill-panel"
              role="tabpanel"
              aria-labelledby={`skill-tab-${group.id}`}
              tabIndex={0}
              className="min-h-[340px] border-t border-ink pt-5 sm:min-h-[380px]"
            >
              <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
                <p className="label text-ink/62">{group.note}</p>
                <span className="label-tight shrink-0 text-red-text">
                  {group.index} / {String(skillGroups.length).padStart(2, '0')}
                </span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={group.id}
                  initial={reduce ? false : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-6 flex flex-wrap items-baseline gap-x-5 gap-y-1 sm:mt-8"
                >
                  {group.items.map((item, index) => {
                    const selected = item.name === activeItem.name
                    return (
                      <button
                        key={item.name}
                        type="button"
                        onMouseEnter={() => setActiveSkill(item.name)}
                        onFocus={() => setActiveSkill(item.name)}
                        onClick={() => setActiveSkill(item.name)}
                        aria-pressed={selected}
                        className="group relative text-left"
                      >
                        <span
                          className={cn(
                            'font-display text-[clamp(1.7rem,4.4vw,3.9rem)] font-bold uppercase leading-[1.08] tracking-[-0.04em] transition-colors duration-300',
                            selected ? 'text-red-text' : 'text-ink/75 group-hover:text-ink',
                          )}
                        >
                          {item.name}
                        </span>
                        <span
                          aria-hidden="true"
                          className={cn(
                            'absolute -right-3 -top-1.5 font-mono text-[8px] transition-opacity duration-300',
                            selected ? 'opacity-100 text-red-text' : 'opacity-0',
                          )}
                        >
                          ✳
                        </span>
                        {index < group.items.length - 1 && (
                          <span className="sr-only">, </span>
                        )}
                      </button>
                    )
                  })}
                </motion.div>
              </AnimatePresence>

              <div className="mt-10 border-t border-ink/20 pt-4 sm:mt-12">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:gap-6">
                  <span className="label-tight shrink-0 text-ink/62">Evidence</span>
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={activeItem.name}
                      initial={reduce ? false : { opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduce ? undefined : { opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="text-[13px] leading-relaxed text-ink/65"
                    >
                      <span className="font-medium text-ink">{activeItem.name}</span> — {activeItem.evidence}.
                    </motion.p>
                  </AnimatePresence>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-ink/15 pt-4">
              <span className="flex items-center gap-2 label-tight text-ink/62">
                <span className="h-[5px] w-[5px] bg-red" /> Hover or focus a term
              </span>
              <span className="label-tight text-ink/62">Arrow keys switch categories</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
