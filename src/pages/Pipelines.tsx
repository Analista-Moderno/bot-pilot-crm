import React, { useState } from 'react';
import { MainLayout } from '@/components/Layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Workflow, 
  Plus, 
  DollarSign,
  Users,
  TrendingUp,
  Calendar,
  Phone,
  Mail,
  MoreHorizontal,
  Edit,
  Trash2
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface Deal {
  id: number;
  name: string;
  company: string;
  value: number;
  contact: string;
  phone: string;
  email: string;
  avatar: string;
  lastUpdate: string;
  probability: number;
}

interface Stage {
  id: string;
  name: string;
  color: string;
  deals: Deal[];
}

export default function Pipelines() {
  const [stages] = useState<Stage[]>([
    {
      id: 'leads',
      name: 'Leads',
      color: 'bg-blue-500',
      deals: [
        {
          id: 1,
          name: 'Sistema de Gestão',
          company: 'TechCorp',
          value: 15000,
          contact: 'João Silva',
          phone: '+55 11 99999-9999',
          email: 'joao@techcorp.com',
          avatar: 'JS',
          lastUpdate: '2024-01-15',
          probability: 20
        },
        {
          id: 2,
          name: 'Plataforma E-commerce',
          company: 'Digital Store',
          value: 25000,
          contact: 'Maria Santos',
          phone: '+55 11 88888-8888',
          email: 'maria@digitalstore.com',
          avatar: 'MS',
          lastUpdate: '2024-01-14',
          probability: 15
        }
      ]
    },
    {
      id: 'qualified',
      name: 'Qualificados',
      color: 'bg-yellow-500',
      deals: [
        {
          id: 3,
          name: 'CRM Personalizado',
          company: 'StartupXYZ',
          value: 35000,
          contact: 'Pedro Costa',
          phone: '+55 11 77777-7777',
          email: 'pedro@startupxyz.com',
          avatar: 'PC',
          lastUpdate: '2024-01-13',
          probability: 45
        }
      ]
    },
    {
      id: 'proposal',
      name: 'Proposta',
      color: 'bg-orange-500',
      deals: [
        {
          id: 4,
          name: 'Automação WhatsApp',
          company: 'Marketing Pro',
          value: 20000,
          contact: 'Ana Oliveira',
          phone: '+55 11 66666-6666',
          email: 'ana@marketingpro.com',
          avatar: 'AO',
          lastUpdate: '2024-01-12',
          probability: 70
        }
      ]
    },
    {
      id: 'negotiation',
      name: 'Negociação',
      color: 'bg-purple-500',
      deals: [
        {
          id: 5,
          name: 'Integração Completa',
          company: 'Enterprise Ltd',
          value: 50000,
          contact: 'Carlos Silva',
          phone: '+55 11 55555-5555',
          email: 'carlos@enterprise.com',
          avatar: 'CS',
          lastUpdate: '2024-01-11',
          probability: 80
        }
      ]
    },
    {
      id: 'closed',
      name: 'Fechados',
      color: 'bg-green-500',
      deals: [
        {
          id: 6,
          name: 'Dashboard Analytics',
          company: 'Data Insights',
          value: 18000,
          contact: 'Lucia Mendes',
          phone: '+55 11 44444-4444',
          email: 'lucia@datainsights.com',
          avatar: 'LM',
          lastUpdate: '2024-01-10',
          probability: 100
        }
      ]
    }
  ]);

  const totalValue = stages.reduce((total, stage) => 
    total + stage.deals.reduce((stageTotal, deal) => stageTotal + deal.value, 0), 0
  );

  const totalDeals = stages.reduce((total, stage) => total + stage.deals.length, 0);

  const weightedValue = stages.reduce((total, stage) => 
    total + stage.deals.reduce((stageTotal, deal) => 
      stageTotal + (deal.value * deal.probability / 100), 0
    ), 0
  );

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <MainLayout title="Pipelines">
      <div className="p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <DollarSign className="h-4 w-4 text-green-600" />
                <div>
                  <p className="text-2xl font-bold">{formatCurrency(totalValue)}</p>
                  <p className="text-xs text-muted-foreground">Valor Total</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold">{formatCurrency(weightedValue)}</p>
                  <p className="text-xs text-muted-foreground">Valor Ponderado</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Workflow className="h-4 w-4 text-purple-600" />
                <div>
                  <p className="text-2xl font-bold">{totalDeals}</p>
                  <p className="text-xs text-muted-foreground">Negócios Ativos</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-orange-600" />
                <div>
                  <p className="text-2xl font-bold">
                    {Math.round(weightedValue / totalValue * 100)}%
                  </p>
                  <p className="text-xs text-muted-foreground">Taxa de Conversão</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pipeline Kanban */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Workflow className="h-5 w-5 text-whatsapp" />
                Funil de Vendas
              </CardTitle>
              <Button className="bg-whatsapp hover:bg-whatsapp-dark flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Novo Negócio
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-6 overflow-x-auto pb-4">
              {stages.map((stage) => (
                <div key={stage.id} className="flex-shrink-0 w-72">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <div className={cn("h-3 w-3 rounded-full", stage.color)}></div>
                      <h3 className="font-semibold">{stage.name}</h3>
                      <Badge variant="secondary" className="text-xs">
                        {stage.deals.length}
                      </Badge>
                    </div>
                    <span className="text-sm font-medium text-muted-foreground">
                      {formatCurrency(
                        stage.deals.reduce((total, deal) => total + deal.value, 0)
                      )}
                    </span>
                  </div>

                  <div className="space-y-3">
                    {stage.deals.map((deal) => (
                      <Card key={deal.id} className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                        <div className="space-y-3">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-medium text-sm">{deal.name}</h4>
                              <p className="text-xs text-muted-foreground">{deal.company}</p>
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                  <MoreHorizontal className="h-3 w-3" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Edit className="mr-2 h-3 w-3" />
                                  Editar
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">
                                  <Trash2 className="mr-2 h-3 w-3" />
                                  Excluir
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Avatar className="h-6 w-6">
                              <AvatarFallback className="bg-whatsapp text-white text-xs">
                                {deal.avatar}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-medium truncate">{deal.contact}</p>
                              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                                <Phone className="h-3 w-3" />
                                <span className="truncate">{deal.phone}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-sm font-bold text-success">
                              {formatCurrency(deal.value)}
                            </span>
                            <Badge variant="outline" className="text-xs">
                              {deal.probability}%
                            </Badge>
                          </div>

                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-3 w-3" />
                              <span>{new Date(deal.lastUpdate).toLocaleDateString('pt-BR')}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Mail className="h-3 w-3" />
                              <span className="truncate max-w-20">{deal.email}</span>
                            </div>
                          </div>

                          {/* Progress bar */}
                          <div className="w-full bg-muted rounded-full h-1.5">
                            <div 
                              className={cn("h-1.5 rounded-full", stage.color)}
                              style={{ width: `${deal.probability}%` }}
                            ></div>
                          </div>
                        </div>
                      </Card>
                    ))}

                    {stage.deals.length === 0 && (
                      <div className="border-2 border-dashed border-muted rounded-lg p-4 text-center">
                        <p className="text-sm text-muted-foreground">
                          Nenhum negócio nesta etapa
                        </p>
                      </div>
                    )}

                    <Button 
                      variant="ghost" 
                      className="w-full border-2 border-dashed border-muted hover:border-whatsapp hover:text-whatsapp"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Adicionar Negócio
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}