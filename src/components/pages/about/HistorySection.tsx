import Image from 'next/image';

import { RichTextRenderer } from '@/components/shared/richtext/RichTextRenderer';
import type { PortableTextBlock } from '@/sanity/types/core/portableText';
import { Card, CardContent } from '@/ui/card';

type HistorySectionProps = {
  content?: PortableTextBlock[];
  historyImage: {
    url: string;
    alt?: string;
    width: number;
    height: number;
  };
};
export function HistorySection({ content, historyImage }: HistorySectionProps) {
  return (
    <section className='gradient-section-b px-4 py-16 sm:px-6 lg:px-8'>
      <div className='mx-auto max-w-7xl'>
        <div className='flex flex-col items-center justify-center gap-8 md:flex-row md:gap-12'>
          {/* Contenu Rich Text */}
          <div className='flex items-center justify-center'>{content && <RichTextRenderer content={content} />}</div>
          {historyImage && (
            <Card className='group flex h-auto max-h-128 w-full max-w-128 min-w-80 items-center justify-center overflow-hidden p-0'>
              <CardContent className='relative h-full w-full p-0'>
                <Image
                  src={historyImage.url}
                  alt={historyImage.alt || 'Image historique'}
                  width={historyImage.width}
                  height={historyImage.height}
                  className='h-full w-full object-cover transition-all duration-300 group-hover:scale-105'
                />
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
}
