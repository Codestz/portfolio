export interface FilterState {
  search: string;
  category: string | null;
  tags: string[];
}

export interface FilterBarProps {
  /**
   * Available categories to filter by
   */
  categories?: string[];

  /**
   * Available tags to filter by
   */
  tags?: string[];

  /**
   * Callback when filter state changes
   */
  onFilterChange?: (filters: FilterState) => void;

  /**
   * Additional CSS classes
   */
  className?: string;
}
