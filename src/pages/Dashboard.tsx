import React from 'react';
import { MainLayout } from '@/components/Layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  MessageSquare, 
  Users, 
  Bot, 
  TrendingUp, 
  Clock,
  CheckCircle2,
  AlertCircle,
  Zap
} from 'lucide-react';

export default function Dashboard() {
  const stats = [
    {
      title: 'Conversas Ativas',
      value: '47',
      change: '+12%',
      icon: MessageSquare,
      color: 'text-whatsapp'
    },
    {
      title: 'Contatos Totais',
      value: '1,234',
      change: '+23%',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'Bot Ativo',
      value: '89%',
      change: '+5%',
      icon: Bot,
      color: 'text-success'
    },
    {
      title: 'Taxa de Conversão',
      value: '15.6%',
      change: '+2.1%',
      icon: TrendingUp,
      color: 'text-orange-600'
    },
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'message',
      description: 'Nova mensagem de João Silva',
      time: '2 minutos atrás',
      status: 'active'
    },
    {
      id: 2,
      type: 'bot_paused',
      description: 'Bot pausado para Maria Santos',
      time: '5 minutos atrás',
      status: 'paused'
    },
    {
      id: 3,
      type: 'deal_moved',
      description: 'Pedro Costa movido para "Proposta"',
      time: '10 minutos atrás',
      status: 'success'
    },
    {
      id: 4,
      type: 'webhook_received',
      description: 'Webhook recebido do n8n',
      time: '15 minutos atrás',
      status: 'info'
    },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'message': return <MessageSquare className="h-4 w-4" />;
      case 'bot_paused': return <AlertCircle className="h-4 w-4" />;
      case 'deal_moved': return <CheckCircle2 className="h-4 w-4" />;
      case 'webhook_received': return <Zap className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active': return <Badge variant="default" className="bg-whatsapp">Ativo</Badge>;
      case 'paused': return <Badge variant="destructive">Pausado</Badge>;
      case 'success': return <Badge variant="default" className="bg-success">Sucesso</Badge>;
      case 'info': return <Badge variant="secondary">Info</Badge>;
      default: return <Badge variant="outline">Neutro</Badge>;
    }
  };

  return (
    <MainLayout title="Dashboard">
      <div className="p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-success">
                    {stat.change} desde o último mês
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Atividade Recente */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-whatsapp" />
                Atividade Recente
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center space-x-3">
                      <div className="text-muted-foreground">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{activity.description}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                    {getStatusBadge(activity.status)}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Status do Sistema */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-whatsapp" />
                Status do Sistema
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-success/10">
                <div className="flex items-center space-x-3">
                  <div className="h-3 w-3 rounded-full bg-success"></div>
                  <span className="text-sm font-medium">n8n Workflow</span>
                </div>
                <Badge variant="default" className="bg-success">Online</Badge>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-success/10">
                <div className="flex items-center space-x-3">
                  <div className="h-3 w-3 rounded-full bg-success"></div>
                  <span className="text-sm font-medium">WhatsApp API</span>
                </div>
                <Badge variant="default" className="bg-success">Conectado</Badge>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-success/10">
                <div className="flex items-center space-x-3">
                  <div className="h-3 w-3 rounded-full bg-success"></div>
                  <span className="text-sm font-medium">Redis Cache</span>
                </div>
                <Badge variant="default" className="bg-success">Operacional</Badge>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-success/10">
                <div className="flex items-center space-x-3">
                  <div className="h-3 w-3 rounded-full bg-success"></div>
                  <span className="text-sm font-medium">Supabase DB</span>
                </div>
                <Badge variant="default" className="bg-success">Conectado</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}