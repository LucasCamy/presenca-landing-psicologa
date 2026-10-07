import { demoMode, emergencyNotice, footer, professional } from '../content/site'

export function Footer() {
  return (
    <footer className="bg-ink text-bg">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-5 py-14 md:px-10">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
          <div className="flex flex-col gap-2">
            <p className="font-serif text-2xl">{professional.fullName}</p>
            <p>{professional.title} · {professional.crp}</p>
            <p className="text-sm opacity-90">{professional.modality} · {professional.location}</p>
          </div>
          <nav aria-label="Rodapé">
            <ul className="m-0 flex list-none flex-col gap-2 p-0">
              {footer.links.map((l) => (
                <li key={l.href}><a href={l.href} className="inline-block py-2 text-bg underline-offset-4 hover:underline">{l.label}</a></li>
              ))}
            </ul>
          </nav>
          <ul className="m-0 flex list-none flex-col gap-2 p-0">
            <li><a href={`mailto:${professional.email}`} className="inline-block py-2 text-bg underline-offset-4 hover:underline">{professional.email}</a></li>
            <li className="py-2">WhatsApp: {professional.whatsappDisplay}</li>
            <li><a href={professional.instagramUrl} target="_blank" rel="noopener noreferrer" className="inline-block py-2 text-bg underline-offset-4 hover:underline">Instagram {professional.instagramHandle}</a></li>
          </ul>
        </div>
        <p role="note" className="max-w-3xl border-t border-bg/25 pt-6 text-sm">{emergencyNotice}</p>
        <p className="text-sm opacity-90">
          {footer.copyright}
          {demoMode && <> {footer.demoNotice}</>}
        </p>
      </div>
    </footer>
  )
}
