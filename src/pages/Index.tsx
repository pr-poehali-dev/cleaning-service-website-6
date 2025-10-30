import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import Icon from '@/components/ui/icon';
import AuthDialog from '@/components/AuthDialog';

const services = [
  {
    id: 1,
    name: 'Чистка костюмов',
    description: 'Профессиональная чистка мужских и женских костюмов',
    price: 2500,
    duration: '48 часов',
    icon: 'Shirt'
  },
  {
    id: 2,
    name: 'Удаление сложных пятен',
    description: 'Эффективное удаление даже самых сложных загрязнений',
    price: 1200,
    duration: '24 часа',
    icon: 'Droplet'
  },
  {
    id: 3,
    name: 'Уход за обувью',
    description: 'Чистка, восстановление цвета и защита обуви',
    price: 1800,
    duration: '72 часа',
    icon: 'footprints'
  },
  {
    id: 4,
    name: 'Чистка верхней одежды',
    description: 'Пальто, куртки, пуховики - бережная чистка',
    price: 3200,
    duration: '72 часа',
    icon: 'Wind'
  },
  {
    id: 5,
    name: 'Химчистка штор',
    description: 'Профессиональная чистка штор любого типа',
    price: 2800,
    duration: '5 дней',
    icon: 'Home'
  },
  {
    id: 6,
    name: 'Чистка свадебных платьев',
    description: 'Деликатная чистка с сохранением всех деталей',
    price: 5500,
    duration: '7 дней',
    icon: 'Heart'
  }
];

const steps = [
  {
    number: 1,
    title: 'Выберите услугу',
    description: 'Изучите наш каталог и выберите нужные услуги',
    icon: 'Search'
  },
  {
    number: 2,
    title: 'Оформите заявку',
    description: 'Заполните форму онлайн или позвоните нам',
    icon: 'FileText'
  },
  {
    number: 3,
    title: 'Сдайте вещи',
    description: 'Принесите вещи в наш офис или закажите курьера',
    icon: 'Package'
  },
  {
    number: 4,
    title: 'Получите результат',
    description: 'Заберите чистые вещи в указанный срок',
    icon: 'CheckCircle'
  }
];

const reviews = [
  {
    name: 'Анна Петрова',
    rating: 5,
    text: 'Отличная химчистка! Вывели пятно с белого платья, которое я считала безнадежным. Быстро и качественно!',
    date: '2 недели назад'
  },
  {
    name: 'Михаил Соколов',
    rating: 5,
    text: 'Постоянно пользуюсь услугами для чистки костюмов. Всегда довольен результатом, цены адекватные.',
    date: '1 месяц назад'
  },
  {
    name: 'Елена Волкова',
    rating: 5,
    text: 'Привела в порядок зимнее пальто после сезона. Вернули как новое! Спасибо большое команде.',
    date: '3 недели назад'
  }
];

interface IndexProps {
  user: any;
  onUserChange: (user: any) => void;
}

export default function Index({ user, onUserChange }: IndexProps) {
  const navigate = useNavigate();
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [selectedServices, setSelectedServices] = useState<number[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    time: '',
    comment: ''
  });

  const handleAuthSuccess = (userData: any) => {
    onUserChange(userData);
    navigate('/dashboard');
  };

  const toggleService = (serviceId: number) => {
    setSelectedServices(prev =>
      prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const totalCost = selectedServices.reduce((sum, id) => {
    const service = services.find(s => s.id === id);
    return sum + (service?.price || 0);
  }, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Спасибо за заявку! Мы свяжемся с вами в ближайшее время.');
  };

  return (
    <div className="min-h-screen">
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Icon name="Sparkles" size={32} className="text-primary" />
            <div>
              <h1 className="text-xl font-bold">Чистота и Блеск</h1>
              <p className="text-xs text-muted-foreground">Химчистка премиум-класса</p>
            </div>
          </div>
          <nav className="hidden md:flex gap-6">
            <a href="#services" className="hover:text-primary transition-colors">Услуги</a>
            <a href="#how-it-works" className="hover:text-primary transition-colors">Как работает</a>
            <a href="#reviews" className="hover:text-primary transition-colors">Отзывы</a>
            <a href="#contacts" className="hover:text-primary transition-colors">Контакты</a>
          </nav>
          <div className="flex items-center gap-2">
            {user ? (
              <Button onClick={() => navigate('/dashboard')}>
                <Icon name="User" size={18} className="mr-2" />
                Личный кабинет
              </Button>
            ) : (
              <Button onClick={() => setAuthDialogOpen(true)}>
                <Icon name="LogIn" size={18} className="mr-2" />
                Войти
              </Button>
            )}
          </div>
        </div>
      </header>

      <section className="pt-32 pb-20 bg-gradient-to-br from-primary/5 via-background to-primary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <Badge className="mb-4" variant="secondary">
              <Icon name="Award" size={14} className="mr-1" />
              Экспресс-чистка за 24 часа
            </Badge>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Доверьте чистоту профессионалам!
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Бережная обработка деликатных тканей, современное оборудование и экологичные средства
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="gap-2" onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}>
                <Icon name="CalendarCheck" size={20} />
                Заказать услугу
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                <Icon name="MessageCircle" size={20} />
                Связаться с нами
              </Button>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mt-16">
              <Card className="border-2 hover:border-primary transition-colors">
                <CardHeader className="text-center">
                  <Icon name="Clock" size={40} className="mx-auto mb-2 text-primary" />
                  <CardTitle className="text-lg">Быстро</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Экспресс-чистка от 24 часов</p>
                </CardContent>
              </Card>
              <Card className="border-2 hover:border-primary transition-colors">
                <CardHeader className="text-center">
                  <Icon name="Shield" size={40} className="mx-auto mb-2 text-primary" />
                  <CardTitle className="text-lg">Безопасно</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Экологичные средства</p>
                </CardContent>
              </Card>
              <Card className="border-2 hover:border-primary transition-colors">
                <CardHeader className="text-center">
                  <Icon name="Star" size={40} className="mx-auto mb-2 text-primary" />
                  <CardTitle className="text-lg">Качественно</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">15 лет опыта работы</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <Badge className="mb-4">Наши услуги</Badge>
            <h2 className="text-4xl font-bold mb-4">Каталог услуг</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Профессиональная химчистка для любого типа одежды и текстиля
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <Card key={service.id} className="hover:shadow-lg transition-all hover:-translate-y-1 animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Icon name={service.icon as any} size={24} className="text-primary" />
                  </div>
                  <CardTitle>{service.name}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-2xl font-bold text-primary">{service.price} ₽</p>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Icon name="Clock" size={14} />
                        {service.duration}
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" variant={selectedServices.includes(service.id) ? "default" : "outline"} onClick={() => toggleService(service.id)}>
                    {selectedServices.includes(service.id) ? (
                      <>
                        <Icon name="Check" size={18} className="mr-2" />
                        Выбрано
                      </>
                    ) : (
                      <>
                        <Icon name="Plus" size={18} className="mr-2" />
                        Выбрать
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4">Процесс работы</Badge>
            <h2 className="text-4xl font-bold mb-4">Как это работает</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Простой и понятный процесс от заявки до получения чистых вещей
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {steps.map((step, index) => (
              <div key={step.number} className="text-center animate-fade-in" style={{ animationDelay: `${index * 0.15}s` }}>
                <div className="relative mb-6">
                  <div className="w-20 h-20 rounded-full bg-primary text-white flex items-center justify-center mx-auto text-2xl font-bold shadow-lg">
                    {step.number}
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-10 left-[60%] w-full h-0.5 bg-primary/20"></div>
                  )}
                </div>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Icon name={step.icon as any} size={24} className="text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="booking" className="py-20">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="text-center mb-12">
            <Badge className="mb-4">Онлайн-бронирование</Badge>
            <h2 className="text-4xl font-bold mb-4">Оформить заказ</h2>
            <p className="text-muted-foreground">
              Заполните форму, и мы свяжемся с вами для уточнения деталей
            </p>
          </div>

          <Card className="shadow-xl">
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle>Данные для заказа</CardTitle>
                <CardDescription>
                  {selectedServices.length > 0 ? (
                    <div className="mt-2">
                      <p className="font-medium">Выбрано услуг: {selectedServices.length}</p>
                      <p className="text-xl font-bold text-primary mt-1">Итого: {totalCost} ₽</p>
                    </div>
                  ) : (
                    'Выберите услуги из каталога выше'
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Ваше имя *</Label>
                    <Input
                      id="name"
                      placeholder="Иван Иванов"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Телефон *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+7 (999) 123-45-67"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="example@mail.ru"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Дата сдачи</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time">Удобное время</Label>
                    <Select value={formData.time} onValueChange={(value) => setFormData({ ...formData, time: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите время" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="9-12">9:00 - 12:00</SelectItem>
                        <SelectItem value="12-15">12:00 - 15:00</SelectItem>
                        <SelectItem value="15-18">15:00 - 18:00</SelectItem>
                        <SelectItem value="18-20">18:00 - 20:00</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="comment">Комментарий</Label>
                  <Textarea
                    id="comment"
                    placeholder="Укажите особые пожелания или дополнительную информацию"
                    value={formData.comment}
                    onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                    rows={4}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" required />
                  <label
                    htmlFor="terms"
                    className="text-sm text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Согласен с политикой конфиденциальности
                  </label>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" size="lg" className="w-full" disabled={selectedServices.length === 0}>
                  <Icon name="Send" size={18} className="mr-2" />
                  Отправить заявку
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </section>

      <section id="reviews" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4">Отзывы</Badge>
            <h2 className="text-4xl font-bold mb-4">Что говорят клиенты</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Более 5000 довольных клиентов за 15 лет работы
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {reviews.map((review, index) => (
              <Card key={index} className="animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{review.name}</CardTitle>
                    <div className="flex gap-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <Icon key={i} name="Star" size={16} className="fill-primary text-primary" />
                      ))}
                    </div>
                  </div>
                  <CardDescription>{review.date}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{review.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contacts" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4">Контакты</Badge>
            <h2 className="text-4xl font-bold mb-4">Свяжитесь с нами</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Мы всегда рады ответить на ваши вопросы
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <Card className="text-center">
              <CardHeader>
                <Icon name="MapPin" size={40} className="mx-auto mb-2 text-primary" />
                <CardTitle className="text-lg">Адрес</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">г. Москва, ул. Примерная, д. 123</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Icon name="Phone" size={40} className="mx-auto mb-2 text-primary" />
                <CardTitle className="text-lg">Телефон</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">+7 (495) 123-45-67</p>
                <p className="text-xs text-muted-foreground mt-1">Ежедневно 9:00-20:00</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Icon name="Mail" size={40} className="mx-auto mb-2 text-primary" />
                <CardTitle className="text-lg">Email</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">info@chistota-blesk.ru</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Icon name="Clock" size={40} className="mx-auto mb-2 text-primary" />
                <CardTitle className="text-lg">Режим работы</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">Пн-Вс: 9:00 - 20:00</p>
                <p className="text-xs text-muted-foreground mt-1">Без выходных</p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-0">
                <div className="w-full h-96 bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Icon name="Map" size={48} className="mx-auto mb-2 text-muted-foreground" />
                    <p className="text-muted-foreground">Интерактивная карта</p>
                    <p className="text-sm text-muted-foreground">г. Москва, ул. Примерная, д. 123</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="bg-foreground text-background py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Sparkles" size={24} />
                <h3 className="font-bold text-lg">Чистота и Блеск</h3>
              </div>
              <p className="text-sm opacity-80">
                Профессиональная химчистка с 2010 года
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Услуги</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li>Чистка одежды</li>
                <li>Уход за обувью</li>
                <li>Химчистка штор</li>
                <li>Свадебные платья</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Компания</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li>О нас</li>
                <li>Контакты</li>
                <li>Вакансии</li>
                <li>Партнерам</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Поддержка</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li>Частые вопросы</li>
                <li>Политика конфиденциальности</li>
                <li>Условия использования</li>
                <li>Гарантии</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-background/20 pt-8 text-center text-sm opacity-80">
            <p>&copy; 2025 Чистота и Блеск. Все права защищены.</p>
          </div>
        </div>
      </footer>

      <AuthDialog 
        open={authDialogOpen} 
        onOpenChange={setAuthDialogOpen}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
}