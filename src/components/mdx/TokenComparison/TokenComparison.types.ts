export interface TokenStep {
  action: string;
  tokens: number;
  time?: string;
}

export interface TokenApproach {
  name: string;
  color: 'red' | 'green' | 'blue' | 'purple';
  steps: TokenStep[];
  totalTokens?: number;
  totalCost?: string;
  successRate?: string;
  icon?: string;
}

export interface TokenComparisonProps {
  title: string;
  approaches: [TokenApproach, TokenApproach];
  className?: string;
}
