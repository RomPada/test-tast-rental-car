import Link from 'next/link';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './Button.module.css';

type CommonProps = {
  children: ReactNode;
  className?: string;
  variant?: 'primary' | 'outline';
};

type LinkButtonProps = CommonProps & {
  href: string;
  target?: '_blank';
  disabled?: never;
  type?: never;
};

type NativeButtonProps = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
    target?: never;
  };

type Props = LinkButtonProps | NativeButtonProps;

export default function Button({ children, className = '', variant = 'primary', ...props }: Props) {
  const classes = `${styles.button} ${styles[variant]} ${className}`.trim();

  if (props.href) {
    return (
      <Link
        className={classes}
        href={props.href}
        target={props.target}
        rel={props.target === '_blank' ? 'noopener noreferrer' : undefined}
      >
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
