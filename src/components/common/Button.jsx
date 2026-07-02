/**
 * Reusable Button component.
 * Supports variant (primary | secondary | danger | ghost),
 * size (small | medium | large), and an icon-only mode.
 */

import styles from './Button.module.css';

export default function Button({
  children,
  variant = 'primary',
  size = 'medium',
  iconOnly = false,
  className = '',
  ...rest
}) {
  const classes = [
    styles.button,
    styles[variant],
    size === 'small' && styles.small,
    size === 'large' && styles.large,
    iconOnly && styles.iconOnly,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
