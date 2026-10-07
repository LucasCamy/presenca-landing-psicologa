# PRIVACY

> **Texto-modelo. Precisa ser revisado pela profissional e por assessoria jurídica antes da publicação** (LGPD e normas do CFP/CRP). A versão exibida no site está em `src/content/site.ts` (`privacy`).

## Dados coletados
Somente os do formulário de contato: nome, e-mail, preferência de contato (WhatsApp ou e-mail), mensagem curta (até 400 caracteres) e o registro do consentimento. **Não** se pedem dados clínicos, diagnóstico, histórico de saúde nem descrição de crise. O formulário avisa para não enviar informações sensíveis.

## Finalidade
Responder ao contato e combinar uma conversa inicial. Nenhum outro uso (sem marketing, sem venda ou compartilhamento).

## Formulário — estado atual
**O envio é simulado** (`src/lib/submitContact.ts`): nenhum dado sai do navegador nem é armazenado. Ao conectar um serviço real: usar HTTPS, minimizar o que é guardado, definir o provedor e o país de armazenamento, e atualizar este documento e a política exibida.

## Consentimento
Caixa obrigatória, desmarcada por padrão, com link para a política. O envio é bloqueado sem ela.

## Cookies e analytics
O modelo **não usa cookies nem rastreadores**; fontes são servidas localmente. Se for adicionado analytics, é preciso aviso/consentimento e atualização da política. Os links externos (WhatsApp, Instagram) pertencem a terceiros, com políticas próprias.

## Retenção
**A definir** (sugestão: excluir mensagens de contato que não viraram atendimento em prazo curto e definido).

## Direitos e contato
Acesso, correção e exclusão pelo e-mail profissional. Canal e responsável a definir.

## Canais seguros
Não prometer sigilo absoluto em WhatsApp, e-mail ou redes sociais. Detalhes clínicos devem ser tratados em canal apropriado combinado com a profissional.

## Emergências
O site não substitui atendimento de emergência. Não foram inseridos telefones de serviços locais; só acrescentar com confirmação.
