import Link from 'next/link';

import { MobileNavigationClient } from '@/components/lazy/ClientOnlyComponents';
import { MAP_INFO_DEFAULT } from '@/constants/map_info_default';

import { Icon } from '../icons/Icon';
import { Separator } from '../ui/separator';
import { getLayoutData } from 'lib/sanity/queries/shared';

export async function Footer() {
  // Récupération des données de layout (Footer + Partners) depuis Sanity (avec cache React)
  const { footer } = await getLayoutData();
  const data = footer;
  return (
    <footer className='bg-purple-12 text-orange-1 mb-16 md:mb-0'>
      <div className='mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8'>
        <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-4'>
          {/* Logo et Description */}
          <div className='lg:col-span-2'>
            <h2 className='text-orange-6 text-fl-xl mb-4 font-bold'>{data?.contactInfo?.name}</h2>
            {/* Description de la garderie qui viendra de Sanity depuis contact.ts de contactInfo fields description*/}
            <p className='text-orange-4 mb-4 leading-relaxed'>{data?.contactInfo?.description}</p>
            <div className='flex space-x-4'>
              {/* Socials seront retournés depuis Sanity et rendus si le tableau des liens sociaux n'est pas vide. 
                  Pour l'instant rien dans sanity n'est encore installé pour les socials mais à placer plus tard 
                  une fois le rendu des autres éléments confirmés et la gestion des socials implémentée */}
              {/* TODO: Ajouter les socials dans le schéma contact.ts et les récupérer ici */}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h2 className='text-orange-6 text-fl-xl mb-4 font-bold'>Contact</h2>
            <div className='space-y-3'>
              <div className='flex items-start space-x-3'>
                <Icon name='mapPin' size='lg' aria-hidden className='mt-1.5' />
                <div className='text-orange-4 text-fl-sm'>
                  <p>
                    {data?.contactInfo?.address}
                    <br />
                    {data?.contactInfo?.postalCode} {data?.contactInfo?.city}
                  </p>
                </div>
              </div>
              <div className='flex items-center space-x-2'>
                <Icon name='phone' size='lg' aria-hidden />
                <a
                  href={`tel:${data?.contactInfo?.phone}`}
                  className='text-orange-4 hover:text-orange-2 focus-visible:ring-ring/50 px-2 py-1 transition-colors outline-none focus-visible:rounded-lg focus-visible:ring-[3px] focus-visible:ring-offset-2 focus-visible:outline-none'>
                  {data?.contactInfo?.phone}
                </a>
              </div>
              <div className='flex items-center space-x-3'>
                <Icon name='mail' size='lg' aria-hidden />
                <a
                  href={`mailto:${data?.contactInfo?.email}`}
                  className='text-orange-4 hover:text-orange-2 focus-visible:ring-ring/50 px-2 py-1 transition-colors outline-none focus-visible:rounded-lg focus-visible:ring-[3px] focus-visible:ring-offset-2 focus-visible:outline-none'>
                  {data?.contactInfo?.email}
                </a>
              </div>
            </div>
          </div>

          {/* Horaires */}
          <div>
            <h2 className='text-orange-6 text-fl-xl mb-4 font-bold'>Horaires</h2>
            <div className='space-y-3'>
              <div className='flex items-start space-x-3'>
                <Icon name='clock' size='lg' aria-hidden className='mt-1.5' />
                <div className='text-orange-4 whitespace-pre-line'>
                  {/* Horaires qui viendra de Sanity depuis contact.ts de contactInfo fields openingHours*/}
                  {data?.contactInfo?.openingHours}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ligne de séparation */}
        <Separator orientation='horizontal' className='my-12 flex' />
        <div className='flex flex-col items-center justify-between md:flex-row'>
          <p className='text-orange-4 text-fl-sm'>
            &copy; {new Date().getFullYear()} {data?.contactInfo?.name}. Tous droits réservés.
          </p>
          <div className='mt-4 flex space-x-6 md:mt-0'>
            <Link
              href='/mentions-legales'
              className='text-orange-4 hover:text-orange-2 focus-visible:ring-ring/50 text-fl-sm px-2 py-1 text-sm transition-colors outline-none focus-visible:rounded-lg focus-visible:ring-[1px] focus-visible:ring-offset-2 focus-visible:outline-none'>
              Mentions légales
            </Link>
            <Link
              href='/politique-confidentialite'
              className='text-orange-4 hover:text-orange-2 focus-visible:ring-ring/50 text-fl-sm px-2 py-1 text-sm transition-colors outline-none focus-visible:rounded-lg focus-visible:ring-[3px] focus-visible:ring-offset-2 focus-visible:outline-none'>
              Politique de confidentialité
            </Link>
          </div>
        </div>
      </div>
      <MobileNavigationClient
        location={{
          ...MAP_INFO_DEFAULT,
          name: data?.contactInfo?.name ?? MAP_INFO_DEFAULT.name,
          address: data?.contactInfo?.address ?? MAP_INFO_DEFAULT.address,
          postalCode: data?.contactInfo?.postalCode ?? MAP_INFO_DEFAULT.postalCode,
          city: data?.contactInfo?.city ?? MAP_INFO_DEFAULT.city,
          country: data?.contactInfo?.country ?? MAP_INFO_DEFAULT.country
        }}
        phoneNumber={data?.contactInfo?.phone}
        email={data?.contactInfo?.email}
      />
    </footer>
  );
}
