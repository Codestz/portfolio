export interface FileNode {
  id: string;
  name: string;
  type?: 'file' | 'folder';
  children?: FileNode[];
}

export interface FileTreeProps {
  items: FileNode[];
  className?: string;
}
