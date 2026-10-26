import { demoMode, emergencyNotice, footer, phoneUrl, professional } from '../content/site'

const linkClass = 'inline-flex min-h-11 items-center text-tint no-underline hover:underline underline-offset-4'

export function Footer() {
  return (
    <footer className="bg-night text-tint">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-5 py-14 md:px-10">
        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr_1fr]">
          <div className="flex flex-col gap-2">
            <p className="font-display text-sm font-semibold uppercase tracking-[0.06em] text-peach-soft">{professional.fullName}</p>
            <p>{professional.title} · {professional.crp}</p>
            <p className="text-sm">{professional.modality}</p>
          </div>
          <nav aria-label="Rodapé">
            <ul className="m-0 flex list-none flex-col p-0">
              {footer.links.map((l) => (
                <li key={l.href}><a href={l.href} className={linkClass}>{l.label}</a></li>
              ))}
            </ul>
          </nav>
          <ul className="m-0 flex list-none flex-col p-0">
            <li><a href={phoneUrl} className={linkClass}>{professional.phoneDisplay}</a></li>
            <li><a href={`mailto:${professional.email}`} className={`${linkClass} break-all`}>{professional.email}</a></li>
            <li><a href={professional.instagramUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>Instagram {professional.instagramHandle}</a></li>
          </ul>
        </div>
        <p role="note" className="max-w-3xl border-t border-tint/20 pt-6 text-sm">{emergencyNotice}</p>
        <p className="text-sm">
          {footer.copyright}
          {demoMode && <> {footer.demoNotice}</>}
        </p>
      </div>
    </footer>
  )
}
