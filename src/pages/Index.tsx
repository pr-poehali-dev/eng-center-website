import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'technologies', 'partners', 'contacts'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const menuItems = [
    { id: 'home', label: 'Главная' },
    { id: 'about', label: 'О центре' },
    { id: 'technologies', label: 'Технологии' },
    { id: 'partners', label: 'Партнеры' },
    { id: 'contacts', label: 'Контакты' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img 
                src="https://cdn.poehali.dev/files/лого_окон вар.png" 
                alt="Логотип ТОИ ДВО РАН" 
                className="h-12 w-12 object-contain"
              />
              <div>
                <h1 className="text-lg font-bold text-foreground">Инжиниринговый центр ТОИ ДВО РАН</h1>
                <p className="text-xs text-muted-foreground">Технологии исследования Мирового океана</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-8">
                {menuItems.map(({ id, label }) => (
                  <button
                    key={id}
                    onClick={() => scrollToSection(id)}
                    className={`text-sm font-medium transition-colors ${
                      activeSection === id ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Icon name="Menu" size={24} />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  <div className="flex flex-col space-y-6 mt-8">
                    <div className="flex items-center space-x-3 pb-6 border-b border-border">
                      <img 
                        src="https://cdn.poehali.dev/files/лого_окон вар.png" 
                        alt="Логотип ТОИ ДВО РАН" 
                        className="h-10 w-10 object-contain"
                      />
                      <span className="font-bold">ТОИ ДВО РАН</span>
                    </div>
                    {menuItems.map(({ id, label }) => (
                      <button
                        key={id}
                        onClick={() => scrollToSection(id)}
                        className={`text-left text-lg font-medium transition-colors py-2 ${
                          activeSection === id ? 'text-primary' : 'text-foreground hover:text-primary'
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </nav>
      </header>

      <section id="home" className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-transparent" />
        <div className="container mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-5xl md:text-6xl font-bold leading-tight">
                Инновации в изучении
                <span className="text-primary block">Мирового океана</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Передовые технологии для комплексной оценки морской среды, мониторинга биоресурсов 
                и устойчивого управления прибрежными территориями
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" onClick={() => scrollToSection('about')} className="group">
                  Узнать больше
                  <Icon name="ArrowRight" className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </Button>
                <Button size="lg" variant="outline" onClick={() => scrollToSection('contacts')}>
                  Связаться с нами
                </Button>
              </div>
            </div>
            <div className="relative animate-slide-up">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-3xl blur-3xl" />
              <img
                src="https://cdn.poehali.dev/projects/94320806-1e13-4e47-94f7-c1556114391c/files/ae5e39b6-7a9c-4927-a60d-6de45baad7f7.jpg"
                alt="Океанологические исследования"
                className="relative rounded-3xl shadow-2xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-20 px-6 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">О центре</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Тихоокеанский океанологический институт им. В.И. Ильичёва ДВО РАН
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: 'Target',
                title: 'Наша цель',
                description: 'Повышение эффективности прикладных научных исследований для сохранения морских экосистем и рационального использования ресурсов океана'
              },
              {
                icon: 'Calendar',
                title: 'Период программы',
                description: '2025-2028 годы. Четырёхлетняя программа развития технологий и внедрения инноваций в морские исследования'
              },
              {
                icon: 'MapPin',
                title: 'Локация',
                description: 'Владивосток, Приморский край. Стратегическое расположение для исследований Тихого океана и Японского моря'
              }
            ].map((item, index) => (
              <Card key={index} className="p-8 hover:shadow-lg transition-shadow border-border/50">
                <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                  <Icon name={item.icon} className="text-primary" size={32} />
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </Card>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <img
              src="https://cdn.poehali.dev/projects/94320806-1e13-4e47-94f7-c1556114391c/files/a7fedb5b-7749-4300-b753-66ad61f333dd.jpg"
              alt="Лаборатория"
              className="rounded-3xl shadow-xl w-full h-auto"
            />
            <div className="space-y-6">
              <h3 className="text-3xl font-bold">Направления деятельности</h3>
              <div className="space-y-4">
                {[
                  'Комплексная оценка состояния морской среды в местах хозяйственного освоения',
                  'Разработка планов управления приморскими территориями и акваториями',
                  'Создание аппаратурных комплексов для измерения параметров морской среды',
                  'Консалтинг и обучение специалистов в области морских технологий'
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="bg-primary/10 rounded-full p-1 mt-1">
                      <Icon name="Check" className="text-primary" size={16} />
                    </div>
                    <p className="text-muted-foreground flex-1">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="technologies" className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Технологии и услуги</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Передовые решения для морских исследований и мониторинга
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: 'Microscope',
                title: 'Оценка морской среды',
                description: 'Комплексный мониторинг и анализ состояния океанических экосистем'
              },
              {
                icon: 'Cpu',
                title: 'Аппаратные комплексы',
                description: 'Разработка измерительных систем и датчиков нового поколения'
              },
              {
                icon: 'Database',
                title: 'Информационные ресурсы',
                description: 'Базы данных и системы обработки океанографической информации'
              },
              {
                icon: 'GraduationCap',
                title: 'Обучение и консалтинг',
                description: 'Образовательные программы для специалистов морской отрасли'
              }
            ].map((item, index) => (
              <Card key={index} className="p-6 hover:shadow-xl transition-all hover:-translate-y-1 border-border/50">
                <div className="bg-accent/10 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                  <Icon name={item.icon} className="text-accent" size={28} />
                </div>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="partners" className="py-20 px-6 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Партнеры</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Сотрудничество с ведущими научными и индустриальными организациями
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="p-10 border-border/50">
              <div className="flex items-start space-x-6">
                <div className="bg-primary/10 w-20 h-20 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Icon name="Building2" className="text-primary" size={40} />
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">ООО «Центр морских исследований МГУ им. М.В. Ломоносова»</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Индустриальный партнёр центра. С 2014 года проводит морские геофизические, геологические 
                    и экологические исследования на акваториях. Сотрудничает с РАН, Газпром, Роснефтегаз, 
                    Росатом и международными научными центрами.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section id="contacts" className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Контакты</h2>
            <p className="text-lg text-muted-foreground">
              Свяжитесь с нами для сотрудничества и консультаций
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8 space-y-6 border-border/50">
              <h3 className="text-2xl font-bold mb-6">Свяжитесь с нами</h3>
              
              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon name="MapPin" className="text-primary" size={24} />
                </div>
                <div>
                  <p className="font-semibold mb-1">Адрес</p>
                  <p className="text-muted-foreground">Владивосток, Приморский край, Россия</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon name="Mail" className="text-primary" size={24} />
                </div>
                <div>
                  <p className="font-semibold mb-1">Email</p>
                  <a href="mailto:info@poi.dvo.ru" className="text-primary hover:underline">
                    info@poi.dvo.ru
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon name="Phone" className="text-primary" size={24} />
                </div>
                <div>
                  <p className="font-semibold mb-1">Телефон</p>
                  <a href="tel:+74232269999" className="text-primary hover:underline">
                    +7 (423) 226-99-99
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon name="Clock" className="text-primary" size={24} />
                </div>
                <div>
                  <p className="font-semibold mb-1">Часы работы</p>
                  <p className="text-muted-foreground">Пн-Пт: 9:00-18:00 (МСК+7)</p>
                </div>
              </div>

              <div className="pt-4">
                <Button className="w-full" size="lg" asChild>
                  <a href="https://www.poi.dvo.ru" target="_blank" rel="noopener noreferrer">
                    Посетить официальный сайт
                    <Icon name="ExternalLink" className="ml-2" size={18} />
                  </a>
                </Button>
              </div>
            </Card>

            <div className="relative rounded-3xl overflow-hidden h-full min-h-[400px]">
              <img
                src="https://cdn.poehali.dev/projects/94320806-1e13-4e47-94f7-c1556114391c/files/2bf58b44-e102-4125-b6e8-7914c0f16795.jpg"
                alt="Владивосток"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <p className="text-sm font-medium mb-1">Владивосток</p>
                <p className="text-2xl font-bold">Приморский край</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-secondary text-secondary-foreground py-12 px-6">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <img 
                  src="https://cdn.poehali.dev/files/лого_окон вар.png" 
                  alt="Логотип ТОИ ДВО РАН" 
                  className="h-10 w-10 object-contain"
                />
                <span className="font-bold text-lg">ТОИ ДВО РАН</span>
              </div>
              <p className="text-sm text-secondary-foreground/70">
                Инжиниринговый центр развития технологий исследования и освоения ресурсов Мирового океана
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Разделы</h4>
              <ul className="space-y-2 text-sm">
                {['О центре', 'Технологии', 'Партнеры', 'Контакты'].map((item) => (
                  <li key={item}>
                    <button
                      onClick={() => scrollToSection(item.toLowerCase().replace(' ', ''))}
                      className="text-secondary-foreground/70 hover:text-primary transition-colors"
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <ul className="space-y-2 text-sm text-secondary-foreground/70">
                <li>г. Владивосток, Приморский край</li>
                <li>
                  <a href="tel:+74232269999" className="hover:text-primary transition-colors">
                    +7 (423) 226-99-99
                  </a>
                </li>
                <li>
                  <a href="mailto:info@poi.dvo.ru" className="hover:text-primary transition-colors">
                    info@poi.dvo.ru
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-secondary-foreground/10 pt-8 text-center text-sm text-secondary-foreground/70">
            <p>© 2025 Инжиниринговый центр ТОИ ДВО РАН. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;