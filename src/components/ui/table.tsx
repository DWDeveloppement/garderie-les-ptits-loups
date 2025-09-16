// Composant UI utilisant Radix Theme avec displayName
/*
exemple complet composant table de Radix UI: 
Doc: https://www.radix-ui.com/themes/docs/components/table
jsx:https://github.com/radix-ui/themes/blob/main/packages/radix-ui-themes/src/components/table.tsx
css:https://github.com/radix-ui/themes/tree/main/packages/radix-ui-themes/src/components/table

<Table.Root>
	<Table.Header>
		<Table.Row>
			<Table.ColumnHeaderCell>Full name</Table.ColumnHeaderCell>
			<Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
			<Table.ColumnHeaderCell>Group</Table.ColumnHeaderCell>
		</Table.Row>
	</Table.Header>

	<Table.Body>
		<Table.Row>
			<Table.RowHeaderCell>Danilo Sousa</Table.RowHeaderCell>
			<Table.Cell>danilo@example.com</Table.Cell>
			<Table.Cell>Developer</Table.Cell>
		</Table.Row>

		<Table.Row>
			<Table.RowHeaderCell>Zahra Ambessa</Table.RowHeaderCell>
			<Table.Cell>zahra@example.com</Table.Cell>
			<Table.Cell>Admin</Table.Cell>
		</Table.Row>

		<Table.Row>
			<Table.RowHeaderCell>Jasper Eriksson</Table.RowHeaderCell>
			<Table.Cell>jasper@example.com</Table.Cell>
			<Table.Cell>Developer</Table.Cell>
		</Table.Row>
	</Table.Body>
</Table.Root>

<Table.Root>
	<Table.Header>
		<Table.Row>
			<Table.ColumnHeaderCell>Full name</Table.ColumnHeaderCell>
			<Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
			<Table.ColumnHeaderCell>Group</Table.ColumnHeaderCell>
		</Table.Row>
	</Table.Header>

	<Table.Body>
		<Table.Row>
			<Table.RowHeaderCell>Danilo Sousa</Table.RowHeaderCell>
			<Table.Cell>danilo@example.com</Table.Cell>
			<Table.Cell>Developer</Table.Cell>
		</Table.Row>

		<Table.Row>
			<Table.RowHeaderCell>Zahra Ambessa</Table.RowHeaderCell>
			<Table.Cell>zahra@example.com</Table.Cell>
			<Table.Cell>Admin</Table.Cell>
		</Table.Row>

		<Table.Row>
			<Table.RowHeaderCell>Jasper Eriksson</Table.RowHeaderCell>
			<Table.Cell>jasper@example.com</Table.Cell>
			<Table.Cell>Developer</Table.Cell>
		</Table.Row>
	</Table.Body>
</Table.Root>
*/
// Composant Table restructuré avec displayName
import { Table as RadixTable } from '@radix-ui/themes'
import * as React from 'react'

// Types pour les composants Table
export type TableRootProps = React.ComponentProps<typeof RadixTable.Root>
export type TableHeaderProps = React.HTMLAttributes<HTMLDivElement>
export type TableBodyProps = React.HTMLAttributes<HTMLDivElement>
export type TableRowProps = React.HTMLAttributes<HTMLDivElement>
export type TableCellProps = React.HTMLAttributes<HTMLDivElement>
export type TableRowHeaderCellProps = React.HTMLAttributes<HTMLDivElement>
export type TableColumnHeaderCellProps = React.HTMLAttributes<HTMLDivElement>


const Table = React.forwardRef<React.ElementRef<typeof RadixTable.Root>, TableRootProps>(({ children, ...props }, ref) => {
	return (
		<RadixTable.Root ref={ref} {...props}>
			{children}
		</RadixTable.Root>
	)
})
Table.displayName = 'Table'

const TableHeader = React.forwardRef<React.ElementRef<typeof RadixTable.Header>, TableHeaderProps>(({children, ...props}, ref) => {
	return (
		<RadixTable.Header ref={ref} {...props}>
			{children}
		</RadixTable.Header>
	)
})
TableHeader.displayName = 'TableHeader'

const TableBody = React.forwardRef<React.ElementRef<typeof RadixTable.Body>, TableBodyProps>(({children, ...props}, ref) => {
	return (
		<RadixTable.Body ref={ref} {...props}>
			{children}
		</RadixTable.Body>
	)
})
TableBody.displayName = 'TableBody'

const TableRow = React.forwardRef<React.ElementRef<typeof RadixTable.Row>, TableRowProps>(({children, ...props}, ref) => {
	return (
		<RadixTable.Row ref={ref} {...props}>
			{children}
		</RadixTable.Row>
	)
})
TableRow.displayName = 'TableRow'

const TableCell = React.forwardRef<React.ElementRef<typeof RadixTable.Cell>, TableCellProps>(({children, ...props}, ref) => {
	return (
		<RadixTable.Cell ref={ref} {...props}>
			{children}
		</RadixTable.Cell>
	)
})
TableCell.displayName = 'TableCell'

const TableRowHeaderCell = React.forwardRef<React.ElementRef<typeof RadixTable.RowHeaderCell>, TableRowHeaderCellProps>(({children, ...props}, ref) => {
	return (
		<RadixTable.RowHeaderCell ref={ref} {...props}>
			{children}
		</RadixTable.RowHeaderCell>
	)
})
TableRowHeaderCell.displayName = 'TableRowHeaderCell'

const TableColumnHeaderCell = React.forwardRef<React.ElementRef<typeof RadixTable.ColumnHeaderCell>, TableColumnHeaderCellProps>(({children, ...props}, ref) => {
	return (
		<RadixTable.ColumnHeaderCell ref={ref} {...props}>
			{children}
		</RadixTable.ColumnHeaderCell>
	)
})
TableColumnHeaderCell.displayName = 'TableColumnHeaderCell'

export { Table, TableBody, TableCell, TableColumnHeaderCell, TableHeader, TableRow, TableRowHeaderCell }
