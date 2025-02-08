'use client';

import { AppShell, Burger, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import NavLinks from './navLinks';

export default function BasicAppShell({ comp }: { comp: React.JSX.Element }) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 200, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          Company Logo
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <NavLinks />
      </AppShell.Navbar>
      <AppShell.Main>{comp || <div>No content available...</div>}</AppShell.Main>
    </AppShell>
  );
}
