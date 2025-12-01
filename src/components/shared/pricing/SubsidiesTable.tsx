'use client'

import { useBreakpoint } from '@/hooks'

type SubsidiesTableProps = {
	subsidies: {
		labelIncomeRange: string
		labelReduction: string
		items: { incomeRange: string; subsidy: string }[]
	}
}

export function SubsidiesTable({ subsidies }: SubsidiesTableProps) {
	const { isCustom } = useBreakpoint()

	// Rendu simplifié pour écrans < 460px (test avec breakpoint custom)
	if (isCustom(450)) {
		return (
			<div className='space-y-3'>
				{subsidies.items.map((item, index) => (
					<div
						key={index}
						className='bg-white p-4 rounded-lg border border-orange-6 shadow-sm hover:shadow-md transition-shadow duration-200'>
						<div className='text-fl-base font-bold text-orange-11 uppercase mb-2 tracking-wider'>Revenus</div>
						<div className='text-fl-base font-semibold text-purple-11 mb-3 leading-relaxed'>{item.incomeRange}</div>
						<div className='text-fl-base font-bold text-orange-11 uppercase mb-2 tracking-wider'>Subvention</div>
						<div className='text-fl-base text-orange-10 font-semibold'>{`CHF ${item.subsidy}`}</div>
					</div>
				))}
			</div>
		)
	}

	// Rendu tableau HTML natif pour écrans plus grands (>375px)
	return (
		<div className='overflow-x-auto rounded-lg shadow-sm border border-orange-6'>
			<table className='w-full'>
				<thead>
					<tr className='bg-orange-2 border-b border-orange-6'>
						<th className='px-6 py-4 text-left text-fl-base font-bold text-orange-11 uppercase tracking-wider'>
							{subsidies.labelIncomeRange}
						</th>
						<th className='px-6 py-4 text-left text-fl-base font-bold text-orange-11 uppercase tracking-wider'>
							{subsidies.labelReduction}
						</th>
					</tr>
				</thead>
				<tbody className='bg-white divide-y divide-orange-6'>
					{subsidies.items.map((item, index) => (
						<tr key={index} className={`hover:bg-orange-1 transition-colors duration-200 ${index % 2 === 0 ? 'bg-white' : 'bg-orange-1'}`}>
							<td className='px-6 py-4 text-fl-base font-semibold text-purple-11 whitespace-nowrap'>{item.incomeRange}</td>
							<td className='px-6 py-4 text-fl-base text-orange-10 font-semibold whitespace-nowrap'>{`CHF ${item.subsidy}`}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}
