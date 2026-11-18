import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <section className="relative flex min-h-[78svh] items-center overflow-hidden pt-24">
      <div className="shell">
        <div className="flex items-center gap-3 border-t border-ink/20 pt-4">
          <span className="h-[7px] w-[7px] bg-red" aria-hidden="true" />
          <span className="label text-ink/62">Error 404 — off the page</span>
        </div>
        <h1 className="display mt-8 text-[clamp(4rem,16vw,13rem)]">
          404
          <br />
          <span className="text-outline">LOST.</span>
        </h1>
        <p className="mt-6 max-w-[42ch] text-[16px] leading-[1.7] text-ink/65">
          This page does not exist — or it was never printed. The index is a safer place to start.
        </p>
        <Link to="/" className="btn-editorial group mt-8">
          <ArrowLeft
            size={13}
            strokeWidth={1.8}
            className="transition-transform duration-300 group-hover:-translate-x-0.5"
          />
          Back to the index
        </Link>
      </div>
    </section>
  )
}
