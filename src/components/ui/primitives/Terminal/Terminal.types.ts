export interface TerminalLine {
  /**
   * The text content to display
   */
  text: string;

  /**
   * Optional prefix (e.g., ">", "•")
   */
  prefix?: string;

  /**
   * Optional suffix text (e.g., "[OK]", "[FAIL]")
   */
  suffix?: string;

  /**
   * Color of the suffix text
   */
  suffixColor?: 'cyan' | 'yellow' | 'green' | 'purple' | 'white' | 'gray';

  /**
   * Color of the main text
   * @default 'white'
   */
  color?: 'cyan' | 'yellow' | 'green' | 'purple' | 'white' | 'gray';

  /**
   * Delay in milliseconds before displaying this line
   * @default index * 300
   */
  delay?: number;
}

export interface TerminalProps {
  /**
   * Terminal window title
   * @default 'codestz_kernel_v1.0'
   */
  title?: string;

  /**
   * Array of terminal lines to display
   * @default []
   */
  lines?: TerminalLine[];

  /**
   * Skills to display after progress completes
   * @default []
   */
  skills?: string[];

  /**
   * Final command to type out
   * @default 'ls -la research/ai_recommendations'
   */
  finalCommand?: string;

  /**
   * Whether to show the progress bar
   * @default true
   */
  showProgress?: boolean;

  /**
   * Additional CSS classes
   */
  className?: string;
}
