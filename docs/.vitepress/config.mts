import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "CSharpGuide",
  description: "CSharpGuide",
  head: [['link', { rel: 'icon', type: "image/x-icon", href: 'logo.png' }]],
  themeConfig: {
    logo: '/logo.png',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '主页', link: '/' },
      {
        text: 'C#',
        items: [
          { text: 'C#基础', link: '/c-sharp/basic/0.概述' },
          { text: 'Web后端', link: '/c-sharp/web/0.引言' },
          { text: 'WPF', link: '' },
          { text: 'Winform', link: '' },
          { text: 'MAUI', link: '' },
          { text: '常见应用', link: '' },
        ]
      },
      {
        text: '前端',
        items: [
          { text: 'HTML/CSS', link: '' },
          { text: 'JavaScript', link: '' },
          { text: 'Vue', link: '' },
        ]
      },
      {
        text: '移动端',
        items: [
          { text: 'Android', link: '' },
          { text: 'iOS', link: '' },
          { text: 'uni-app', link: '' },
        ]
      },
      {
        text: '数据库',
        items: [
          { text: 'Redis', link: '' },
          { text: 'MySQL', link: '' },
          { text: 'PostgreSQL', link: '' },
          { text: 'SQL Server', link: '' },
          { text: 'Oracle', link: '' }
        ]
      },
      // {
      //   text: '部署',
      //   items: [
      //     { text: 'IIS', link: '' },
      //     { text: 'Docker', link: '' },
      //     { text: 'K8S', link: '' },
      //     { text: 'CI/DI', link: '' },
      //     { text: 'Linux', link: '' },
      //   ]
      // },
      {
        text: '通信',
        items: [
          { text: 'Socket', link: '' },
          { text: '接口', link: '' },
          { text: 'Modbus', link: '' },
          { text: 'S7', link: '' },
          { text: 'Serial', link: '' },
          { text: 'Bluetooth', link: '' },
          { text: 'Zigbee', link: '' },
          { text: '消息队列', link: '' },
        ]
      },
      {
        text: '计算机基础',
        items: [
          { text: '计算机网络', link: '' },
          { text: '数据结构', link: '' },
          { text: '算法', link: '' },
        ]
      },
      {
        text: '系统设计',
        items: [
          { text: '基础知识', link: '' },
          { text: '认证授权', link: '' },
          { text: '数据安全', link: '' },
          { text: '设计模式', link: '' },
        ]
      },
      {
        text: '工具',
        items: [
          { text: 'Git', link: '/tools/git/git' },
          { text: 'Visual Studio', link: '/tools/visual-studio/visual-studio' },
        ]
      },
      {
        text: '企业信息化',
        items: [
          { text: 'ERP', link: '' },
          { text: 'MES', link: '' },
          { text: 'WMS', link: '' },
          { text: 'SRM', link: '' },
          { text: 'APS', link: '' },
          { text: 'OMS', link: '' },
        ]
      },
    ],

    sidebar: {
      "/c-sharp/basic/": [
        {
          base: "/c-sharp/basic/",
          text: 'C#基础',
          // collapsed: false,
          items: [
            {
              text: '概述',
              link: '/0.概述/',
            },
            {
              text: '特性',
              link: '/1.特性/',
            },
            // { text: '结构', link: '/c-sharp/basic/2.结构/' },
            {
              text: '类型系统',
              link: '/3.类型系统/'
            },
            {
              text: '泛型',
              link: '/4.泛型/'
            },
            {
              text: '集合',
              link: '/5.集合/'
            },
            {
              text: '运算符与表达式',
              link: '/6.运算符与表达式/'
            },
            {
              text: '语句',
              link: '/7.语句/'
            },
            {
              text: '方法',
              link: '/8.方法/'
            },
            {
              text: '委托与事件',
              link: '/9.委托与事件/'
            },
            {
              text: '类与接口',
              link: '/10.类与接口/'
            },
            {
              text: '面向对象',
              link: '/11.面向对象/'
            },
            {
              text: '语言集成查询 (LINQ)',
              link: '/12.LINQ/'
            },
            {
              text: '异步编程与多线程',
              link: '/13.异步编程与多线程/'
            },
          ]
        }
      ],
      "/c-sharp/web/": [
        {
          base: "/c-sharp/web/",
          text: 'Web后端',
          // collapsed: false,
          items: [
            {
              text: '引言',
              link: '/0.引言/',
            },
            {
              text: '代码结构与基本功能',
              link: '/1.代码结构与基本功能/',
            },
            {
              text: '主机(Host)',
              link: '/2.主机/',
            },
            {
              text: '依赖注入(Dependency injection)',
              link: '/3.依赖注入/',
            },
            {
              text: '中间件(Middleware)',
              link: '/4.中间件与管道/',
            },
            {
              text: '路由和控制器(Routing)',
              link: '/5.路由和控制器/',
            },
            {
              text: '其他基本功能',
              link: '/6.其他基本功能/',
            },
            {
              text: 'EF Core',
              link: '/7.EF Core/',
            },
            {
              text: '视图与UI',
              link: '/8.视图与UI/',
            },
            {
              text: '认证与授权',
              link: '/9.认证与授权/',
            },
            {
              text: '部署与发布',
              link: '/10.部署与发布/',
            },
            {
              text: '其他实践',
              base: "/c-sharp/web/其他实践/",
              items: [
                {
                  text: '使用SignalR实现实时通信',
                  link: '/1.使用SignalR实现实时通信/',
                },
                {
                  text: '使用个gRPC实现高可用服务',
                  link: '/2.使用个gRPC实现高可用服务/',
                },
                {
                  text: '使用Redis',
                },
                {
                  text: '使用Quarze',
                },
              ]
            },
          ]
        }
      ],
      "/tools/": [
        {
          base: "/tools/",
          text: '工具',
          // collapsed: false,
          items: [
            {
              text: 'Git',
              link: '/git/git/'
            },
            {
              text: 'Visual Studio',
              link: '/visual-studio/visual-studio/'
            }
          ]
        }
      ]
    },

    docFooter: {
      prev: false,
      next: false
    },


    outline: {
      level: "deep",
      label: "本页内容"
    },


    socialLinks: [
      { icon: 'github', link: 'https://github.com/chenrui1996/CSharpGuide' }
    ]
  },
  ignoreDeadLinks: true,
  base: '/CSharpGuide/'
})
