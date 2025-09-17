import React, { useState } from 'react';
import { MainLayout } from '@/components/Layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  MessageSquare, 
  Bot, 
  User, 
  Send,
  Phone,
  Calendar,
  Pause,
  Play,
  Image,
  Mic,
  MoreHorizontal
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Inbox() {
  const [selectedContact, setSelectedContact] = useState(1);
  const [message, setMessage] = useState('');
  const [botStatus, setBotStatus] = useState<'active' | 'paused'>('active');

  const conversations = [
    {
      id: 1,
      name: 'João Silva',
      phone: '+55 11 99999-9999',
      lastMessage: 'Oi, tenho interesse no produto...',
      time: '14:32',
      unread: 3,
      botActive: true,
      avatar: 'JS'
    },
    {
      id: 2,
      name: 'Maria Santos',
      phone: '+55 11 88888-8888',
      lastMessage: 'Quando posso agendar uma demo?',
      time: '13:45',
      unread: 0,
      botActive: false,
      avatar: 'MS'
    },
    {
      id: 3,
      name: 'Pedro Costa',
      phone: '+55 11 77777-7777',
      lastMessage: 'Obrigado pelas informações!',
      time: '12:20',
      unread: 1,
      botActive: true,
      avatar: 'PC'
    },
  ];

  const currentConversation = conversations.find(c => c.id === selectedContact);
  
  const messages = [
    {
      id: 1,
      text: 'Oi! Tenho interesse no seu produto.',
      fromMe: false,
      time: '14:30',
      type: 'text'
    },
    {
      id: 2,
      text: 'Olá! Fico feliz com seu interesse. Pode me contar mais sobre seu negócio?',
      fromMe: true,
      time: '14:31',
      type: 'text',
      sender: 'bot'
    },
    {
      id: 3,
      text: 'Tenho uma loja de roupas online e quero melhorar o atendimento.',
      fromMe: false,
      time: '14:32',
      type: 'text'
    },
  ];

  const handleToggleBot = () => {
    setBotStatus(prev => prev === 'active' ? 'paused' : 'active');
    // Aqui seria feito o webhook para n8n
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;
    // Aqui seria feito o webhook para enviar mensagem humana
    setMessage('');
  };

  return (
    <MainLayout title="Inbox">
      <div className="flex h-full">
        {/* Lista de Conversas */}
        <div className="w-80 border-r border-border bg-card">
          <div className="p-4 border-b border-border">
            <h3 className="font-semibold mb-3">Conversas Ativas</h3>
            <Input placeholder="Buscar conversas..." />
          </div>
          
          <div className="overflow-y-auto">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                onClick={() => setSelectedContact(conversation.id)}
                className={cn(
                  "p-4 border-b border-border cursor-pointer hover:bg-muted/50 transition-colors",
                  selectedContact === conversation.id && "bg-whatsapp/10 border-r-2 border-r-whatsapp"
                )}
              >
                <div className="flex items-start space-x-3">
                  <div className="relative">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-whatsapp text-white text-sm">
                        {conversation.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className={cn(
                      "absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background",
                      conversation.botActive ? "bg-bot-active" : "bg-bot-paused"
                    )}></div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium truncate">{conversation.name}</h4>
                      <span className="text-xs text-muted-foreground">{conversation.time}</span>
                    </div>
                    
                    <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
                    
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-muted-foreground">{conversation.phone}</span>
                      {conversation.unread > 0 && (
                        <Badge className="bg-whatsapp text-xs h-5 w-5 p-0 flex items-center justify-center">
                          {conversation.unread}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat */}
        <div className="flex-1 flex flex-col">
          {currentConversation ? (
            <>
              {/* Header do Chat */}
              <div className="p-4 border-b border-border bg-card">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-whatsapp text-white">
                        {currentConversation.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{currentConversation.name}</h3>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Phone className="h-3 w-3" />
                        <span>{currentConversation.phone}</span>
                      </div>
                    </div>
                  </div>
                  
                  <Button
                    variant={botStatus === 'active' ? 'destructive' : 'default'}
                    onClick={handleToggleBot}
                    className="flex items-center gap-2"
                  >
                    {botStatus === 'active' ? (
                      <>
                        <Pause className="h-4 w-4" />
                        Pausar Bot
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4" />
                        Reativar Bot
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {/* Mensagens */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={cn(
                      "flex",
                      msg.fromMe ? "justify-end" : "justify-start"
                    )}
                  >
                    <div className={cn(
                      "max-w-xs lg:max-w-md px-4 py-2 rounded-lg",
                      msg.fromMe 
                        ? "bg-whatsapp text-white" 
                        : "bg-muted"
                    )}>
                      <p className="text-sm">{msg.text}</p>
                      <div className="flex items-center justify-between mt-1">
                        <span className={cn(
                          "text-xs",
                          msg.fromMe ? "text-white/70" : "text-muted-foreground"
                        )}>
                          {msg.time}
                        </span>
                        {msg.fromMe && msg.sender === 'bot' && (
                          <Bot className="h-3 w-3 text-white/70" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input de Mensagem */}
              <div className="p-4 border-t border-border bg-card">
                <div className="flex items-end space-x-2">
                  <div className="flex-1 relative">
                    <Textarea
                      placeholder="Digite sua mensagem..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="min-h-[44px] max-h-32 resize-none pr-20"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                    />
                    <div className="absolute right-2 bottom-2 flex space-x-1">
                      <Button variant="ghost" size="sm" className="p-1 h-6 w-6">
                        <Image className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="p-1 h-6 w-6">
                        <Mic className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <Button 
                    onClick={handleSendMessage}
                    className="bg-whatsapp hover:bg-whatsapp-dark"
                    disabled={!message.trim()}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-muted/20">
              <div className="text-center">
                <MessageSquare className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Selecione uma conversa</h3>
                <p className="text-muted-foreground">Escolha uma conversa para começar a atender</p>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar do Contato */}
        {currentConversation && (
          <div className="w-80 border-l border-border bg-card">
            <div className="p-4 space-y-6">
              {/* Status do Bot */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Bot className="h-4 w-4" />
                    Status do Bot
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className={cn(
                        "h-3 w-3 rounded-full",
                        botStatus === 'active' ? "bg-bot-active" : "bg-bot-paused"
                      )}></div>
                      <span className="font-medium">
                        {botStatus === 'active' ? 'Bot Ativo' : 'Bot Pausado'}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {botStatus === 'active' 
                      ? 'O bot está respondendo automaticamente' 
                      : 'Atendimento humano ativo'
                    }
                  </p>
                </CardContent>
              </Card>

              {/* Detalhes do Contato */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Detalhes do Contato
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <label className="text-xs text-muted-foreground">Nome</label>
                    <Input defaultValue={currentConversation.name} className="mt-1" />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">Telefone</label>
                    <Input defaultValue={currentConversation.phone} className="mt-1" disabled />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">Nicho</label>
                    <Input placeholder="Ex: E-commerce" className="mt-1" />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">Faturamento</label>
                    <Input placeholder="Ex: R$ 50.000/mês" className="mt-1" />
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    Salvar Alterações
                  </Button>
                </CardContent>
              </Card>

              {/* Agendamentos */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Agendamentos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="p-2 bg-muted/50 rounded">
                      <p className="font-medium">Demo Produto</p>
                      <p className="text-xs text-muted-foreground">Amanhã, 14:00</p>
                    </div>
                    <p className="text-xs text-muted-foreground text-center py-2">
                      Nenhum outro agendamento
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}