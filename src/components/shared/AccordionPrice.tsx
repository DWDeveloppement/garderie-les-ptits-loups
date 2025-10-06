import { AccordionContent, AccordionItem, AccordionRoot, AccordionTrigger } from '../ui/accordion'

type AccordionPriceProps = {
	accordionTitle: string
	items: {
		service: string
		price: string
	}[]
}
export function AccordionPrice({ accordionTitle, items }: AccordionPriceProps) {
	return (
		<article className='mb-16'>
			<h3 className='text-xl font-bold text-purple-12 mb-4 text-center'>{accordionTitle}</h3>
			<AccordionRoot type='single' collapsible className='space-y-4'>
				{items.map((item) => (
					<AccordionItem value={item.service} key={item.service}>
						<AccordionTrigger>{item.service}</AccordionTrigger>
						<AccordionContent>
							<table className='w-full'>
								<tbody>
									<tr>
										<td className='py-2 pr-4 text-left'>{item.service}</td>
										<td className='py-2 text-right'>{item.price}</td>
									</tr>
								</tbody>
							</table>
						</AccordionContent>
					</AccordionItem>
				))}
			</AccordionRoot>
		</article>
	)
}