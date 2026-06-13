import { config } from '@/xedo.config';
import { Icons, type IconName } from './icons';

/**
 * Resolve the icon component for a collection (menu category) slug, using the
 * `categoryIcons` map in xedo.config.ts. Falls back to `defaultCategoryIcon`
 * (then to Bowl) for any unmapped or unknown category — so the menu renders
 * correctly whatever collections the merchant has configured in Xedo.
 */
export function categoryIcon(slug: string) {
  const key = (config.categoryIcons[slug] ??
    config.defaultCategoryIcon) as IconName;
  return Icons[key] ?? Icons.Bowl;
}
