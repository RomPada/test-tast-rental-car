import Link from 'next/link';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './Button.module.css';

type Props = {
  children: ReactNode;
  className?: string;
  variant?: 'primary' | 'outline';
  href?: string;
  target?: '_blank';
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  children,
  className = '',
  variant = 'primary',
  href,
  target,
  ...buttonProps
}: Props) {
  const classes = `${styles.button} ${styles[variant]} ${className}`.trim();

  if (href) {
    return (
      <Link
        className={classes}
        href={href}
        target={target}
        rel={target === '_blank' ? 'noopener noreferrer' : undefined}
      >
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
