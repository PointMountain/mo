module.exports = {
  base: '/mo/',
  title: 'Ming',
  description: '学习文档',
  head: [
    ['link', { rel: 'shortcut icon', type: "image/x-icon", href: 'favicon.ico' }]
  ],
  themeConfig: {
    nav: [
			{text: 'Home', link: '/'},
			{text: 'Javascript基础', link: '/Javascript/base'},
			{text: 'Vue',
				items: [
					{ text: 'Vue基础使用', link: '/Vue/Vue-base' },
					{ text: 'Vue高级特性', link: '/Vue/Vue-advanced' },
					{ text: 'Vuex', link: '/Vue/Vuex' },
					{ text: 'Vue-router', link: '/Vue/Vue-router' },
					{ text: 'Vue原理', link: '/Vue/Vue-principle' },
					{ text: 'Vue源码解析', link: '/Vue/Vue-code' }
				]
			},
      {text: 'GayHub', link: 'https://github.com/PointMountain/mo'}
		],
		sidebar: {
			'/Vue/':[
				'',
				['Vue-base', 'Vue基础使用'],
				['Vue-advanced', 'Vue高级特性'],
				'Vuex',
				'Vue-router',
				['Vue-principle', 'Vue原理'],
				['Vue-code', 'Vue源码解析'],
			],
			'/Javascript/':[
				['base', 'Javascript基础']
			]
		}
	}
}