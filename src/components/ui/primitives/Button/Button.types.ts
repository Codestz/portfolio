import { ElementType } from 'react';
import {
  PolymorphicComponentPropsWithRef,
  ButtonVariant,
  ButtonSize,
} from '@/lib/types/ui.types';

/**
 * Button component props
 * Polymorphic component that can render as button, a, Link, etc.
 */

export type ButtonProps<C extends ElementType = 'button'> =
  PolymorphicComponentPropsWithRef<
    C,
    {
      variant?: ButtonVariant;
      size?: ButtonSize;
      fullWidth?: boolean;
      loading?: boolean;
      leftIcon?: React.ReactNode;
      rightIcon?: React.ReactNode;
    }
  >;
