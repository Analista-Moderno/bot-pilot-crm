import React, { useState } from 'react';
import { MainLayout } from '@/components/Layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  Users, 
  Search, 
  Plus, 
  Filter,
  MoreHorizontal,
  Bot,
  User,
  MessageSquare,
  Phone,
  Calendar,
  Edit,
  Trash2
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Contacts() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const contacts = [
    {
      id: 1,
      name: 'João Silva',
      phone: '+55 11 99999-9999',
      email: 'joao@empresa.com',
      niche: 'E-commerce',
      revenue: 'R$ 50.000/mês',
      botStatus: 'active',
      lastContact: '2024-01-15',
      totalMessages: 47,
      stage: 'Qualificado',
      avatar: 'JS'
    },
    {
      id: 2,
      name: 'Maria Santos',
      phone: '+55 11 88888-8888',
      email: 'maria@loja.com',
      niche: 'Varejo',
      revenue: 'R$ 25.000/mês',
      botStatus: 'paused',
      lastContact: '2024-01-14',
      totalMessages: 23,
      stage: 'Proposta',
      avatar: 'MS'
    },
    {
      id: 3,
      name: 'Pedro Costa',
      phone: '+55 11 77777-7777',
      email: 'pedro@startup.com',
      niche: 'SaaS',
      revenue: 'R$ 100.000/mês',
      botStatus: 'active',
      lastContact: '2024-01-13',
      totalMessages: 12,
      stage: 'Lead',
      avatar: 'PC'
    },
    {
      id: 4,
      name: 'Ana Oliveira',
      phone: '+55 11 66666-6666',
      email: 'ana@consultoria.com',
      niche: 'Consultoria',
      revenue: 'R$ 75.000/mês',
      botStatus: 'active',
      lastContact: '2024-01-12',
      totalMessages: 8,
      stage: 'Negociação',
      avatar: 'AO'
    },
  ];

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'Lead': return 'bg-blue-100 text-blue-800';
      case 'Qualificado': return 'bg-yellow-100 text-yellow-800';
      case 'Proposta': return 'bg-orange-100 text-orange-800';
      case 'Negociação': return 'bg-purple-100 text-purple-800';
      case 'Fechado': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.phone.includes(searchTerm) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.niche.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <MainLayout title="Contatos">
      <div className="p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold">{contacts.length}</p>
                  <p className="text-xs text-muted-foreground">Total de Contatos</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Bot className="h-4 w-4 text-success" />
                <div>
                  <p className="text-2xl font-bold">
                    {contacts.filter(c => c.botStatus === 'active').length}
                  </p>
                  <p className="text-xs text-muted-foreground">Bot Ativo</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-orange-600" />
                <div>
                  <p className="text-2xl font-bold">
                    {contacts.filter(c => c.botStatus === 'paused').length}
                  </p>
                  <p className="text-xs text-muted-foreground">Atend. Humano</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-4 w-4 text-whatsapp" />
                <div>
                  <p className="text-2xl font-bold">
                    {contacts.reduce((sum, c) => sum + c.totalMessages, 0)}
                  </p>
                  <p className="text-xs text-muted-foreground">Mensagens Totais</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Actions */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-whatsapp" />
                Lista de Contatos
              </CardTitle>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Buscar contatos..." 
                    className="pl-10 w-80"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Filtros
                </Button>
                <Button className="bg-whatsapp hover:bg-whatsapp-dark flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Novo Contato
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Contato</TableHead>
                  <TableHead>Telefone</TableHead>
                  <TableHead>Nicho</TableHead>
                  <TableHead>Faturamento</TableHead>
                  <TableHead>Status Bot</TableHead>
                  <TableHead>Etapa</TableHead>
                  <TableHead>Mensagens</TableHead>
                  <TableHead>Último Contato</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredContacts.map((contact) => (
                  <TableRow key={contact.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-whatsapp text-white text-xs">
                            {contact.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{contact.name}</p>
                          <p className="text-sm text-muted-foreground">{contact.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Phone className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm">{contact.phone}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{contact.niche}</Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm font-medium text-success">
                        {contact.revenue}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <div className={cn(
                          "h-2 w-2 rounded-full",
                          contact.botStatus === 'active' ? "bg-bot-active" : "bg-bot-paused"
                        )}></div>
                        <span className="text-sm">
                          {contact.botStatus === 'active' ? 'Ativo' : 'Pausado'}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant="secondary" 
                        className={getStageColor(contact.stage)}
                      >
                        {contact.stage}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <MessageSquare className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm">{contact.totalMessages}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm">
                          {new Date(contact.lastContact).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <MessageSquare className="mr-2 h-4 w-4" />
                            Iniciar Chat
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Excluir
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}