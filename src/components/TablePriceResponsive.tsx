// Composant qui aura une logique pour afficher soit un tableau standard pour ordinateur, soit une version mobile sur 4 celules en 2 colonnes.
// Composant ui tablePrice.tsx et mobile ui tableMobilePrice.tsx

// Mobile Rendering component

import { Table, TableColumnHeaderCell, TableHeader, TableRow } from '@/components/ui/table'

import { SubsidiesDocument, labelHading } from '@/data/prices'
type tablePriceResponsiveProps = {
	subventionsData: SubsidiesDocument
	labelHading: typeof labelHading
}
export function TablePriceResponsive({subventionsData, labelHading}:tablePriceResponsiveProps) {
	return (
        <Table>
            {labelHading.map((item, index) => {
                return (
                    <TableHeader key={index}>
                        <TableRow>
                            <TableColumnHeaderCell>{item.incomeRange}</TableColumnHeaderCell>
                            <TableColumnHeaderCell>{item.reductionDaily} CHF</TableColumnHeaderCell>
                        </TableRow>
                    </TableHeader>
                )
            })}
		</Table>
	)
}