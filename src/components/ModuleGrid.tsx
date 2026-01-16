import React from 'react';
import ModuleCard, { ModuleCardProps } from './ModuleCard';
import styles from './ModuleGrid.module.css';

export interface ModuleGridProps {
  modules: ModuleCardProps[];
}

export default function ModuleGrid({ modules }: ModuleGridProps): JSX.Element {
  return (
    <div className={styles.moduleGrid}>
      {modules.map((module, index) => (
        <ModuleCard key={index} {...module} />
      ))}
    </div>
  );
}
