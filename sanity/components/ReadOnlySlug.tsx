/**
 * Composant pour afficher un slug en lecture seule avec avertissement
 */
import { WarningOutlineIcon } from '@sanity/icons'
import { Box, Card, Stack, Text } from '@sanity/ui'
import { StringInputProps } from 'sanity'

export function ReadOnlySlug(props: StringInputProps) {
	const { value } = props

	return (
		<Stack space={3}>
			<Card padding={3} radius={2} shadow={1} tone="caution">
				<Stack space={2}>
					<Box>
						<Text size={1} weight="semibold">
							<WarningOutlineIcon style={{ marginRight: '8px', verticalAlign: 'middle' }} />
							Slug non modifiable
						</Text>
					</Box>
					<Text size={1} muted>
						Ce slug est lié au routing Next.js. Le modifier cassera le site.
						<br />
						Si vous devez vraiment le changer, contactez le développeur.
					</Text>
				</Stack>
			</Card>

			<Card padding={3} radius={2} border tone="transparent">
				<Stack space={2}>
					<Text size={1} weight="medium">
						URL actuelle :
					</Text>
					<Text
						size={2}
						weight="bold"
						style={{
							fontFamily: 'monospace',
							color: '#2563eb',
							padding: '8px 12px',
							background: '#f1f5f9',
							borderRadius: '4px',
							userSelect: 'all',
						}}>
						{typeof value === 'string' ? value : (value as any)?.current || '(non défini)'}
					</Text>
				</Stack>
			</Card>
		</Stack>
	)
}

