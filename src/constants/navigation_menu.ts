export const navigationMenu = [
	{
		id: 0,
		label: 'Accueil',
		href: '/',
	},
	{
		id: 1,
		label: 'À propos',
		href: '/a-propos',
	},
	{
		id: 2,
		label: 'Notre Structure',
		subMenu: [
			{
				id: 2.1,
				label: 'La Nurserie',
				href: '/la-structure/nurserie',
			},
			{
				id: 2.2,
				label: 'Les Trotteurs',
				href: '/la-structure/trotteurs',
			},
			{
				id: 2.3,
				label: 'Les Grands',
				href: '/la-structure/grands',
			},
			{
				id: 2.4,
				label: 'Nos autres espaces',
				href: '/la-structure/autres-espaces',
			},
		],
	},
	{
		id: 3,
		label: 'Tarifs',
		href: '/tarifs',
	},
	{
		id: 4,
		label: 'Contact',
		href: '/contact',
	},
]
