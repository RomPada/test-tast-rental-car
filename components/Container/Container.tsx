import type { ReactNode } from 'react';
import styles from './Container.module.css';

export default function Container({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`${styles.container} ${className}`.trim()}>{children}</div>;
}
