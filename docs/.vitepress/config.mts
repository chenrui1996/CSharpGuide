import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "StudyGuide",
  description: "Study Guide",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '主页', link: '/' },
      {
        text: '计算机基础',
        items: [
          { text: '数据结构与算法', link: '' },
        ]
      },
      {
        text: 'C#',
        items: [
          { text: 'C#', link: '' },
          { text: '.Net Core', link: '' },
          { text: 'EF Core', link: '' },
          { text: 'WPF', link: ''},
          { text: 'Winform', link: ''},
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
          { text: 'MAUI', link: ''},
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
        ]
      },
      {
        text: '通信',
        items: [
          { text: 'Socket', link: '' },
          { text: 'Modbus', link: '' },
          { text: 'S7', link: '' },
          { text: 'Serial', link: ''},
          { text: 'Bluetooth', link: ''},
          { text: 'Zigbee', link: ''},
          { text: '消息队列', link: ''},
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
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    // socialLinks: [
    //   // { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    // ]
  },
  base: '/Study-Guide/'
})
