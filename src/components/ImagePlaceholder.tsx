import type { SiteImage } from '../content/site'

interface Props {
  image: SiteImage
  className?: string
  /** Texto do placeholder quando `image.src` é null. */
  label: string
  priority?: boolean
}

/** Mostra a imagem quando `src` existe; caso contrário, um placeholder claramente identificado. */
export function ImagePlaceholder({ image, className = '', label, priority = false }: Props) {
  if (image.src) {
    return (
      <img
        src={image.src}
        alt={image.alt}
        width={800}
        height={800}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        className={`object-cover ${className}`}
      />
    )
  }
  return (
    <div
      role="img"
      aria-label={`Espaço reservado: ${label}`}
      className={`flex items-center justify-center border border-line bg-bg-alt p-8 text-center text-sm text-ink-2 ${className}`}
    >
      <span>
        <strong className="block font-semibold text-ink">SUBSTITUIR IMAGEM</strong>
        {label}
      </span>
    </div>
  )
}
