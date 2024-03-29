module.exports = {
	base: '/mo/',
	title: 'Ming',
	description: '学习文档',
	head: [
		['link', {
			rel: 'shortcut icon',
			type: "image/x-icon",
			href: 'favicon.ico'
		}]
	],
	themeConfig: {
		nav: [{
				text: 'Home',
				link: '/'
			},
			{
				text: 'Vue',
				items: [{
						text: 'Vue基础使用',
						link: '/Vue/Vue-base'
					},
					{
						text: 'Vue高级特性',
						link: '/Vue/Vue-advanced'
					},
					{
						text: 'Vuex',
						link: '/Vue/Vuex'
					},
					{
						text: 'Vue-router',
						link: '/Vue/Vue-router'
					},
					{
						text: 'Vue原理',
						link: '/Vue/Vue-principle'
					},
					{
						text: 'Vue源码解析',
						link: '/Vue/Vue-code'
					}
				]
			},
			{
				text: 'React',
				items: [
					// {text: 'React基础',link: '/React/'},
					{
						text: 'React State',
						link: '/React/React-State'
					},
					{
						text: 'React Props',
						link: '/React/React-Props'
					},
					{
						text: 'React Refs',
						link: '/React/React-Refs'
					},
					{
						text: 'React Router',
						link: '/React/React-Router'
					},
					{
						text: 'React Redux Router',
						link: '/React/React-Redux'
					},
					{
						text: 'React Extension',
						link: '/React/React-Extension'
					},
					{
						text: 'React脚手架配置代理',
						link: '/React/React-cli-proxy'
					}
				]
			},
			{
				text: 'webpack',
				items: [{
						text: '基础学习',
						link: '/webpack/Base'
					},
					{
						text: '原理学习',
						link: '/webpack/Principle'
					}
				]
			},
			{
				text: 'Typescript',
				link: '/Typescript/'
			},
			{
				text: '面试整理',
				items: [{
						text: '2020面试',
						link: '/Interview/2020'
					},
					{
						text: '2021面试',
						link: '/Interview/2021'
					}
				]
			},
			{
				text: '杂记',
				items: [{
						text: '基础学习',
						link: '/others/Base'
					},
					{
						text: '网络学习',
						link: '/others/Network'
					},
					{
						text: '网络连接方式',
						link: '/others/Connect'
					},
					{
						text: '前端监控',
						link: '/others/Monitor'
					},
					{
						text: '性能优化',
						link: '/others/Performance'
					},
					{
						text: '随手写代码',
						link: '/others/SomeJS'
					},
					{
						text: 'Promise代码',
						link: '/others/myPromise'
					}
				]
			},
			{
				text: 'GayHub',
				link: 'https://github.com/PointMountain/mo'
			}
		],
		sidebar: {
			'/Vue/': [
				'',
				['Vue-base', 'Vue基础使用'],
				['Vue-advanced', 'Vue高级特性'],
				'Vuex',
				'Vue-router',
				['Vue-principle', 'Vue原理'],
				['Vue-code', 'Vue源码解析'],
			],
			'/React/': [
				['', 'React基础'],
				['React-State', 'React State'],
				['React-Props', 'React Props'],
				['React-Refs', 'React Refs'],
				['React-Router', 'React Router'],
				['React-Redux', 'React Redux'],
				['React-Extension', 'React Extension'],
				['React-cli-proxy', 'React脚手架配置代理']
			],
			'/webpack/': [
				['Base', 'webpack'],
				['Principle', '原理']
			],
			'/Typescript/': [
				['', 'Typescript基础']
			],
			'/Interview/': [
				['2020', '2020面试整理'],
				['2021', '2021面试整理']
			],
			'/others/': [
				['Base', '基础学习'],
				['Network', '网络学习'],
				['SomeJS', '随手写代码'],
				['myPromise', '简单Promise'],
				['Connect', '网络连接方式'],
				['Monitor', '前端监控'],
				['Performance', '性能优化']
			],
		}
	}
}