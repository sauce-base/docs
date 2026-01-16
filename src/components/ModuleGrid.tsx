import React from 'react';
import styles from './ModuleGrid.module.css';

export interface ModuleGridProps {
  children: React.ReactNode;
}

export default function ModuleGrid({ children }: ModuleGridProps): JSX.Element {
  return (
    <div className={styles.moduleGrid}>
      {children}
    </div>
  );
}
