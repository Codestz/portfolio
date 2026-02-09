export interface TerminalLine {
  type: 'input' | 'output' | 'success' | 'error' | 'comment' | 'divider' | 'text';
  content: string;
  prompt?: string;
}

export interface TerminalProps {
  lines: TerminalLine[];
  title?: string;
  className?: string;
}
