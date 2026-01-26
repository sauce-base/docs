import React from 'react';
import { Icon } from '@iconify/react';

export function renderIcon(
  iconName: string | undefined,
  size: number | string = 18,
  color: string = 'currentColor'
): React.ReactElement | null {
  if (!iconName) {
    return null;
  }

  return (
    <Icon
      icon={iconName}
      width={size}
      height={size}
      style={{ color }}
    />
  );
}
