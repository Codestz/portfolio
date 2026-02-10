export interface ToolCallResult {
  status: 'success' | 'error' | 'warning';
  message?: string;
  data?: Record<string, unknown>;
  tokens_saved?: number;
  execution_time?: string;
}

export interface ToolCallProps {
  tool: string;
  params: Record<string, unknown>;
  result?: ToolCallResult;
  description?: string;
  className?: string;
}
