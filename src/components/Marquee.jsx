/** Infinite typographic marquee. The duplicate track is hidden from assistive tech. */
export default function Marquee({
  items = ['BUILD', 'BREAK', 'LEARN', 'REPEAT'],
  dark = false,
  className = '',
}) {
  const row = (
    <div className="flex shrink-0 items-center">
      {items.map((item, index) => (
        <span key={`${item}-${index}`} className="flex items-center">
          <span className="display whitespace-nowrap px-6 text-[clamp(2rem,5vw,4.4rem)] sm:px-9">
            {item}
          </span>
          <span className={`text-[0.7em] ${dark ? 'text-red' : 'text-red'}`}>✳</span>
        </span>
      ))}
    </div>
  )

  return (
    <div
      className={`relative overflow-hidden border-y ${
        dark ? 'border-paper/20 text-paper' : 'border-ink/15 text-ink'
      } ${className}`}
    >
      <div className="flex w-max animate-marquee py-3 will-change-transform">
        {row}
        <div aria-hidden="true" className="flex shrink-0 items-center">
          {items.map((item, index) => (
            <span key={`dup-${item}-${index}`} className="flex items-center">
              <span className="display whitespace-nowrap px-6 text-[clamp(2rem,5vw,4.4rem)] sm:px-9">
                {item}
              </span>
              <span className="text-[0.7em] text-red">✳</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
