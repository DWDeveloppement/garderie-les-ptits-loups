import { StructureData } from '@/types/queries/structure'

export function OtherStructure({ structuresDatas }: { structuresDatas: StructureData }) {
	return <div>{structuresDatas.title}</div>
}