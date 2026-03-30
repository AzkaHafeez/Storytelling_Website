export function getMotionSettings() {
  if (typeof document === 'undefined') {
    return { ease: 'power2.out', slow: 1.4, fast: 0.6 };
  }

  const styles = getComputedStyle(document.documentElement);
  const ease = styles.getPropertyValue('--motion-ease').trim() || 'power2.out';
  const slow = parseFloat(styles.getPropertyValue('--motion-slow')) || 1.4;
  const fast = parseFloat(styles.getPropertyValue('--motion-fast')) || 0.6;

  return { ease, slow, fast };
}
