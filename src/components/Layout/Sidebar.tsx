import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  MessageSquare, 
  Users, 
  Workflow, 
  Settings, 
  BarChart3, 
  Webhook,
  Bot,
  Phone
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const navigation = [
  { name: 'Dashboard', href: '/', icon: BarChart3 },
  { name: 'Inbox', href: '/inbox', icon: MessageSquare },
  { name: 'Contatos', href: '/contacts', icon: Users },
  { name: 'Pipelines', href: '/pipelines', icon: Workflow },
  { name: 'Webhooks', href: '/webhooks', icon: Webhook },
  { name: 'Configurações', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <div className="flex h-full w-64 flex-col bg-card border-r border-border">
      {/* Logo */}
      <div className="flex h-16 items-center px-6 border-b border-border">
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Phone className="h-8 w-8 text-whatsapp" />
            <Bot className="h-4 w-4 text-primary absolute -top-1 -right-1 bg-card rounded-full p-0.5" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-whatsapp to-whatsapp-dark bg-clip-text text-transparent">
              CRM WhatsApp
            </h1>
            <p className="text-xs text-muted-foreground">Powered by n8n</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link key={item.name} to={item.href}>
              <Button
                variant={isActive ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3 font-medium",
                  isActive && "bg-whatsapp text-white hover:bg-whatsapp-dark"
                )}
              >
                <Icon className="h-5 w-5" />
                {item.name}
              </Button>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>v1.0.0</span>
          <div className="flex items-center space-x-1">
            <div className="h-2 w-2 rounded-full bg-success"></div>
            <span>Online</span>
          </div>
        </div>
      </div>
    </div>
  );
}