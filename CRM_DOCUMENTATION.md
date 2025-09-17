# CRM WhatsApp - Documentação Técnica

## Visão Geral
Sistema CRM especializado para integração com WhatsApp e fluxos de automação n8n. O sistema funciona como interface de controle para operadores humanos gerenciarem conversas, intervir quando necessário e administrar dados de clientes, enquanto a automação (n8n) lida com a lógica de IA e comunicação primária.

## Arquitetura

### Principais Módulos

#### 1. Dashboard
- Visão geral do sistema com métricas em tempo real
- Status das integrações (n8n, WhatsApp API, Redis, Supabase)
- Atividade recente do sistema
- KPIs de conversas, contatos e conversões

#### 2. Inbox (Módulo Principal)
- **Layout de 3 Colunas:**
  - **Esquerda:** Lista de conversas ativas
  - **Centro:** Chat em tempo real com histórico de mensagens
  - **Direita:** Controle do bot e detalhes do contato

- **Funcionalidades Críticas:**
  - Controle "Pausar/Reativar Bot" (integrado via webhook com Redis)
  - Envio de mensagens humanas (bypass da IA)
  - Visualização diferenciada de mensagens (cliente vs bot/atendente)
  - Edição de dados do contato em tempo real

#### 3. Contatos
- Listagem completa de contatos com filtros
- Status visual do bot (ativo/pausado) por contato
- Campos customizáveis (Nicho, Faturamento, etc.)
- Integração com dados que alimentam a IA do n8n (via DadosUser)

#### 4. Pipelines (Funil de Vendas)
- Sistema Kanban para gestão de negócios
- Drag-and-drop entre etapas
- Webhook automático para n8n ao mover cards
- Métricas de conversão e valores ponderados

#### 5. Webhooks (Hub de Integração)
- **Webhooks de Entrada:** Recebem eventos do n8n
- **Webhooks de Saída:** Enviam comandos para o n8n
- Configuração visual de mapeamentos de dados
- Monitoramento de atividade e logs

#### 6. Configurações
- Perfil do usuário e preferências
- Status das integrações
- Configurações de notificações
- Segurança e chaves de API

## Integração com n8n

### Fluxo de Dados Principal
```
WhatsApp API → n8n → CRM (webhook de entrada)
CRM → n8n (webhook de saída) → WhatsApp API
```

### Webhooks Críticos

#### Entrada (n8n → CRM)
1. **Receber Mensagens WhatsApp**
   - Endpoint: `/webhook/whatsapp/receive`
   - Dados mapeados:
     - `body.data.key.remoteJid` → `contact.phone`
     - `body.data.pushName` → `contact.name`
     - `body.data.message.conversation` → `message.text`
     - `body.data.messageType` → `message.type`
     - `body.instance` → `instance.id`

#### Saída (CRM → n8n)
1. **Enviar Mensagem Humana**
   - Endpoint n8n: `/webhook/send-human-message`
   - Payload: `{number, text, instance}`

2. **Pausar Bot**
   - Endpoint n8n: `/webhook/pause-bot`
   - Payload: `{contact_id}`
   - Ação: SET no Redis (chave "bloqueado")

3. **Reativar Bot**
   - Endpoint n8n: `/webhook/reactivate-bot`
   - Payload: `{contact_id}`
   - Ação: DELETE no Redis (chave "bloqueado")

4. **Etapa do Funil Alterada**
   - Endpoint n8n: `/webhook/pipeline-stage-changed`
   - Payload: `{contact_id, deal_name, new_stage}`

## Controle de Estado do Bot

### Mecânica Central
O controle do bot é a funcionalidade mais crítica do sistema. Funciona através da integração com Redis no fluxo n8n:

- **Bot Ativo:** Não existe chave "bloqueado" para o contato no Redis
- **Bot Pausado:** Existe chave "bloqueado" para o contato no Redis

### Interface de Controle
- Botão toggle "Pausar Bot" / "Reativar Bot"
- Indicador visual (verde/vermelho) em tempo real
- Status visível na lista de conversas e contatos

## Design System

### Cores Principais
- **WhatsApp Green:** `hsl(142, 76%, 36%)` - Cor primária
- **WhatsApp Dark:** `hsl(142, 86%, 28%)` - Hover states
- **Bot Active:** `hsl(142, 76%, 36%)` - Status ativo
- **Bot Paused:** `hsl(0, 84.2%, 60.2%)` - Status pausado

### Componentes Customizados
- Botões com variantes específicas: `whatsapp`, `bot-active`, `bot-paused`
- Cards de conversa com indicadores de status
- Badges de status integrados
- Avatars com indicadores visuais

## Tecnologias Utilizadas

### Frontend
- **React 18** com TypeScript
- **Tailwind CSS** para estilização
- **shadcn/ui** como base de componentes
- **React Router** para navegação
- **Tanstack Query** para gerenciamento de estado

### Backend (Integração)
- **n8n** para automação e lógica de negócio
- **Supabase** como banco de dados principal
- **Redis** para controle de estado do bot
- **WhatsApp API** (Evolution API) para mensagens

## Instalação e Configuração

### Pré-requisitos
- Node.js 18+
- Acesso ao n8n configurado
- URLs dos webhooks do n8n
- Credenciais do Supabase

### Configuração Inicial
1. Configurar URLs dos webhooks no módulo Webhooks
2. Testar conexões com n8n
3. Mapear campos de dados conforme fluxo existente
4. Configurar notificações e preferências

## Monitoramento e Logs

### Métricas Importantes
- Taxa de sucesso dos webhooks
- Tempo de resposta das requisições
- Número de conversas ativas
- Frequência de pausas do bot

### Logs de Auditoria
- Todas as ações de pausar/reativar bot
- Envios de mensagens humanas
- Movimentações no pipeline
- Alterações nos dados de contatos

## Roadmap

### Funcionalidades Futuras
- Dashboard de analytics avançado
- Automações internas do CRM
- Integração com mais canais (Telegram, Instagram)
- Sistema de templates de mensagens
- Relatórios e exportações

### Otimizações Técnicas
- Implementação de WebSockets para tempo real
- Cache inteligente de conversas
- Compressão de dados de webhook
- Sistema de filas para alta demanda