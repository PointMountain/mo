module.exports = {
  base: '/mo/',
  title: '个人文档',
  description: '练习文档',
  head: [
    ['link', { rel: 'shortcut icon', type: "image/x-icon", href: `/favicon.ico` }]
  ],
  themeConfig: {
    nav: [
      {text: 'Home', link: '/'},
      {text: 'Guide', link: '/guide/'}
    ]
  }
}