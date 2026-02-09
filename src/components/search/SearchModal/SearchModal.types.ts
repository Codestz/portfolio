export interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface SearchResult {
  type: 'post' | 'project' | 'experience';
  slug: string;
  title: string;
  description: string;
  category?: string;
  tags?: string[];
  url: string;
}
