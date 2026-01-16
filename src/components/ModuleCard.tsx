import React from 'react';
import styles from './ModuleCard.module.css';

export interface ModuleCardProps {
  title: string;
  description: string;
  href: string;
  icon?: string;
  status?: 'available' | 'coming-soon';
}

export default function ModuleCard({
  title,
  description,
  href,
  icon = '📦',
  status = 'available',
}: ModuleCardProps): JSX.Element {
  const isComingSoon = status === 'coming-soon';

  return (
    <div className={styles.moduleCard}>
      {/* Coming Soon Badge */}
      {isComingSoon && (
        <div className={styles.comingSoonBadge}>
          Coming Soon
        </div>
      )}

      {/* Icon */}
      <div className={styles.icon}>{icon}</div>

      {/* Title */}
      <h3 className={styles.title}>{title}</h3>

      {/* Description */}
      <p className={styles.description}>{description}</p>

      {/* Link/Button */}
      {!isComingSoon ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          View on GitHub
          <svg
            className={styles.linkArrow}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </a>
      ) : (
        <span className={styles.disabled}>In Development</span>
      )}
    </div>
  );
}
