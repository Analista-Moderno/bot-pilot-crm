import React, { useState } from 'react';
import { MainLayout } from '@/components/Layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Settings as SettingsIcon, 
  User, 
  Shield, 
  Database, 
  Webhook,
  Bell,
  Palette,
  Globe,
  Key,
  CheckCircle,
  AlertCircle,
  Bot,
  Smartphone,
  Calendar
} from 'lucide-react';

export default function Settings() {
  const [notifications, setNotifications] = useState({
    newMessages: true,
    botPaused: true,
    dealMoved: false,
    webhookErrors: true,
    dailyReport: true
  });

  const [integrations] = useState([
    {
      name: 'n8n Workflow',
      type: 'automation',
      status: 'connected',
      description: 'Fluxo de automação principal',
      icon: Bot,
      lastSync: '2024-01-15 14:32:15'
    },
    {
      name: 'WhatsApp API',
      type: 'messaging',
      status: 'connected', 
      description: 'Evolution API para WhatsApp',
      icon: Smartphone,
      lastSync: '2024-01-15 14:31:45'
    },
    {
      name: 'Google Calendar',
      type: 'calendar',
      status: 'connected',
      description: 'Agendamentos automáticos',
      icon: Calendar,
      lastSync: '2024-01-15 14:30:12'
    },
    {
      name: 'Supabase',
      type: 'database',
      status: 'connected',
      description: 'Banco de dados principal', 
      icon: Database,
      lastSync: '2024-01-15 14:32:00'
    }
  ]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'connected':
        return <Badge className="bg-success"><CheckCircle className="h-3 w-3 mr-1" />Conectado</Badge>;
      case 'error':
        return <Badge variant="destructive"><AlertCircle className="h-3 w-3 mr-1" />Erro</Badge>;
      case 'disconnected':
        return <Badge variant="secondary">Desconectado</Badge>;
      default:
        return <Badge variant="outline">Desconhecido</Badge>;
    }
  };

  return (
    <MainLayout title="Configurações">
      <div className="p-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <SettingsIcon className="h-5 w-5 text-whatsapp" />
              Configurações do Sistema
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="profile" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Perfil
                </TabsTrigger>
                <TabsTrigger value="integrations" className="flex items-center gap-2">
                  <Webhook className="h-4 w-4" />
                  Integrações
                </TabsTrigger>
                <TabsTrigger value="notifications" className="flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  Notificações
                </TabsTrigger>
                <TabsTrigger value="security" className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Segurança
                </TabsTrigger>
                <TabsTrigger value="general" className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  Geral
                </TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="space-y-6 mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Informações Pessoais</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src="" />
                          <AvatarFallback className="bg-whatsapp text-white text-lg">
                            AD
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <Button variant="outline" size="sm">
                            Alterar Foto
                          </Button>
                          <p className="text-xs text-muted-foreground mt-1">
                            JPG, PNG ou GIF (max. 2MB)
                          </p>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="name">Nome Completo</Label>
                          <Input id="name" defaultValue="Admin User" className="mt-1" />
                        </div>
                        <div>
                          <Label htmlFor="email">E-mail</Label>
                          <Input id="email" type="email" defaultValue="admin@empresa.com" className="mt-1" />
                        </div>
                        <div>
                          <Label htmlFor="phone">Telefone</Label>
                          <Input id="phone" defaultValue="+55 11 99999-9999" className="mt-1" />
                        </div>
                        <div>
                          <Label htmlFor="position">Cargo</Label>
                          <Input id="position" defaultValue="Administrador" className="mt-1" />
                        </div>
                      </div>
                      
                      <Button className="w-full bg-whatsapp hover:bg-whatsapp-dark">
                        Salvar Alterações
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Preferências</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="language">Idioma</Label>
                        <select id="language" className="w-full mt-1 px-3 py-2 border border-border rounded-md">
                          <option>Português (BR)</option>
                          <option>English (US)</option>
                          <option>Español (ES)</option>
                        </select>
                      </div>
                      
                      <div>
                        <Label htmlFor="timezone">Fuso Horário</Label>
                        <select id="timezone" className="w-full mt-1 px-3 py-2 border border-border rounded-md">
                          <option>America/Sao_Paulo (UTC-3)</option>
                          <option>America/New_York (UTC-5)</option>
                          <option>Europe/London (UTC+0)</option>
                        </select>
                      </div>
                      
                      <div>
                        <Label htmlFor="date-format">Formato de Data</Label>
                        <select id="date-format" className="w-full mt-1 px-3 py-2 border border-border rounded-md">
                          <option>DD/MM/YYYY</option>
                          <option>MM/DD/YYYY</option>
                          <option>YYYY-MM-DD</option>
                        </select>
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Modo Escuro</Label>
                          <p className="text-sm text-muted-foreground">Tema escuro da interface</p>
                        </div>
                        <Switch />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Som das Notificações</Label>
                          <p className="text-sm text-muted-foreground">Reproduzir sons ao receber notificações</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="integrations" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Status das Integrações</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {integrations.map((integration, index) => {
                        const Icon = integration.icon;
                        return (
                          <Card key={index} className="p-4">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-center space-x-3">
                                <div className="p-2 bg-whatsapp/10 rounded-lg">
                                  <Icon className="h-5 w-5 text-whatsapp" />
                                </div>
                                <div>
                                  <h3 className="font-medium">{integration.name}</h3>
                                  <p className="text-sm text-muted-foreground">{integration.description}</p>
                                </div>
                              </div>
                              {getStatusBadge(integration.status)}
                            </div>
                            
                            <div className="text-xs text-muted-foreground mb-3">
                              Última sincronização: {integration.lastSync}
                            </div>
                            
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">
                                Configurar
                              </Button>
                              <Button variant="outline" size="sm">
                                Testar
                              </Button>
                            </div>
                          </Card>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Configuração do n8n</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="n8n-url">URL do n8n</Label>
                      <Input 
                        id="n8n-url" 
                        defaultValue="https://n8n.empresa.com" 
                        className="mt-1" 
                      />
                    </div>
                    <div>
                      <Label htmlFor="n8n-token">Token de API</Label>
                      <Input 
                        id="n8n-token" 
                        type="password" 
                        defaultValue="••••••••••••••••" 
                        className="mt-1" 
                      />
                    </div>
                    <Button variant="outline">
                      Testar Conexão
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notifications" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Preferências de Notificação</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Novas Mensagens</Label>
                        <p className="text-sm text-muted-foreground">Notificar quando receber novas mensagens</p>
                      </div>
                      <Switch 
                        checked={notifications.newMessages}
                        onCheckedChange={(checked) => setNotifications(prev => ({...prev, newMessages: checked}))}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Bot Pausado</Label>
                        <p className="text-sm text-muted-foreground">Notificar quando o bot for pausado</p>
                      </div>
                      <Switch 
                        checked={notifications.botPaused}
                        onCheckedChange={(checked) => setNotifications(prev => ({...prev, botPaused: checked}))}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Negócio Movido</Label>
                        <p className="text-sm text-muted-foreground">Notificar movimentações no pipeline</p>
                      </div>
                      <Switch 
                        checked={notifications.dealMoved}
                        onCheckedChange={(checked) => setNotifications(prev => ({...prev, dealMoved: checked}))}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Erros de Webhook</Label>
                        <p className="text-sm text-muted-foreground">Notificar falhas em webhooks</p>
                      </div>
                      <Switch 
                        checked={notifications.webhookErrors}
                        onCheckedChange={(checked) => setNotifications(prev => ({...prev, webhookErrors: checked}))}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Relatório Diário</Label>
                        <p className="text-sm text-muted-foreground">Receber resumo diário por e-mail</p>
                      </div>
                      <Switch 
                        checked={notifications.dailyReport}
                        onCheckedChange={(checked) => setNotifications(prev => ({...prev, dailyReport: checked}))}
                      />
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <Label htmlFor="email-notifications">E-mail para Notificações</Label>
                      <Input 
                        id="email-notifications" 
                        type="email" 
                        defaultValue="admin@empresa.com" 
                        className="mt-1" 
                      />
                    </div>
                    
                    <Button className="w-full bg-whatsapp hover:bg-whatsapp-dark">
                      Salvar Preferências
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="security" className="space-y-6 mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Alterar Senha</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="current-password">Senha Atual</Label>
                        <Input id="current-password" type="password" className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="new-password">Nova Senha</Label>
                        <Input id="new-password" type="password" className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
                        <Input id="confirm-password" type="password" className="mt-1" />
                      </div>
                      <Button className="w-full bg-whatsapp hover:bg-whatsapp-dark">
                        Alterar Senha
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Chaves de API</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="p-3 bg-muted rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">Chave Principal</span>
                          <Badge variant="outline">Ativa</Badge>
                        </div>
                        <code className="text-sm break-all">crm_live_sk_abc123...</code>
                        <p className="text-xs text-muted-foreground mt-1">
                          Criada em 15/01/2024
                        </p>
                      </div>
                      
                      <Button variant="outline" className="w-full">
                        <Key className="h-4 w-4 mr-2" />
                        Gerar Nova Chave
                      </Button>
                      
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Autenticação de Dois Fatores</Label>
                          <p className="text-sm text-muted-foreground">Adicionar camada extra de segurança</p>
                        </div>
                        <Switch />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Log de Auditoria</Label>
                          <p className="text-sm text-muted-foreground">Registrar todas as ações do sistema</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="general" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Configurações Gerais</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label htmlFor="company-name">Nome da Empresa</Label>
                      <Input id="company-name" defaultValue="Minha Empresa LTDA" className="mt-1" />
                    </div>
                    
                    <div>
                      <Label htmlFor="company-website">Website</Label>
                      <Input id="company-website" defaultValue="https://empresa.com" className="mt-1" />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Backup Automático</Label>
                        <p className="text-sm text-muted-foreground">Fazer backup diário dos dados</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Analytics</Label>
                        <p className="text-sm text-muted-foreground">Coletar dados de uso anônimos</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Auto-updates</Label>
                        <p className="text-sm text-muted-foreground">Atualizar sistema automaticamente</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <Label>Fuso Horário do Sistema</Label>
                      <select className="w-full mt-1 px-3 py-2 border border-border rounded-md">
                        <option>America/Sao_Paulo (UTC-3)</option>
                        <option>America/New_York (UTC-5)</option>
                        <option>Europe/London (UTC+0)</option>
                      </select>
                    </div>
                    
                    <Button className="w-full bg-whatsapp hover:bg-whatsapp-dark">
                      Salvar Configurações
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}