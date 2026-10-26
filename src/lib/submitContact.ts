export interface ContactPayload {
  name: string
  email: string
  preference: string
  message: string
}

/**
 * ⚠ SIMULAÇÃO. Nenhum dado sai do navegador.
 * Antes de publicar, substitua o corpo desta função por uma chamada real
 * (serviço de formulários, função serverless ou API própria, sempre via HTTPS)
 * e atualize PRIVACY.md com o provedor, a retenção e a responsável pelos dados.
 */
export async function submitContact(payload: ContactPayload): Promise<void> {
  void payload
  await new Promise((resolve) => setTimeout(resolve, 900))
}

export const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim())
