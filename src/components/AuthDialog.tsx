import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: (userData: any) => void;
}

export default function AuthDialog({ open, onOpenChange, onSuccess }: AuthDialogProps) {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const userData = {
      name: loginData.email.split('@')[0],
      email: loginData.email,
      phone: '+7 (999) 123-45-67',
      registeredAt: new Date().toISOString()
    };
    localStorage.setItem('user', JSON.stringify(userData));
    onSuccess(userData);
    onOpenChange(false);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (registerData.password !== registerData.confirmPassword) {
      alert('Пароли не совпадают!');
      return;
    }
    const userData = {
      name: registerData.name,
      email: registerData.email,
      phone: registerData.phone,
      registeredAt: new Date().toISOString()
    };
    localStorage.setItem('user', JSON.stringify(userData));
    onSuccess(userData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <Icon name="User" size={24} className="text-primary" />
            Личный кабинет
          </DialogTitle>
          <DialogDescription>
            Войдите или зарегистрируйтесь для управления заказами
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Вход</TabsTrigger>
            <TabsTrigger value="register">Регистрация</TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="space-y-4 mt-4">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-email">Email или телефон</Label>
                <Input
                  id="login-email"
                  type="email"
                  placeholder="example@mail.ru"
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="login-password">Пароль</Label>
                <Input
                  id="login-password"
                  type="password"
                  placeholder="••••••••"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  required
                />
              </div>
              <button type="button" className="text-sm text-primary hover:underline">
                Забыли пароль?
              </button>
              <Button type="submit" className="w-full" size="lg">
                <Icon name="LogIn" size={18} className="mr-2" />
                Войти
              </Button>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Или войти через</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" type="button">
                  <Icon name="MessageCircle" size={18} className="mr-2" />
                  VK
                </Button>
                <Button variant="outline" type="button">
                  <Icon name="Mail" size={18} className="mr-2" />
                  Google
                </Button>
              </div>
            </form>
          </TabsContent>

          <TabsContent value="register" className="space-y-4 mt-4">
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="register-name">ФИО *</Label>
                <Input
                  id="register-name"
                  placeholder="Иван Иванов"
                  value={registerData.name}
                  onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-email">Email *</Label>
                <Input
                  id="register-email"
                  type="email"
                  placeholder="example@mail.ru"
                  value={registerData.email}
                  onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-phone">Телефон *</Label>
                <Input
                  id="register-phone"
                  type="tel"
                  placeholder="+7 (999) 123-45-67"
                  value={registerData.phone}
                  onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-password">Пароль *</Label>
                <Input
                  id="register-password"
                  type="password"
                  placeholder="••••••••"
                  value={registerData.password}
                  onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-confirm-password">Подтвердите пароль *</Label>
                <Input
                  id="register-confirm-password"
                  type="password"
                  placeholder="••••••••"
                  value={registerData.confirmPassword}
                  onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                  required
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Регистрируясь, вы соглашаетесь с{' '}
                <button type="button" className="text-primary hover:underline">
                  политикой конфиденциальности
                </button>
              </p>
              <Button type="submit" className="w-full" size="lg">
                <Icon name="UserPlus" size={18} className="mr-2" />
                Зарегистрироваться
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
