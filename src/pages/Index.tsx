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
    icon: 'Shirt',
    category: 'Одежда'
  },
  {
    id: 2,
    name: 'Удаление сложных пятен',
    description: 'Эффективное удаление даже самых сложных загрязнений',
    price: 1200,
    duration: '24 часа',
    icon: 'Droplet',
    category: 'Спецобработка'
  },
  {
    id: 3,
    name: 'Уход за обувью',
    description: 'Чистка, восстановление цвета и защита обуви',
    price: 1800,
    duration: '72 часа',
    icon: 'Footprints',
    category: 'Обувь'
  },
  {
    id: 4,
    name: 'Чистка верхней одежды',
    description: 'Пальто, куртки, пуховики - бережная чистка',
    price: 3200,
    duration: '72 часа',
    icon: 'Wind',
    category: 'Одежда'
  },
  {
    id: 5,
    name: 'Химчистка штор',
    description: 'Профессиональная чистка штор любого типа',
    price: 2800,
    duration: '5 дней',
    icon: 'Home',
    category: 'Текстиль'
  },
  {
    id: 6,
    name: 'Чистка свадебных платьев',
    description: 'Деликатная чистка с сохранением всех деталей',
    price: 5500,
    duration: '7 дней',
    icon: 'Heart',
    category: 'Одежда'
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
    date: '2 недели назад',
    avatar: '👩🏻'
  },
  {
    name: 'Михаил Соколов',
    rating: 5,
    text: 'Пользуюсь услугами регулярно. Всегда на высшем уровне, костюмы выглядят как новые!',
    date: '1 месяц назад',
    avatar: '👨🏻‍💼'
  },
  {
    name: 'Елена Иванова',
    rating: 5,
    text: 'Спасибо за спасение моего свадебного платья! Думала, что после банкета его уже не восстановить.',
    date: '3 недели назад',
    avatar: '👰🏻'
  }
];

export default function Index() {
  const [authOpen, setAuthOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem('user');

  const filteredServices = filterCategory === 'all' 
    ? services 
    : services.filter(s => s.category === filterCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      <AuthDialog open={authOpen} onOpenChange={setAuthOpen} />

      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center">
                <Icon name="Sparkles" size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Чистота и Блеск</h1>
                <p className="text-xs text-gray-500">Профессиональная химчистка</p>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-6">
              <a href="#services" className="text-sm font-medium text-gray-700 hover:text-primary transition-colors">Услуги</a>
              <a href="#how-it-works" className="text-sm font-medium text-gray-700 hover:text-primary transition-colors">Как это работает</a>
              <a href="#about" className="text-sm font-medium text-gray-700 hover:text-primary transition-colors">О нас</a>
              <a href="#reviews" className="text-sm font-medium text-gray-700 hover:text-primary transition-colors">Отзывы</a>
              <a href="#contacts" className="text-sm font-medium text-gray-700 hover:text-primary transition-colors">Контакты</a>
            </nav>

            <div className="flex items-center gap-2">
              {isLoggedIn ? (
                <Button onClick={() => navigate('/dashboard')} className="gap-2">
                  <Icon name="User" size={18} />
                  Личный кабинет
                </Button>
              ) : (
                <Button onClick={() => setAuthOpen(true)} className="gap-2">
                  <Icon name="LogIn" size={18} />
                  Войти
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      <section className="relative h-screen overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="https://cdn.coverr.co/videos/coverr-professional-dry-cleaning-service-8753/1080p.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <div className="max-w-3xl mx-auto text-center animate-fade-in text-white">
            <Badge className="mb-4 bg-white/20 backdrop-blur-sm text-white border-white/30">
              <Icon name="Award" size={14} className="mr-1" />
              Экспресс-чистка за 24 часа
            </Badge>
            <h2 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-2xl">
              Доверьте чистоту профессионалам!
            </h2>
            <p className="text-xl md:text-2xl mb-8 drop-shadow-lg">
              Бережная обработка деликатных тканей, современное оборудование и экологичные средства
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="gap-2 bg-primary hover:bg-primary/90 shadow-2xl" onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}>
                <Icon name="CalendarCheck" size={20} />
                Заказать услугу
              </Button>
              <Button size="lg" variant="outline" className="gap-2 bg-white/10 backdrop-blur-sm text-white border-white/30 hover:bg-white/20">
                <Icon name="MessageCircle" size={20} />
                Связаться с нами
              </Button>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mt-16">
              <Card className="border-2 hover:border-primary transition-colors bg-white/10 backdrop-blur-md border-white/20">
                <CardHeader className="text-center">
                  <Icon name="Clock" size={40} className="mx-auto mb-2 text-white" />
                  <CardTitle className="text-lg text-white">Быстро</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-white/80">Экспресс-чистка от 24 часов</p>
                </CardContent>
              </Card>
              <Card className="border-2 hover:border-primary transition-colors bg-white/10 backdrop-blur-md border-white/20">
                <CardHeader className="text-center">
                  <Icon name="Shield" size={40} className="mx-auto mb-2 text-white" />
                  <CardTitle className="text-lg text-white">Безопасно</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-white/80">Экологичные средства</p>
                </CardContent>
              </Card>
              <Card className="border-2 hover:border-primary transition-colors bg-white/10 backdrop-blur-md border-white/20">
                <CardHeader className="text-center">
                  <Icon name="Star" size={40} className="mx-auto mb-2 text-white" />
                  <CardTitle className="text-lg text-white">Качественно</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-white/80">15 лет опыта работы</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          <Icon name="ChevronDown" size={32} className="text-white/70" />
        </div>
      </section>

      <section id="how-it-works" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4" variant="secondary">
              <Icon name="Info" size={14} className="mr-1" />
              Процесс работы
            </Badge>
            <h3 className="text-4xl font-bold mb-4">Как это работает</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Простой и понятный процесс от заказа до получения чистых вещей
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step) => (
              <div key={step.number} className="relative">
                <Card className="text-center hover:shadow-lg transition-shadow border-2">
                  <CardHeader>
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name={step.icon} size={32} className="text-white" />
                    </div>
                    <div className="absolute -top-4 -right-4 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg">
                      {step.number}
                    </div>
                    <CardTitle className="text-xl">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </CardContent>
                </Card>
                {step.number < 4 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-primary/30"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4" variant="secondary">
              <Icon name="Sparkles" size={14} className="mr-1" />
              Наши услуги
            </Badge>
            <h3 className="text-4xl font-bold mb-4">Каталог услуг</h3>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              Широкий спектр услуг по уходу за одеждой, обувью и текстилем
            </p>

            <div className="flex justify-center gap-2 flex-wrap">
              <Button 
                variant={filterCategory === 'all' ? 'default' : 'outline'}
                onClick={() => setFilterCategory('all')}
                size="sm"
              >
                Все услуги
              </Button>
              <Button 
                variant={filterCategory === 'Одежда' ? 'default' : 'outline'}
                onClick={() => setFilterCategory('Одежда')}
                size="sm"
              >
                Одежда
              </Button>
              <Button 
                variant={filterCategory === 'Обувь' ? 'default' : 'outline'}
                onClick={() => setFilterCategory('Обувь')}
                size="sm"
              >
                Обувь
              </Button>
              <Button 
                variant={filterCategory === 'Текстиль' ? 'default' : 'outline'}
                onClick={() => setFilterCategory('Текстиль')}
                size="sm"
              >
                Текстиль
              </Button>
              <Button 
                variant={filterCategory === 'Спецобработка' ? 'default' : 'outline'}
                onClick={() => setFilterCategory('Спецобработка')}
                size="sm"
              >
                Спецобработка
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <Card key={service.id} className="hover:shadow-xl transition-shadow border-2 hover:border-primary">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center mb-4">
                    <Icon name={service.icon} size={32} className="text-primary" />
                  </div>
                  <CardTitle className="text-xl">{service.name}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Стоимость:</span>
                      <span className="text-2xl font-bold text-primary">{service.price} ₽</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Срок:</span>
                      <Badge variant="secondary">
                        <Icon name="Clock" size={12} className="mr-1" />
                        {service.duration}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full gap-2" 
                    onClick={() => {
                      setSelectedService(service.id);
                      document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    <Icon name="ShoppingCart" size={18} />
                    Заказать услугу
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="booking" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4" variant="secondary">
                <Icon name="CalendarCheck" size={14} className="mr-1" />
                Онлайн-бронирование
              </Badge>
              <h3 className="text-4xl font-bold mb-4">Оформить заказ</h3>
              <p className="text-gray-600">
                Заполните форму, и мы свяжемся с вами для подтверждения
              </p>
            </div>

            <Card className="border-2">
              <CardHeader>
                <CardTitle>Заявка на услугу</CardTitle>
                <CardDescription>Все поля обязательны для заполнения</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">ФИО</Label>
                    <Input id="name" placeholder="Иванов Иван Иванович" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Телефон</Label>
                    <Input id="phone" type="tel" placeholder="+7 (999) 123-45-67" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="ivanov@example.com" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="service">Услуга</Label>
                  <Select defaultValue={selectedService?.toString()}>
                    <SelectTrigger id="service">
                      <SelectValue placeholder="Выберите услугу" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem key={service.id} value={service.id.toString()}>
                          {service.name} — {service.price} ₽
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Дата сдачи</Label>
                    <Input id="date" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time">Время</Label>
                    <Input id="time" type="time" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="comment">Комментарий</Label>
                  <Textarea id="comment" placeholder="Опишите особенности вещи или дополнительные пожелания" rows={4} />
                </div>

                <div className="flex items-start gap-2">
                  <Checkbox id="agree" />
                  <Label htmlFor="agree" className="text-sm leading-tight">
                    Согласен с <a href="#" className="text-primary underline">политикой конфиденциальности</a> и обработкой персональных данных
                  </Label>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full gap-2" size="lg">
                  <Icon name="Send" size={18} />
                  Отправить заявку
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      <section id="about" className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4" variant="secondary">
                <Icon name="Building2" size={14} className="mr-1" />
                О компании
              </Badge>
              <h3 className="text-4xl font-bold mb-6">Чистота и Блеск</h3>
              <p className="text-gray-600 mb-4">
                Мы работаем на рынке профессиональной химчистки уже более 15 лет. За это время мы зарекомендовали себя как надежный партнер по уходу за вашими вещами.
              </p>
              <p className="text-gray-600 mb-6">
                Наша команда использует только современное европейское оборудование и экологически чистые средства, которые бережно относятся к тканям и не вызывают аллергии.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="Award" size={20} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Сертифицированные специалисты</h4>
                    <p className="text-sm text-gray-600">Все мастера имеют профильное образование и регулярно проходят обучение</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="Leaf" size={20} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Экологичные средства</h4>
                    <p className="text-sm text-gray-600">Используем только безопасные для здоровья и окружающей среды препараты</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="Settings" size={20} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Современное оборудование</h4>
                    <p className="text-sm text-gray-600">Профессиональные машины от ведущих европейских производителей</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Card className="border-2">
                <CardHeader className="text-center">
                  <div className="text-4xl font-bold text-primary">15+</div>
                  <CardTitle className="text-lg">лет опыта</CardTitle>
                </CardHeader>
              </Card>
              <Card className="border-2">
                <CardHeader className="text-center">
                  <div className="text-4xl font-bold text-primary">50K+</div>
                  <CardTitle className="text-lg">заказов</CardTitle>
                </CardHeader>
              </Card>
              <Card className="border-2">
                <CardHeader className="text-center">
                  <div className="text-4xl font-bold text-primary">98%</div>
                  <CardTitle className="text-lg">довольных клиентов</CardTitle>
                </CardHeader>
              </Card>
              <Card className="border-2">
                <CardHeader className="text-center">
                  <div className="text-4xl font-bold text-primary">24ч</div>
                  <CardTitle className="text-lg">экспресс-режим</CardTitle>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section id="reviews" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4" variant="secondary">
              <Icon name="MessageSquare" size={14} className="mr-1" />
              Отзывы
            </Badge>
            <h3 className="text-4xl font-bold mb-4">Что говорят наши клиенты</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Мы гордимся доверием наших клиентов и постоянно работаем над улучшением качества услуг
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((review, idx) => (
              <Card key={idx} className="border-2 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center text-2xl">
                      {review.avatar}
                    </div>
                    <div>
                      <CardTitle className="text-base">{review.name}</CardTitle>
                      <div className="flex items-center gap-1 mt-1">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <Icon key={i} name="Star" size={14} className="text-yellow-500 fill-yellow-500" />
                        ))}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-3">{review.text}</p>
                  <p className="text-xs text-gray-400">{review.date}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contacts" className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4" variant="secondary">
              <Icon name="MapPin" size={14} className="mr-1" />
              Контакты
            </Badge>
            <h3 className="text-4xl font-bold mb-4">Свяжитесь с нами</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Будем рады ответить на ваши вопросы и принять заказ
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <Card className="border-2">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon name="Phone" size={24} className="text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Телефон</CardTitle>
                      <CardDescription>Ежедневно с 8:00 до 22:00</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <a href="tel:+74951234567" className="text-xl font-semibold text-primary hover:underline">
                    +7 (495) 123-45-67
                  </a>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon name="Mail" size={24} className="text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Email</CardTitle>
                      <CardDescription>Ответим в течение часа</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <a href="mailto:info@chistota-blesk.ru" className="text-xl font-semibold text-primary hover:underline">
                    info@chistota-blesk.ru
                  </a>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon name="MapPin" size={24} className="text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Адрес</CardTitle>
                      <CardDescription>Приходите в любое время</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-semibold">Москва, ул. Примерная, д. 10</p>
                  <p className="text-sm text-gray-600 mt-1">Режим работы: Пн-Вс, 8:00 - 22:00</p>
                </CardContent>
              </Card>
            </div>

            <Card className="border-2 h-[500px]">
              <CardContent className="p-0 h-full">
                <iframe
                  src="https://yandex.ru/map-widget/v1/?um=constructor%3A8f5f5e5f5e5f5e5f5e5f5e5f5e5f5e5f&amp;source=constructor"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  className="rounded-lg"
                ></iframe>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center">
                  <Icon name="Sparkles" size={24} className="text-white" />
                </div>
                <h4 className="font-bold text-lg">Чистота и Блеск</h4>
              </div>
              <p className="text-sm text-gray-400">
                Профессиональная химчистка одежды, обуви и текстиля
              </p>
            </div>

            <div>
              <h5 className="font-semibold mb-4">Услуги</h5>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#services" className="hover:text-primary transition-colors">Чистка одежды</a></li>
                <li><a href="#services" className="hover:text-primary transition-colors">Уход за обувью</a></li>
                <li><a href="#services" className="hover:text-primary transition-colors">Химчистка штор</a></li>
                <li><a href="#services" className="hover:text-primary transition-colors">Удаление пятен</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold mb-4">Компания</h5>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#about" className="hover:text-primary transition-colors">О нас</a></li>
                <li><a href="#reviews" className="hover:text-primary transition-colors">Отзывы</a></li>
                <li><a href="#contacts" className="hover:text-primary transition-colors">Контакты</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Вакансии</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold mb-4">Контакты</h5>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center gap-2">
                  <Icon name="Phone" size={16} />
                  <span>+7 (495) 123-45-67</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Mail" size={16} />
                  <span>info@chistota-blesk.ru</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="MapPin" size={16} />
                  <span>Москва, ул. Примерная, д. 10</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              © 2025 Чистота и Блеск. Все права защищены.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                Политика конфиденциальности
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                Договор оферты
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
