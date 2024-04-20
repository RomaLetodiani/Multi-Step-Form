import { ReactNode } from 'react'

const Span = ({ children }: { children: ReactNode }) => {
  return <span className="font-seymour drop-shadow-2xl animate-bounce">{children}</span>
}

export default Span
