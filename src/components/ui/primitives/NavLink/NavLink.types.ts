import { AnchorHTMLAttributes } from 'react';

export interface NavLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  active?: boolean;
}
