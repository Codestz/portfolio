'use client';

import React from 'react';
import { Folder, File } from 'lucide-react';
import type { FileTreeProps, FileNode } from './FileTree.types';

interface RenderNodeProps {
  node: FileNode;
  isLast: boolean;
  prefix: string;
}

const RenderNode: React.FC<RenderNodeProps> = ({ node, isLast, prefix }) => {
  const connector = isLast ? '└── ' : '├── ';
  const childPrefix = isLast ? '    ' : '│   ';
  const Icon = node.type === 'folder' ? Folder : File;

  return (
    <>
      <div className="flex items-center gap-1 whitespace-pre font-mono text-sm text-neutral-800 dark:text-neutral-200">
        <span>
          {prefix}
          {connector}
        </span>
        <Icon size={14} className="flex-shrink-0" />
        <span>{node.name}</span>
      </div>
      {node.children?.map((child, index) => (
        <RenderNode
          key={child.id}
          node={child}
          isLast={index === node.children!.length - 1}
          prefix={prefix + childPrefix}
        />
      ))}
    </>
  );
};

export const FileTree: React.FC<FileTreeProps> = ({ items, className = '' }) => {
  return (
    <div
      className={`my-6 rounded-none border-4 border-black bg-white p-4 font-mono dark:border-white dark:bg-neutral-900 ${className}`}
    >
      <div className="overflow-x-auto">
        {items.map((item, index) => (
          <RenderNode key={item.id} node={item} isLast={index === items.length - 1} prefix="" />
        ))}
      </div>
    </div>
  );
};

export default FileTree;
