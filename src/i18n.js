import React, { createContext, useContext, useMemo, useState } from 'react';

const translations = {
  pt: {
    app: {
      loading: 'Carregando experiências...',
      projectsTitle: 'Galeria de Projetos',
      projectsIntro:
        'Coleção de demos funcionais com foco em arquitetura front-end e consumo de APIs.',
    },
    nav: {
      logo: 'Portfólio',
      about: 'Sobre mim',
      projects: 'Projetos',
      contact: 'Contato',
      localeLabel: 'Idioma',
    },
    footer: {
      portfolio: 'Portfólio pessoal',
      thanks: 'Obrigado por visitar',
    },
    projectCard: {
      open: 'Ver Projeto',
    },
    projects: {
      ecommerceTitle: 'Site de E-commerce',
      ecommerceDescription:
        'Um site de e-commerce full-stack com autenticação, catálogo de produtos, carrinho e pagamento.',
      weatherTitle: 'Aplicativo de Clima',
      weatherDescription:
        'Um app de clima que exibe condições meteorológicas atuais por localização.',
      tasksTitle: 'Gerenciador de Tarefas',
      tasksDescription:
        'Aplicativo para organizar tarefas com criação, edição, exclusão e datas de vencimento.',
      portfolioTitle: 'Site de Portfólio',
      portfolioDescription:
        'Portfólio pessoal com foco em projetos, posicionamento e experiência visual consistente.',
      blogTitle: 'Plataforma de Blog',
      blogDescription:
        'CMS para criar posts com editor, comentários e compartilhamento.',
      recipesTitle: 'Localizador de Receitas',
      recipesDescription:
        'Busca de receitas por ingrediente com detalhes completos de preparo.',
    },
    about: {
      title: 'Sobre mim',
      available: 'Disponível para contato',
      hello: 'Olá, eu sou João Ricardo',
      summary:
        'Sou desenvolvedor full-stack, focado em criar produtos práticos, organizados e orientados a resultado.',
      tagProduct: 'Produto',
      tagFrontend: 'Front-end',
      tagBackend: 'Back-end',
      driveTitle: 'O que me move',
      driveText:
        'Entregar produtos com clareza, fluidez e impacto de negócio, cuidando dos detalhes da interface.',
      workTitle: 'Como eu trabalho',
      workText:
        'Processos ágeis, validação contínua com usuários e código limpo orientado a resultado.',
      hardSkills: 'Hard skills',
      languages: 'Linguagens de Programação',
      backend: 'Back-end',
      frontend: 'Front-end',
      apis: 'APIs e Microsserviços',
      database: 'Banco de Dados',
      containers: 'Containerização',
      vcs: 'Controle de Versão',
    },
    contact: {
      title: 'Contato',
      subtitle: 'Vamos conversar sobre seu próximo projeto.',
      email: 'E-mail',
      copyHint: 'Clique para copiar o e-mail',
      copied: 'E-mail copiado!',
      copyFailed: 'Não foi possível copiar.',
      linkedin: 'LinkedIn',
      github: 'GitHub',
      hiringLead: 'Busco oportunidades como desenvolvedor.',
      hiringStrong: 'Disponível para processos seletivos.',
      chip1: 'CLT ou PJ',
      chip2: 'Remoto ou híbrido',
      chip3: 'Início imediato',
    },
    notFound: {
      title: 'Página não encontrada',
      subtitle: 'O endereço digitado não existe.',
      cta: 'Voltar para a galeria',
    },
    demos: {
      loading: 'Carregando...',
      empty: 'Nenhum item encontrado.',
      ecommerceTitle: 'Loja Aurora',
      ecommerceSubtitle: 'Catálogo, carrinho e checkout integrados.',
      yourName: 'Seu nome',
      helloUser: 'Olá,',
      signIn: 'Entrar',
      signOut: 'Sair',
      searchProducts: 'Buscar produtos',
      add: 'Adicionar',
      cart: 'Carrinho',
      closeCheckout: 'Fechar checkout',
      checkout: 'Finalizar compra',
      emptyCart: 'Seu carrinho está vazio.',
      total: 'Total',
      payment: 'Pagamento',
      paymentName: 'Nome impresso no cartão',
      paymentCard: 'Número do cartão',
      paymentExpiry: 'Validade MM/AA',
      paymentCvv: 'CVV',
      confirmPayment: 'Confirmar pagamento',
      paymentInvalid: 'Preencha os dados do pagamento corretamente.',
      paymentApproved: 'Pagamento aprovado. Pedido confirmado!',
      weatherTitle: 'Clima Agora',
      weatherSubtitle: 'Condições atuais em tempo real.',
      typeCity: 'Digite uma cidade',
      checkWeather: 'Ver clima',
      cityMissing: 'Digite uma cidade.',
      cityNotFound: 'Cidade não encontrada.',
      weatherLoadError: 'Não foi possível carregar o clima.',
      temperature: 'Temperatura',
      wind: 'Vento',
      condition: 'Condição',
      variableCondition: 'Condição variável',
      tasksTitle: 'Organizador de Tarefas',
      tasksSubtitle: 'Crie, edite e acompanhe suas tarefas diárias.',
      newTask: 'Nova tarefa',
      addTask: 'Adicionar',
      all: 'Todas',
      open: 'Pendentes',
      done: 'Concluídas',
      noTasks: 'Nenhuma tarefa encontrada.',
      dueDate: 'Vence em',
      reopen: 'Reabrir',
      complete: 'Concluir',
      save: 'Salvar',
      edit: 'Editar',
      remove: 'Excluir',
      portfolioTitle: 'Portfólio',
      portfolioSubtitle: 'Projetos, habilidades e propostas de valor.',
      downloadCv: 'Baixar CV',
      portfolioHeroTitle: 'Olá, sou João Ricardo',
      portfolioHeroText:
        'Desenvolvedor full-stack com foco em experiências digitais rápidas, acessíveis e consistentes.',
      viewCase: 'Ver case',
      services: 'Serviços',
      service1: 'Landing pages rápidas',
      service1Meta: 'Entrega em 7 dias',
      service2: 'Design system consistente',
      service2Meta: 'Componentes reutilizáveis',
      service3: 'Suporte pós-lançamento',
      service3Meta: 'Monitoramento contínuo',
      blogTitle: 'Blog Studio',
      blogSubtitle: 'Editor, comentários e compartilhamento.',
      newPost: 'Novo post',
      postTitle: 'Título do post',
      writePost: 'Escreva seu post aqui...',
      publish: 'Publicar',
      posts: 'Publicações',
      noPosts: 'Nenhum post publicado.',
      share: 'Compartilhar',
      comments: 'Comentários',
      noComments: 'Nenhum comentário ainda.',
      writeComment: 'Escreva um comentário',
      send: 'Enviar',
      shareSuccess: 'Post compartilhado com sucesso.',
      shareCopied: 'Link copiado para a área de transferência.',
      shareFail: 'Não foi possível compartilhar agora.',
      recipesTitle: 'Busca de Receitas',
      recipesSubtitle: 'Pesquise receitas por ingrediente.',
      ingredientPlaceholder: 'Ex: frango, tomate, queijo',
      search: 'Buscar',
      viewRecipe: 'Ver receita',
      recipeLoadError: 'Não foi possível carregar a receita.',
      recipeSearchError: 'Não foi possível buscar receitas.',
      ingredientMissing: 'Digite um ingrediente.',
      preparation: 'Modo de preparo',
      detailsBelow: 'Detalhes abaixo',
    },
  },
  en: {
    app: {
      loading: 'Loading experiences...',
      projectsTitle: 'Project Gallery',
      projectsIntro:
        'Collection of functional demos focused on user experience, front-end architecture, and modern integrations.',
    },
    nav: {
      logo: 'Portfolio',
      about: 'About',
      projects: 'Projects',
      contact: 'Contact',
      localeLabel: 'Language',
    },
    footer: {
      portfolio: 'Personal portfolio',
      thanks: 'Thanks for visiting',
    },
    projectCard: {
      open: 'Open Project',
    },
    projects: {
      ecommerceTitle: 'E-commerce Site',
      ecommerceDescription:
        'A full-stack e-commerce site with authentication, product catalog, cart, and payment.',
      weatherTitle: 'Weather App',
      weatherDescription:
        'A weather app that shows current weather conditions by location.',
      tasksTitle: 'Task Manager',
      tasksDescription:
        'Task app with create, edit, delete, and due date management.',
      portfolioTitle: 'Portfolio Site',
      portfolioDescription:
        'A personal portfolio focused on projects, positioning, and consistent visual experience.',
      blogTitle: 'Blog Platform',
      blogDescription:
        'CMS to create posts with editor, comments, and sharing.',
      recipesTitle: 'Recipe Finder',
      recipesDescription:
        'Search recipes by ingredient with complete preparation details.',
    },
    about: {
      title: 'About me',
      available: 'Open to new opportunities',
      hello: "Hi, I'm Joao Ricardo",
      summary:
        'I am a full-stack developer focused on building practical, organized, and results-driven products.',
      tagProduct: 'Product',
      tagFrontend: 'Front-end',
      tagBackend: 'Back-end',
      driveTitle: 'What drives me',
      driveText:
        'Building products with clarity, flow, and business impact, with care for interface details.',
      workTitle: 'How I work',
      workText:
        'Agile process, continuous user validation, and clean code focused on outcomes.',
      hardSkills: 'Hard skills',
      languages: 'Programming Languages',
      backend: 'Back-end',
      frontend: 'Front-end',
      apis: 'APIs and Microservices',
      database: 'Databases',
      containers: 'Containerization',
      vcs: 'Version Control',
    },
    contact: {
      title: 'Contact',
      subtitle: "Let's talk about your next project.",
      email: 'Email',
      copyHint: 'Click to copy email',
      copied: 'Email copied!',
      copyFailed: 'Could not copy.',
      linkedin: 'LinkedIn',
      github: 'GitHub',
      hiringLead: 'I am open to hiring opportunities as a developer.',
      hiringStrong: 'Available for interviews.',
      chip1: 'Full-time or Contract',
      chip2: 'Remote or Hybrid',
      chip3: 'Immediate start',
    },
    notFound: {
      title: 'Page not found',
      subtitle: 'The requested address does not exist.',
      cta: 'Back to gallery',
    },
    demos: {
      loading: 'Loading...',
      empty: 'No items found.',
      ecommerceTitle: 'Aurora Store',
      ecommerceSubtitle: 'Catalog, cart, and checkout integrated.',
      yourName: 'Your name',
      helloUser: 'Hi',
      signIn: 'Sign in',
      signOut: 'Sign out',
      searchProducts: 'Search products',
      add: 'Add',
      cart: 'Cart',
      closeCheckout: 'Close checkout',
      checkout: 'Checkout',
      emptyCart: 'Your cart is empty.',
      total: 'Total',
      payment: 'Payment',
      paymentName: 'Name on card',
      paymentCard: 'Card number',
      paymentExpiry: 'Expiry MM/YY',
      paymentCvv: 'CVV',
      confirmPayment: 'Confirm payment',
      paymentInvalid: 'Fill payment details correctly.',
      paymentApproved: 'Payment approved. Order confirmed!',
      weatherTitle: 'Weather Now',
      weatherSubtitle: 'Current conditions in real time.',
      typeCity: 'Type a city',
      checkWeather: 'Check weather',
      cityMissing: 'Type a city.',
      cityNotFound: 'City not found.',
      weatherLoadError: 'Could not load weather.',
      temperature: 'Temperature',
      wind: 'Wind',
      condition: 'Condition',
      variableCondition: 'Variable conditions',
      tasksTitle: 'Task Planner',
      tasksSubtitle: 'Create, edit, and track your daily tasks.',
      newTask: 'New task',
      addTask: 'Add',
      all: 'All',
      open: 'Open',
      done: 'Done',
      noTasks: 'No tasks found.',
      dueDate: 'Due on',
      reopen: 'Reopen',
      complete: 'Complete',
      save: 'Save',
      edit: 'Edit',
      remove: 'Delete',
      portfolioTitle: 'Portfolio',
      portfolioSubtitle: 'Projects, skills, and value proposition.',
      downloadCv: 'Download CV',
      portfolioHeroTitle: "Hi, I'm Joao Ricardo",
      portfolioHeroText:
        'Full-stack developer focused on fast, accessible, and consistent digital experiences.',
      viewCase: 'View case',
      services: 'Services',
      service1: 'Fast landing pages',
      service1Meta: 'Delivery in 7 days',
      service2: 'Consistent design system',
      service2Meta: 'Reusable components',
      service3: 'Post-launch support',
      service3Meta: 'Continuous monitoring',
      blogTitle: 'Blog Studio',
      blogSubtitle: 'Editor, comments, and sharing.',
      newPost: 'New post',
      postTitle: 'Post title',
      writePost: 'Write your post here...',
      publish: 'Publish',
      posts: 'Posts',
      noPosts: 'No posts yet.',
      share: 'Share',
      comments: 'Comments',
      noComments: 'No comments yet.',
      writeComment: 'Write a comment',
      send: 'Send',
      shareSuccess: 'Post shared successfully.',
      shareCopied: 'Link copied to clipboard.',
      shareFail: 'Could not share now.',
      recipesTitle: 'Recipe Search',
      recipesSubtitle: 'Search recipes by ingredient.',
      ingredientPlaceholder: 'Ex: chicken, tomato, cheese',
      search: 'Search',
      viewRecipe: 'View recipe',
      recipeLoadError: 'Could not load recipe.',
      recipeSearchError: 'Could not search recipes.',
      ingredientMissing: 'Type an ingredient.',
      preparation: 'Preparation',
      detailsBelow: 'Details below',
    },
  },
};

const I18nContext = createContext(null);

const getValueByPath = (obj, path) =>
  path.split('.').reduce((acc, key) => (acc && acc[key] ? acc[key] : null), obj);

export const I18nProvider = ({ children }) => {
  const [locale, setLocale] = useState('pt');

  const value = useMemo(() => {
    const t = (key) => {
      const localized = getValueByPath(translations[locale], key);
      if (localized) {
        return localized;
      }
      const fallback = getValueByPath(translations.pt, key);
      return fallback || key;
    };
    return { locale, setLocale, t };
  }, [locale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used inside I18nProvider');
  }
  return context;
};

