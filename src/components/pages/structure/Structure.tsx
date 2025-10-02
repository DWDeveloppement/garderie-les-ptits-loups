import { StructureData } from '@/types/queries/structure'
export function Structure({ structuresDatas }: { structuresDatas: StructureData }) {
	return <div>{structuresDatas.title}</div>
}