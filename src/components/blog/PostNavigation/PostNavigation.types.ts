export interface PostNavigationProps {
  previousPost?: {
    slug: string;
    title: string;
    category: string;
  } | null;
  nextPost?: {
    slug: string;
    title: string;
    category: string;
  } | null;
  className?: string;
}
