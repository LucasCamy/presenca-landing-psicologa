interface Props {
  eyebrow?: string
  title: string
  intro?: string
  id: string
  center?: boolean
}

export function SectionHeader({ eyebrow, title, intro, id, center = false }: Props) {
  return (
    <header className={`flex max-w-2xl flex-col gap-4 ${center ? 'mx-auto items-center text-center' : ''}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 id={id} className="text-[clamp(1.75rem,3.6vw,2.5rem)] font-light">{title}</h2>
      {intro && <p className="text-lg text-ink-2">{intro}</p>}
    </header>
  )
}
