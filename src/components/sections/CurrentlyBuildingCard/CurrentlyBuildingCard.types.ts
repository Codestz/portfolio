import type { CurrentWork } from '@/lib/types';

export interface CurrentlyBuildingCardProps {
  className?: string;
  currentWork?: CurrentWork | null;
}
