'use client'

import { SubsidiesData } from '@/data/prices'

type SubsidiesTableProps = {
	subsidies: SubsidiesData
}

export function SubsidiesTable({ subsidies }: SubsidiesTableProps) {
	return (
		<section className="mb-16">
			<div className="text-center mb-8">
				<h2 className="text-2xl font-bold text-purple-12 mb-2">
					{subsidies.title}
				</h2>
				<p className="text-orange-10">
					Réductions applicables selon vos revenus mensuels
				</p>
			</div>

			{/* Version Desktop */}
			<div className="hidden md:block">
				<div className="bg-white rounded-lg shadow-lg overflow-hidden">
					<table className="w-full">
						<thead className="bg-purple-9 text-white">
							<tr>
								<th className="py-4 px-6 text-left font-semibold">
									Tranche de revenus
								</th>
								<th className="py-4 px-6 text-center font-semibold">
									Réduction
								</th>
								<th className="py-4 px-6 text-left font-semibold">
									Description
								</th>
							</tr>
						</thead>
						<tbody>
							{subsidies.items.map((item, index) => (
								<tr 
									key={index}
									className={`border-b border-orange-4 ${
										index % 2 === 0 ? 'bg-orange-1' : 'bg-white'
									}`}
								>
									<td className="py-4 px-6 font-medium text-purple-11">
										{item.incomeRange}
									</td>
									<td className="py-4 px-6 text-center">
										<span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-orange-9 text-white">
											{item.reduction}%
										</span>
									</td>
									<td className="py-4 px-6 text-orange-10">
										{item.description}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>

			{/* Version Mobile */}
			<div className="md:hidden space-y-4">
				{subsidies.items.map((item, index) => (
					<div 
						key={index}
						className="bg-white rounded-lg shadow-lg p-4 border-l-4 border-purple-9"
					>
						<div className="flex justify-between items-start mb-2">
							<h3 className="font-semibold text-purple-11 text-sm">
								{item.incomeRange}
							</h3>
							<span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-orange-9 text-white">
								{item.reduction}%
							</span>
						</div>
						<p className="text-orange-10 text-sm">
							{item.description}
						</p>
					</div>
				))}
			</div>
		</section>
	)
}
