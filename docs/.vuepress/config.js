module.exports = {
  base: '/mo/',
  title: '明明',
  description: '学习文档',
  head: [
    ['link', { rel: 'shortcut icon', type: "image/x-icon", href: 'favicon.ico' }]
  ],
  themeConfig: {
    nav: [
      {text: 'Home', link: '/'},
			{text: 'Vue',
				items: [
					{ text: 'Vue基础使用', link: '/Vue/Vue-base' },
					{ text: 'Vue高级特性', link: '/Vue/Vue-advanced' }
				]
			},
      {text: 'GayHub', link: 'https://github.com/PointMountain/mo'}
		],
		sidebar: {
			'/Vue/':[
				'',
				['Vue-base', 'Vue基础使用'],
				['Vue-advanced', 'Vue高级特性'],
			]
		}
  }
}