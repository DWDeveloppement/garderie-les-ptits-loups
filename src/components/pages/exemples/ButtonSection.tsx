// Exemples des boutons avec les variants Shadcn, les tailles et les états
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
export function ButtonSection() {
	return (
		<section className='space-y-6'>
			<h2 className='font-bold'>Exemples de boutons et badges</h2>
			<div className='flex gap-4 flex-wrap'>
				<h3 className='font-semibold w-full'>Exemples de boutons standards avec variants Shadcn</h3>
				{/* Boutons standards avec variants Shadcn si dessous */}
				<Button variant='default' size='default'>
					Bouton par défaut
				</Button>
				<Button variant='secondary' size='default'>
					Bouton secondaire
				</Button>
				<Button variant='outline' size='default'>
					Bouton outline
				</Button>
				<Button variant='ghost' size='default'>
					Bouton ghost
				</Button>
				<Button variant='link' size='default'>
					Bouton link
				</Button>
				<Button variant='destructive' size='default'>
					Bouton destructive
				</Button>
			</div>
			<div className='flex gap-4 flex-wrap'>
				<h3 className='font-semibold w-full'>Exemples de badges standards avec variants Shadcn</h3>
				{/* Badges standards avec variants Shadcn si dessous */}
				<Badge variant='default'>Badge par défaut</Badge>
				<Badge variant='secondary' size='md'>
					Badge secondaire
				</Badge>
				<Badge variant='outline' size='lg'>
					Badge outline
				</Badge>
				<Badge variant='ghost'>Badge ghost</Badge>
				<Badge variant='success'>Badge success</Badge>
				<Badge variant='warning' size='lg'>
					Badge warning
				</Badge>
				<Badge variant='error' size='sm'>
					Badge error
				</Badge>
				<Badge variant='info' size='lg'>
					Badge info
				</Badge>
			</div>
		</section>
	)
}
