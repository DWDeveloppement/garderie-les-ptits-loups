import { AccordionContent, AccordionItem, AccordionRoot, AccordionTrigger } from '../ui/accordion'

type AccordionPriceProps = {
	accordionItem: string
	accordionContent: {
		prestation: string
		price: number
	}[]
}
export function AccordionPrice({ accordionItem, accordionContent }: AccordionPriceProps) {
    return (
        <article className='mb-16'>
            <h3 className='text-xl font-bold text-purple-12 mb-4 text-center'>{accordionItem}</h3>
		<AccordionRoot type='single' collapsible className='space-y-4'>
			{accordionContent.map((item) => (
				<AccordionItem value={item.prestation} key={item.prestation}>
					<AccordionTrigger>{item.prestation}</AccordionTrigger>
                    <AccordionContent>
                        <table>
                            <tr>
                                <td>{item.prestation}</td>
                                <td>{item.price}</td>
                            </tr>
                        </table>
                    </AccordionContent>
				</AccordionItem>
			))}
		</AccordionRoot>
        </article>
	)
}