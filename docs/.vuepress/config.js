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
					// {text: 'React基础',link: '/React/'},
					{text: 'React State',link: '/React/React-State'},
					{text: 'React Props',link: '/React/React-Props'},
					{text: 'React Refs',link: '/React/React-Refs'},
					{text: 'React Redux Router',link: '/React/React-Router-Redux'}
				]
			},
			{text: 'webpack', link: '/webpack/'},
			{text: '杂记',
				items: [
					{text: '面试预习', link: '/others/'},
					{text: '面试整理', link: '/others/SomeInterview'},
					{text: '网络连接方式', link: '/others/Connect'},
					{text: '前端监控', link: '/others/Monitor'},
					{text: '性能优化', link: '/others/Performance'},
					{text: '随手写代码', link: '/others/SomeJS'},
					{text: 'Promise代码', link: '/others/myPromise'}
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
				['React-State', 'React State'],
				['React-Props', 'React Props'],
				['React-Refs', 'React Refs'],
				['React-Router-Redux', 'React Redux Router']
			],
			'/webpack/':[
				['', 'webpack']
			],
			'/others/':[
				['', '面试预习'],
				['SomeJS', '随手写代码'],
				['myPromise', '简单Promise'],
				['SomeInterview', '面试整理'],
				['Connect', '网络连接方式'],
				['Monitor', '前端监控'],
				['Performance', '性能优化']
			],
		}
	}
}