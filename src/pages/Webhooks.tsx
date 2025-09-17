import React, { useState } from 'react';
import { MainLayout } from '@/components/Layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { 
  Webhook, 
  Plus, 
  ArrowDownCircle,
  ArrowUpCircle,
  Copy,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Activity,
  Code,
  Settings,
  ExternalLink
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Webhooks() {
  const [selectedTab, setSelectedTab] = useState('incoming');

  const incomingWebhooks = [
    {
      id: 1,
      name: 'Receber Mensagens WhatsApp',
      url: 'https://crm.empresa.com/webhook/whatsapp/receive',
      status: 'active',
      lastReceived: '2024-01-15 14:32:15',
      totalRequests: 1247,
      description: 'Recebe mensagens do n8n vindas da API WhatsApp',
      mappings: {
        'body.data.key.remoteJid': 'contact.phone',
        'body.data.pushName': 'contact.name',
        'body.data.message.conversation': 'message.text',
        'body.data.messageType': 'message.type',
        'body.instance': 'instance.id'
      }
    }
  ];

  const outgoingWebhooks = [
    {
      id: 1,
      name: 'Enviar Mensagem Humana',
      url: 'https://n8n.empresa.com/webhook/send-human-message',
      trigger: 'Envio de mensagem no chat',
      status: 'active',
      lastSent: '2024-01-15 14:30:22',
      totalRequests: 523,
      payload: {
        number: '{{contact.phone}}',
        text: '{{message.text}}',
        instance: '{{contact.instance_id}}'
      }
    },
    {
      id: 2,
      name: 'Pausar Bot',
      url: 'https://n8n.empresa.com/webhook/pause-bot',
      trigger: 'Clique no botão "Pausar Bot"',
      status: 'active',
      lastSent: '2024-01-15 13:45:10',
      totalRequests: 89,
      payload: {
        contact_id: '{{contact.phone}}'
      }
    },
    {
      id: 3,
      name: 'Reativar Bot',
      url: 'https://n8n.empresa.com/webhook/reactivate-bot',
      trigger: 'Clique no botão "Reativar Bot"',
      status: 'active',
      lastSent: '2024-01-15 12:20:33',
      totalRequests: 67,
      payload: {
        contact_id: '{{contact.phone}}'
      }
    },
    {
      id: 4,
      name: 'Etapa do Funil Alterada',
      url: 'https://n8n.empresa.com/webhook/pipeline-stage-changed',
      trigger: 'Movimentação de card no pipeline',
      status: 'active',
      lastSent: '2024-01-15 11:15:44',
      totalRequests: 156,
      payload: {
        contact_id: '{{contact.phone}}',
        deal_name: '{{deal.name}}',
        new_stage: '{{deal.stage_name}}'
      }
    }
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'incoming',
      webhook: 'Receber Mensagens WhatsApp',
      status: 'success',
      timestamp: '2024-01-15 14:32:15',
      responseTime: '125ms'
    },
    {
      id: 2,
      type: 'outgoing',
      webhook: 'Enviar Mensagem Humana',
      status: 'success',
      timestamp: '2024-01-15 14:30:22',
      responseTime: '89ms'
    },
    {
      id: 3,
      type: 'incoming',
      webhook: 'Receber Mensagens WhatsApp',
      status: 'success',
      timestamp: '2024-01-15 14:28:45',
      responseTime: '98ms'
    },
    {
      id: 4,
      type: 'outgoing',
      webhook: 'Pausar Bot',
      status: 'success',
      timestamp: '2024-01-15 13:45:10',
      responseTime: '156ms'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-success"><CheckCircle className="h-3 w-3 mr-1" />Ativo</Badge>;
      case 'inactive':
        return <Badge variant="secondary"><XCircle className="h-3 w-3 mr-1" />Inativo</Badge>;
      case 'error':
        return <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" />Erro</Badge>;
      default:
        return <Badge variant="outline">Desconhecido</Badge>;
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Toast notification could be added here
  };

  return (
    <MainLayout title="Webhooks">
      <div className="p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <ArrowDownCircle className="h-4 w-4 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold">{incomingWebhooks.length}</p>
                  <p className="text-xs text-muted-foreground">Webhooks de Entrada</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <ArrowUpCircle className="h-4 w-4 text-green-600" />
                <div>
                  <p className="text-2xl font-bold">{outgoingWebhooks.length}</p>
                  <p className="text-xs text-muted-foreground">Webhooks de Saída</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Activity className="h-4 w-4 text-whatsapp" />
                <div>
                  <p className="text-2xl font-bold">
                    {incomingWebhooks.reduce((sum, w) => sum + w.totalRequests, 0) + 
                     outgoingWebhooks.reduce((sum, w) => sum + w.totalRequests, 0)}
                  </p>
                  <p className="text-xs text-muted-foreground">Total de Requisições</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-success" />
                <div>
                  <p className="text-2xl font-bold">99.8%</p>
                  <p className="text-xs text-muted-foreground">Taxa de Sucesso</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Webhooks Management */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Webhook className="h-5 w-5 text-whatsapp" />
                    Gerenciar Webhooks
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="incoming" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="incoming" className="flex items-center gap-2">
                      <ArrowDownCircle className="h-4 w-4" />
                      Entrada
                    </TabsTrigger>
                    <TabsTrigger value="outgoing" className="flex items-center gap-2">
                      <ArrowUpCircle className="h-4 w-4" />
                      Saída
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="incoming" className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold">Webhooks de Entrada</h3>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="bg-whatsapp hover:bg-whatsapp-dark">
                            <Plus className="h-4 w-4 mr-2" />
                            Novo Webhook
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Novo Webhook de Entrada</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div>
                              <label className="text-sm font-medium">Nome do Webhook</label>
                              <Input placeholder="Ex: Receber Status WhatsApp" className="mt-1" />
                            </div>
                            <div>
                              <label className="text-sm font-medium">Descrição</label>
                              <Textarea placeholder="Descreva o que este webhook faz..." className="mt-1" />
                            </div>
                            <div>
                              <label className="text-sm font-medium">URL Gerada</label>
                              <div className="flex mt-1">
                                <Input 
                                  value="https://crm.empresa.com/webhook/abc123"
                                  disabled
                                  className="flex-1"
                                />
                                <Button variant="outline" size="icon" className="ml-2">
                                  <Copy className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                            <Button className="w-full bg-whatsapp hover:bg-whatsapp-dark">
                              Criar Webhook
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                    
                    <div className="space-y-4">
                      {incomingWebhooks.map((webhook) => (
                        <Card key={webhook.id} className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h4 className="font-medium">{webhook.name}</h4>
                              <p className="text-sm text-muted-foreground">{webhook.description}</p>
                            </div>
                            {getStatusBadge(webhook.status)}
                          </div>
                          
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center justify-between">
                              <span className="text-muted-foreground">URL:</span>
                              <div className="flex items-center space-x-2">
                                <code className="bg-muted px-2 py-1 rounded text-xs">
                                  {webhook.url}
                                </code>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="h-6 w-6 p-0"
                                  onClick={() => copyToClipboard(webhook.url)}
                                >
                                  <Copy className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-muted-foreground">Último recebido:</span>
                              <span>{webhook.lastReceived}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-muted-foreground">Total de requisições:</span>
                              <Badge variant="secondary">{webhook.totalRequests}</Badge>
                            </div>
                          </div>
                          
                          <div className="flex space-x-2 mt-3">
                            <Button variant="outline" size="sm">
                              <Edit className="h-3 w-3 mr-2" />
                              Editar
                            </Button>
                            <Button variant="outline" size="sm">
                              <Code className="h-3 w-3 mr-2" />
                              Mapeamentos
                            </Button>
                            <Button variant="outline" size="sm" className="text-destructive">
                              <Trash2 className="h-3 w-3 mr-2" />
                              Excluir
                            </Button>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="outgoing" className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold">Webhooks de Saída</h3>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="bg-whatsapp hover:bg-whatsapp-dark">
                            <Plus className="h-4 w-4 mr-2" />
                            Novo Webhook
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Novo Webhook de Saída</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div>
                              <label className="text-sm font-medium">Nome do Webhook</label>
                              <Input placeholder="Ex: Notificar n8n de Mudança" className="mt-1" />
                            </div>
                            <div>
                              <label className="text-sm font-medium">URL de Destino</label>
                              <Input placeholder="https://n8n.empresa.com/webhook/..." className="mt-1" />
                            </div>
                            <div>
                              <label className="text-sm font-medium">Gatilho</label>
                              <Select>
                                <SelectTrigger className="mt-1">
                                  <SelectValue placeholder="Selecione um gatilho" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="message_sent">Mensagem enviada</SelectItem>
                                  <SelectItem value="bot_paused">Bot pausado</SelectItem>
                                  <SelectItem value="bot_activated">Bot reativado</SelectItem>
                                  <SelectItem value="deal_moved">Negócio movido no pipeline</SelectItem>
                                  <SelectItem value="contact_updated">Contato atualizado</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <label className="text-sm font-medium">Payload JSON</label>
                              <Textarea 
                                placeholder='{\n  "contact_id": "{{contact.phone}}",\n  "action": "{{action}}"\n}'
                                className="mt-1 font-mono text-sm"
                                rows={6}
                              />
                            </div>
                            <Button className="w-full bg-whatsapp hover:bg-whatsapp-dark">
                              Criar Webhook
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                    
                    <div className="space-y-4">
                      {outgoingWebhooks.map((webhook) => (
                        <Card key={webhook.id} className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h4 className="font-medium">{webhook.name}</h4>
                              <p className="text-sm text-muted-foreground">
                                Gatilho: {webhook.trigger}
                              </p>
                            </div>
                            {getStatusBadge(webhook.status)}
                          </div>
                          
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center justify-between">
                              <span className="text-muted-foreground">URL:</span>
                              <div className="flex items-center space-x-2">
                                <code className="bg-muted px-2 py-1 rounded text-xs max-w-xs truncate">
                                  {webhook.url}
                                </code>
                                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                  <ExternalLink className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-muted-foreground">Último envio:</span>
                              <span>{webhook.lastSent}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-muted-foreground">Total enviado:</span>
                              <Badge variant="secondary">{webhook.totalRequests}</Badge>
                            </div>
                          </div>
                          
                          <div className="mt-3">
                            <details className="group">
                              <summary className="text-sm font-medium cursor-pointer flex items-center">
                                <Code className="h-3 w-3 mr-2" />
                                Ver Payload
                              </summary>
                              <pre className="mt-2 p-2 bg-muted rounded text-xs overflow-x-auto">
                                {JSON.stringify(webhook.payload, null, 2)}
                              </pre>
                            </details>
                          </div>
                          
                          <div className="flex space-x-2 mt-3">
                            <Button variant="outline" size="sm">
                              <Edit className="h-3 w-3 mr-2" />
                              Editar
                            </Button>
                            <Button variant="outline" size="sm">
                              <Settings className="h-3 w-3 mr-2" />
                              Testar
                            </Button>
                            <Button variant="outline" size="sm" className="text-destructive">
                              <Trash2 className="h-3 w-3 mr-2" />
                              Excluir
                            </Button>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-whatsapp" />
                  Atividade Recente
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center space-x-2">
                          {activity.type === 'incoming' ? (
                            <ArrowDownCircle className="h-4 w-4 text-blue-600" />
                          ) : (
                            <ArrowUpCircle className="h-4 w-4 text-green-600" />
                          )}
                          <span className="text-xs font-medium">
                            {activity.type === 'incoming' ? 'Entrada' : 'Saída'}
                          </span>
                        </div>
                        {getStatusBadge(activity.status)}
                      </div>
                      <p className="text-sm font-medium">{activity.webhook}</p>
                      <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                        <span>{activity.timestamp}</span>
                        <span>{activity.responseTime}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}