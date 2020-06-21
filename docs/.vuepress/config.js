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
			{text: 'React',
				items: [
					{text: 'React基础',link: '/React/'},
					{text: 'React Redux Router',link: '/React/React-Router-Redux'}
				]
			},
			{text: 'webpack', link: '/webpack/'},
			{text: '面试', 
				items: [
					{text: '面试整理', link: '/Interview/'},
					{text: '部分JS代码', link: '/Interview/someJs'},
					{text: '简单Promise', link: '/Interview/myPromise'}
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
			],
			'/React/':[
				['', 'React基础'],
				['React-Router-Redux', 'React Redux Router']
			],
			'/webpack/':[
				['', 'webpack']
			],
			'/Interview/':[
				['', '面试整理'],
				['someJs', '部分JS代码'],
				['myPromise', '简单Promise'],
				['5-21', '2020-5-21面试经历'],
				['continue', '面试后重新学习']
			]
		}
	}
}