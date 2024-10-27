"use client"
import {
    Group,
    Button,
    Divider,
    Box,
    Burger,
    Drawer,
    ScrollArea,
    rem,
  } from '@mantine/core';
  import { MantineLogo } from '@mantinex/mantine-logo';
  import { useDisclosure } from '@mantine/hooks';
  import classes from './HeaderMegaMenu.module.css';
import classNames from 'classnames';
import Link from 'next/link';
import { UserButton } from '../UserButton/UserButton';
import { IconLogout } from '@tabler/icons-react';
  
  export function HeaderMegaMenu() {
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);

    return (
      <Box className='py-5 border border-b-[#EAEAEA]'>
        <header className={classes.header}>
          <Group justify="space-between" h="100%">
            <Link href={"/"} shallow={true}>
            <div className='font-bold text-xl cursor-pointer'>Mentor Prep</div></Link>
            <Group h="100%" gap={0} visibleFrom="sm">
              <a href="/#mentors" className={classNames("hover:text-blue-500 text-xl",classes.link)}>
                Find a Mentor
              </a>
              <a href="/signup" className={classNames("hover:text-blue-500 text-xl",classes.link)}>
                Become a Mentor
              </a>
              <a href="/#" className={classNames("hover:text-blue-500 text-xl",classes.link)}>
                MarketPlace
              </a>
              <a href="/community" className={classNames("hover:text-blue-500 text-xl",classes.link)}>
                Community
              </a>
              <a href="/#footer" className={classNames("hover:text-blue-500 text-xl",classes.link)}>
                About Us
              </a>
            </Group>
            <Group visibleFrom="sm">
            {localStorage.getItem("authtoken") ?
              <UserButton/> :
              <>
              <Link href={'/login'}><Button variant="default">Log in</Button></Link>
              <Link href={'/signup'}><Button>Sign up</Button></Link>
              </>
    }
            </Group>
            <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
          </Group>
        </header>
  
        <Drawer
          opened={drawerOpened}
          onClose={closeDrawer}
          size="100%"
          padding="md"
          title="Menu"
          hiddenFrom="sm"
          zIndex={1000000}
        >
          <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
            <Divider my="sm" />
            <a href="#" className={classes.link}>
                Find a Mentor
              </a>
              <a href="#" className={classes.link}>
                Become a Mentor
              </a>
              <a href="#" className={classes.link}>
                MarketPlace
              </a>
              <a href="#" className={classes.link}>
                Community
              </a>
              <a href="#" className={classes.link}>
                About Us
              </a>
            <Divider my="sm" />

            <Group justify="center" grow pb="xl" px="md">
            {localStorage.getItem("authtoken") ? 
              <UserButton/> : <>
              <Link href={'/login'}><Button variant="default">Log in</Button></Link>
              <Link href={'/signup'}><Button>Sign up</Button></Link>
              </>
    }
            </Group>
          </ScrollArea>
        </Drawer>
      </Box>
    );
  }