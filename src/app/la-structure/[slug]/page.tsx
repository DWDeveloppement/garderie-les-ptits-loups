import { OtherStructure } from '@/components/pages/other-structure/OtherStructure'
import { Structure } from '@/components/pages/structure/Structure'
import { notFound } from 'next/navigation'
import { structures as structuresData } from '../../../data/response-queries/structures'
export default function StructurePage({ params }: { params: { slug: string } }) {
    const { slug } = params
    const structure = structuresData.find((structure) => structure.slug === slug)
    if (!structure) {
        notFound()
    }else if (structure.id === 'otherSpaces') {
			return <OtherStructure data={structure} />
		}
	return <Structure structure={structure} />
}