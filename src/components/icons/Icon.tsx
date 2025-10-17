// 📂 src/components/icons/Icon.tsx
// 👉 Composant hybride : Registry typée + Slot pattern pour icônes custom

'use client';

import * as React from 'react'

import { cn } from '@/lib/utils'
import { Slot } from '@radix-ui/react-slot'

import { ICONS, type IconName } from './registry'

/**
 * Tailles prédéfinies pour les icônes
 * Mapping vers les classes Tailwind size-*
 */
type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

const sizeClass: Record<IconSize, string> = {
  xs: 'size-3.5',
  sm: 'size-4',
  md: 'size-5',
  lg: 'size-6',
  xl: 'size-8'
};

/**
 * Props pour le mode Registry (icônes prédéfinies)
 * 
 * @example
 * ```tsx
 * <Icon name="success" size="md" aria-label="Succès" />
 * ```
 */
type RegistryIconProps = {
  /** Nom de l'icône depuis la registry */
  name: IconName;
  /** Icône de fallback en cas d'erreur */
  fallbackName?: IconName;
  /** Taille prédéfinie */
  size?: IconSize;
  children?: never;
} & React.SVGProps<SVGSVGElement>;

/**
 * Props pour le mode Slot (icônes custom)
 * 
 * @example
 * ```tsx
 * <Icon size="lg">
 *   <svg>...</svg>
 * </Icon>
 * ```
 */
type SlotIconProps = {
  /** Icône custom à encapsuler (mode auto-détecté) */
  children: React.ReactNode;
  /** Pas de registry en mode slot */
  name?: never;
  fallbackName?: never;
  size?: IconSize;
  className?: string;
} & Omit<React.ComponentPropsWithoutRef<'span'>, 'children'>;

/**
 * Union des deux modes (détection automatique)
 * Si `name` est fourni → Mode Registry
 * Si `children` est fourni → Mode Slot
 */
export type IconProps = RegistryIconProps | SlotIconProps;

/**
 * Accessibilité automatique
 * Si aucun aria-label ou aria-labelledby, l'icône est considérée comme décorative
 */
function buildA11y(props: IconProps) {
  const hasLabel = Boolean(props['aria-label'] || props['aria-labelledby']);

  return hasLabel
    ? {}
    : {
        'aria-hidden': true as const,
        focusable: false as const
      };
}

/**
 * Composant Icon hybride
 * 
 * **Mode 1 : Registry** (icônes prédéfinies)
 * ```tsx
 * <Icon name="success" size="md" />
 * ```
 * 
 * **Mode 2 : Slot** (icônes custom)
 * ```tsx
 * <Icon size="lg">
 *   <CustomSvg />
 * </Icon>
 * ```
 * 
 * **Avantages :**
 * - Tree-shaking (seules les icônes utilisées sont bundlées)
 * - Typage strict avec auto-complétion IDE
 * - Flexibilité pour icônes custom (Sanity, SVG inline, etc.)
 * - Accessibilité automatique
 * - Sizing cohérent (Tailwind size-*)
 */
export const Icon = React.forwardRef<HTMLElement, IconProps>(
  (props, ref) => {
    const { className, size = 'sm', ...rest } = props;
    const classes = cn('shrink-0 pointer-events-none', sizeClass[size], className);
    const a11y = buildA11y(props);

    // Auto-détection : Mode Slot si pas de `name`
    if (!props.name) {
      const { children, ...slotProps } = rest as SlotIconProps;

      return (
        <Slot
          ref={ref}
          data-slot="icon"
          className={classes}
          {...a11y}
          {...slotProps}
        >
          {children}
        </Slot>
      );
    }

    // Mode Registry : Icône prédéfinie
    const { name, fallbackName, ...svgProps } = rest as RegistryIconProps;
    const IconComponent = ICONS[name] ?? (fallbackName ? ICONS[fallbackName] : undefined);

    if (!IconComponent) {
      if (process.env.NODE_ENV !== 'production') {
        console.warn(`[Icon] Icône inconnue "${name}". Fallback: "${fallbackName || 'aucun'}".`);
      }

      return null;
    }

    return (
      <IconComponent
        ref={ref as React.Ref<SVGSVGElement>}
        data-slot="icon"
        className={classes}
        {...a11y}
        {...svgProps}
      />
    );
  }
);

Icon.displayName = 'Icon';

