import { ComponentPropsWithoutRef, ComponentPropsWithRef, ElementType, PropsWithChildren, ReactNode } from 'react';

/**
 * Component variant types
 * Using discriminated unions for type safety
 */

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type BadgeVariant = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error';
export type CardVariant = 'default' | 'elevated' | 'outlined';

/**
 * Polymorphic component types
 * Allows components to render as different HTML elements
 */

export type AsProp<C extends ElementType> = {
  as?: C;
};

export type PropsToOmit<C extends ElementType, P> = keyof (AsProp<C> & P);

export type PolymorphicComponentProp<
  C extends ElementType,
  Props = Record<string, never>
> = PropsWithChildren<Props & AsProp<C>> &
  Omit<ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>;

export type PolymorphicRef<C extends ElementType> =
  ComponentPropsWithRef<C>['ref'];

export type PolymorphicComponentPropsWithRef<
  C extends ElementType,
  Props = Record<string, never>
> = PolymorphicComponentProp<C, Props> & { ref?: PolymorphicRef<C> };

/**
 * Common component props
 */

export interface BaseComponentProps {
  readonly className?: string;
  readonly children?: ReactNode;
}

/**
 * Variant map type for component styling
 */

export type VariantMap<T extends string> = Record<T, string>;
