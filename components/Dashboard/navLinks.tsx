'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { DocumentDuplicateIcon, HomeIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import styles from './navLinks.module.css';

export default function NavLinks() {
  const pathname = usePathname();

  const links = [
    { name: 'Home', href: '/dashboard', icon: HomeIcon },
    {
      name: 'Invoices',
      href: '/dashboard/invoices',
      icon: DocumentDuplicateIcon,
    },
    { name: 'Customers', href: '/dashboard/customers', icon: UserGroupIcon },
  ];

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(styles.navLinks, {
              [styles.navLinksActive]: pathname === link.href,
            })}
          >
            <LinkIcon className={styles.navIcons} />
            <p>{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
