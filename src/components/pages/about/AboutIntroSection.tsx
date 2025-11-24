import { RichTextRenderer } from '@/components/shared/richtext/RichTextRenderer';
import type { PortableTextBlock } from '@/sanity/types/core/portableText';
import { Card, CardContent } from '@/ui/card';

type AboutIntroSectionProps = {
  content: PortableTextBlock[];
};

export function AboutIntroSection({ content }: AboutIntroSectionProps) {
  return (
    <section className='gradient-section-a px-4 py-16 sm:px-6 lg:px-8'>
      <Card variant='primary' className='mx-auto max-w-4xl'>
        <CardContent className='p-8'>
          <RichTextRenderer content={content} />
        </CardContent>
      </Card>
    </section>
  );
}
