import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import Icon from '@/components/ui/icon';

interface Order {
  id: string;
  services: string[];
  totalCost: number;
  status: 'pending' | 'processing' | 'ready' | 'completed';
  createdAt: string;
  readyAt?: string;
}

interface DashboardProps {
  user: any;
  onLogout: () => void;
}

const mockOrders: Order[] = [
  {
    id: 'ORD-2024-001',
    services: ['Чистка костюма', 'Удаление пятен'],
    totalCost: 3700,
    status: 'ready',
    createdAt: '2024-10-25',
    readyAt: '2024-10-27'
  },
  {
    id: 'ORD-2024-002',
    services: ['Химчистка штор'],
    totalCost: 2800,
    status: 'processing',
    createdAt: '2024-10-28',
  },
  {
    id: 'ORD-2024-003',
    services: ['Уход за обувью'],
    totalCost: 1800,
    status: 'completed',
    createdAt: '2024-10-20',
    readyAt: '2024-10-23'
  }
];

const statusConfig = {
  pending: { label: 'Принят', color: 'bg-blue-500', icon: 'Clock' },
  processing: { label: 'В работе', color: 'bg-yellow-500', icon: 'Loader' },
  ready: { label: 'Готов', color: 'bg-green-500', icon: 'CheckCircle' },
  completed: { label: 'Выдан', color: 'bg-gray-500', icon: 'Package' }
};

export default function Dashboard({ user, onLogout }: DashboardProps) {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [bonusPoints, setBonusPoints] = useState(450);
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true
  });
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: ''
  });

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getStatusProgress = (status: Order['status']) => {
    const progressMap = {
      pending: 25,
      processing: 50,
      ready: 75,
      completed: 100
    };
    return progressMap[status];
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Icon name="Sparkles" size={32} className="text-primary" />
            <div>
              <h1 className="text-xl font-bold">Чистота и Блеск</h1>
              <p className="text-xs text-muted-foreground">Личный кабинет</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => window.location.href = '/'}>
              <Icon name="Home" size={18} className="mr-2" />
              На главную
            </Button>
            <Button variant="ghost" onClick={onLogout}>
              <Icon name="LogOut" size={18} className="mr-2" />
              Выйти
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-[280px_1fr] gap-6">
          <aside className="space-y-4">
            <Card>
              <CardHeader className="text-center pb-4">
                <Avatar className="w-20 h-20 mx-auto mb-4">
                  <AvatarFallback className="text-2xl bg-primary text-white">
                    {getInitials(user?.name || 'User')}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-lg">{user?.name}</CardTitle>
                <CardDescription className="text-xs">{user?.email}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Icon name="Gift" size={20} className="text-primary" />
                    <span className="font-semibold">Бонусы</span>
                  </div>
                  <span className="text-xl font-bold text-primary">{bonusPoints}</span>
                </div>
                <p className="text-xs text-muted-foreground text-center">
                  {bonusPoints} бонусов = {bonusPoints * 10} ₽
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <Icon name="Award" size={16} />
                  Достижения
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <Icon name="Star" size={18} className="text-yellow-500" />
                  <span className="text-sm">Постоянный клиент</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Zap" size={18} className="text-blue-500" />
                  <span className="text-sm">5+ заказов</span>
                </div>
              </CardContent>
            </Card>
          </aside>

          <main>
            <Tabs defaultValue="orders" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-6">
                <TabsTrigger value="orders">
                  <Icon name="Package" size={16} className="mr-2" />
                  Заказы
                </TabsTrigger>
                <TabsTrigger value="profile">
                  <Icon name="User" size={16} className="mr-2" />
                  Профиль
                </TabsTrigger>
                <TabsTrigger value="bonuses">
                  <Icon name="Gift" size={16} className="mr-2" />
                  Бонусы
                </TabsTrigger>
                <TabsTrigger value="settings">
                  <Icon name="Settings" size={16} className="mr-2" />
                  Настройки
                </TabsTrigger>
              </TabsList>

              <TabsContent value="orders" className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h2 className="text-2xl font-bold">Мои заказы</h2>
                    <p className="text-muted-foreground">История и текущие заказы</p>
                  </div>
                  <Button onClick={() => window.location.href = '/#booking'}>
                    <Icon name="Plus" size={18} className="mr-2" />
                    Новый заказ
                  </Button>
                </div>

                {orders.map((order) => {
                  const config = statusConfig[order.status];
                  return (
                    <Card key={order.id} className="hover:shadow-md transition-shadow">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg flex items-center gap-2">
                              <Icon name="FileText" size={18} />
                              Заказ {order.id}
                            </CardTitle>
                            <CardDescription className="mt-1">
                              Создан: {new Date(order.createdAt).toLocaleDateString('ru-RU')}
                            </CardDescription>
                          </div>
                          <Badge className={`${config.color} text-white`}>
                            <Icon name={config.icon as any} size={14} className="mr-1" />
                            {config.label}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <p className="text-sm font-semibold mb-2">Услуги:</p>
                          <ul className="space-y-1">
                            {order.services.map((service, idx) => (
                              <li key={idx} className="text-sm flex items-center gap-2">
                                <Icon name="Check" size={14} className="text-primary" />
                                {service}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span>Прогресс заказа</span>
                            <span className="font-semibold">{getStatusProgress(order.status)}%</span>
                          </div>
                          <Progress value={getStatusProgress(order.status)} />
                        </div>
                        {order.readyAt && (
                          <p className="text-sm text-muted-foreground">
                            <Icon name="Calendar" size={14} className="inline mr-1" />
                            Готовность: {new Date(order.readyAt).toLocaleDateString('ru-RU')}
                          </p>
                        )}
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <div className="text-2xl font-bold text-primary">{order.totalCost} ₽</div>
                        <div className="space-x-2">
                          {order.status === 'ready' && (
                            <Button>
                              <Icon name="QrCode" size={18} className="mr-2" />
                              QR-код
                            </Button>
                          )}
                          <Button variant="outline">
                            <Icon name="Eye" size={18} className="mr-2" />
                            Детали
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  );
                })}
              </TabsContent>

              <TabsContent value="profile" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Личные данные</CardTitle>
                    <CardDescription>Управление профилем и контактной информацией</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="profile-name">ФИО</Label>
                      <Input
                        id="profile-name"
                        value={profileData.name}
                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="profile-email">Email</Label>
                      <Input
                        id="profile-email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="profile-phone">Телефон</Label>
                      <Input
                        id="profile-phone"
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="profile-address">Адрес доставки</Label>
                      <Input
                        id="profile-address"
                        placeholder="г. Москва, ул. Примерная, д. 1, кв. 10"
                        value={profileData.address}
                        onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button>
                      <Icon name="Save" size={18} className="mr-2" />
                      Сохранить изменения
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="bonuses" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="Gift" size={24} className="text-primary" />
                      Бонусная программа
                    </CardTitle>
                    <CardDescription>Копите бонусы и получайте скидки на услуги</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="text-center p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-2">Ваш баланс</p>
                      <p className="text-5xl font-bold text-primary mb-2">{bonusPoints}</p>
                      <p className="text-lg text-muted-foreground">= {bonusPoints * 10} рублей</p>
                    </div>

                    <div className="space-y-3">
                      <h3 className="font-semibold">Как это работает:</h3>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Icon name="ShoppingCart" size={16} className="text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">5% от суммы заказа</p>
                          <p className="text-sm text-muted-foreground">За каждый заказ начисляются бонусы</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Icon name="Wallet" size={16} className="text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">1 бонус = 10 рублей</p>
                          <p className="text-sm text-muted-foreground">Используйте при следующем заказе</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Icon name="Percent" size={16} className="text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">До 50% оплаты</p>
                          <p className="text-sm text-muted-foreground">Оплачивайте до половины заказа бонусами</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>История бонусов</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Icon name="Plus" size={18} className="text-green-500" />
                          <div>
                            <p className="font-medium">Начислено</p>
                            <p className="text-sm text-muted-foreground">Заказ ORD-2024-001</p>
                          </div>
                        </div>
                        <span className="text-green-500 font-semibold">+185</span>
                      </div>
                      <div className="flex justify-between items-center p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Icon name="Plus" size={18} className="text-green-500" />
                          <div>
                            <p className="font-medium">Начислено</p>
                            <p className="text-sm text-muted-foreground">Заказ ORD-2024-002</p>
                          </div>
                        </div>
                        <span className="text-green-500 font-semibold">+140</span>
                      </div>
                      <div className="flex justify-between items-center p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Icon name="Minus" size={18} className="text-red-500" />
                          <div>
                            <p className="font-medium">Использовано</p>
                            <p className="text-sm text-muted-foreground">Заказ ORD-2024-003</p>
                          </div>
                        </div>
                        <span className="text-red-500 font-semibold">-50</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Уведомления</CardTitle>
                    <CardDescription>Управление способами получения уведомлений</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="notif-email" className="text-base">Email уведомления</Label>
                        <p className="text-sm text-muted-foreground">Получать обновления на почту</p>
                      </div>
                      <Switch
                        id="notif-email"
                        checked={notifications.email}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="notif-sms" className="text-base">SMS уведомления</Label>
                        <p className="text-sm text-muted-foreground">Получать SMS о статусе заказа</p>
                      </div>
                      <Switch
                        id="notif-sms"
                        checked={notifications.sms}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, sms: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="notif-push" className="text-base">Push уведомления</Label>
                        <p className="text-sm text-muted-foreground">Получать push в браузере</p>
                      </div>
                      <Switch
                        id="notif-push"
                        checked={notifications.push}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Безопасность</CardTitle>
                    <CardDescription>Управление паролем и доступом к аккаунту</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button variant="outline" className="w-full justify-start">
                      <Icon name="Lock" size={18} className="mr-2" />
                      Изменить пароль
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Icon name="Smartphone" size={18} className="mr-2" />
                      Настроить двухфакторную аутентификацию
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-red-500 hover:text-red-600">
                      <Icon name="Trash2" size={18} className="mr-2" />
                      Удалить аккаунт
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </div>
  );
}
