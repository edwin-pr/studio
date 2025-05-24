
"use client";

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { Fragment } from 'react';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[]; // Allow overriding default breadcrumbs
  className?: string;
}

// Helper function to capitalize strings
const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  const pathname = usePathname();

  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    if (items) return items; // Use provided items if available

    const pathSegments = pathname.split('/').filter(segment => segment);
    const breadcrumbs: BreadcrumbItem[] = [{ label: 'Home', href: '/' }];

    let currentPath = '';
    pathSegments.forEach(segment => {
      currentPath += `/${segment}`;
      // Replace IDs with a generic term or specific logic if needed
      if (segment.match(/^[0-9a-fA-F]{24}$/) || segment.startsWith('prop')) { // Basic check for ID-like segments
         // For this app, we know 'properties' is followed by an ID.
         // We might want to fetch property title for better breadcrumb.
         // For now, use a generic label or skip.
         // If the previous segment was 'properties', this segment is an ID.
         if (breadcrumbs[breadcrumbs.length -1]?.label === 'Properties') {
            breadcrumbs.push({ label: 'Details', href: currentPath }); // Placeholder
         } else {
            breadcrumbs.push({ label: capitalize(segment.replace(/-/g, ' ')), href: currentPath });
         }
      } else {
        breadcrumbs.push({ label: capitalize(segment.replace(/-/g, ' ')), href: currentPath });
      }
    });
    return breadcrumbs;
  };

  const breadcrumbItems = generateBreadcrumbs();

  if (breadcrumbItems.length <= 1 && pathname === '/') { // Don't show breadcrumbs on home page if it's just "Home"
    return null;
  }


  return (
    <nav aria-label="Breadcrumb" className={`mb-6 text-sm ${className}`}>
      <ol className="flex items-center space-x-1.5 text-muted-foreground">
        {breadcrumbItems.map((item, index) => (
          <Fragment key={item.href}>
            <li>
              {index === breadcrumbItems.length - 1 ? (
                <span className="font-medium text-foreground">{item.label}</span>
              ) : (
                <Link href={item.href} className="hover:text-foreground transition-colors">
                  {item.label}
                </Link>
              )}
            </li>
            {index < breadcrumbItems.length - 1 && (
              <li>
                <ChevronRight className="h-4 w-4" />
              </li>
            )}
          </Fragment>
        ))}
      </ol>
    </nav>
  );
}
