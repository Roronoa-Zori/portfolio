import Hero from '../sections/Hero'
import About from '../sections/About'
import Skills from '../sections/Skills'
import Work from '../sections/Work'
import Certificates from '../sections/Certificates'
import Experience from '../sections/Experience'
import Arcade from '../sections/Arcade'
import Contact from '../sections/Contact'
import { useDocumentMeta } from '../hooks/useDocumentMeta'

export default function Home() {
  useDocumentMeta(
    'Md Mominur Rahman — CSE Student & Developer',
    'The editorial portfolio of Md Mominur Rahman — a fourth-year Computer Science & Engineering student in Rajshahi, Bangladesh. Projects, credentials, a timeline and two playable games.',
  )

  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Work />
      <Certificates />
      <Experience />
      <Arcade />
      <Contact />
    </>
  )
}
