// Exemples des boutons avec les variants Shadcn, les tailles et les états
import { Badge } from '@/ui/badge'
import { Button } from '@/ui/button'
export function ButtonSection() {
	return (
		<section className='space-y-6'>
			<h2 className='font-bold'>Exemples de boutons et badges</h2>
			<div className='flex gap-4 flex-wrap'>
				<h3 className='font-semibold w-full'>Exemples de boutons standards avec variants Shadcn</h3>
				{/* Boutons standards avec variants Shadcn si dessous */}
				<Button variant="primary" size='md'>
					Bouton par défaut
				</Button>
				<Button variant='secondary' size='md'>
					Bouton secondaire
				</Button>
				<Button variant="primary-outline" size='md'>
					Bouton outline
				</Button>
				<Button variant='ghost' size='md'>
					Bouton ghost
				</Button>
				<Button variant='ghost' size='md'>
					Bouton link
				</Button>
				<Button variant='secondary' size='md'>
					Bouton destructive
				</Button>
			</div>
			<div className='flex gap-4 flex-wrap'>
				<h3 className='font-semibold w-full'>Exemples de badges standards avec variants Shadcn</h3>
				{/* Badges standards avec variants Shadcn si dessous */}
				<Badge variant="default">Badge par défaut</Badge>
				<Badge variant='secondary'>
					Badge secondaire
				</Badge>
				<Badge variant="outline">
					Badge outline
				</Badge>
				<Badge variant='outline'>Badge ghost</Badge>
				<Badge variant='secondary'>Badge success</Badge>
				<Badge variant='destructive'>
					Badge warning
				</Badge>
				<Badge variant='destructive'>
					Badge error
				</Badge>
				<Badge variant='default'>
					Badge info
				</Badge>
			</div>
		</section>
	)
}
