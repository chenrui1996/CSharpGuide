import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "CSharpGuide",
  description: "CSharpGuide",
  head: [['link', { rel: 'icon', type: "image/x-icon", href: 'logo.png'}]],
  themeConfig: {
    logo:'/logo.png',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '主页', link: '/' },
      {
        text: 'C#',
        items: [
          { text: 'C#语言', link: '/c-sharp/programming-language' },
          { text: '.Net Core', link: '' },
          { text: 'EF Core', link: '' },
          { text: 'WPF', link: ''},
          { text: 'Winform', link: ''},
          { text: 'MAUI', link: ''},
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
          { text: 'Oracle', link: ''}
        ]
      },
      {
        text: '部署',
        items: [
          { text: 'IIS', link: '' },
          { text: 'Docker', link: '' },
          { text: 'K8S', link: '' },
          { text: 'CI/DI', link: ''},
          { text: 'Linux', link: '' },
        ]
      },
      {
        text: '通信',
        items: [
          { text: 'Socket', link: '' },
          { text: '接口', link: '' },
          { text: 'Modbus', link: '' },
          { text: 'S7', link: '' },
          { text: 'Serial', link: ''},
          { text: 'Bluetooth', link: ''},
          { text: 'Zigbee', link: ''},
          { text: '消息队列', link: ''},
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
      { text: 'Git', link: '' },
      { text: '实践', link: '' },
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

    sidebar: [
      {
        text: 'C#语言',
        collapsed: true,
        items: [
          { text: 'C#', link: '/c-sharp/programming-language' },
          { text: '.Net Core', link: '' },
          { text: 'EF Core', link: '' },
          { text: 'WPF', link: ''},
          { text: 'Winform', link: ''},
          { text: 'MAUI', link: ''},
        ]
      },
      {
        text: '前端',
        collapsed: true,
        items: [
          { text: 'HTML/CSS', link: '' },
          { text: 'JavaScript', link: '' },
          { text: 'Vue', link: '' },
        ]
      },
    ],

    // socialLinks: [
    //   // { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    // ]
  },
  base: '/CSharpGuide/'
})
