import { Container, Group, ActionIcon, rem } from '@mantine/core';
import { IconBrandTwitter, IconBrandYoutube, IconBrandInstagram, IconBrandX, IconBrandFacebook } from '@tabler/icons-react';
import { MantineLogo } from '@mantinex/mantine-logo';
import classes from './FooterSocial.module.css';
import Link from 'next/link';

export function FooterSocial() {
  return (
    <div className={classes.footer} id='footer'>
      <Container className={classes.inner}>
      <Link href={"/"} shallow={true}>
            <div className='font-bold text-xl cursor-pointer'>Mentor Prep</div></Link>
        <Group gap={0} className={classes.links} justify="flex-end" wrap="nowrap">
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandX style={{ width: rem(28), height: rem(28) }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandFacebook style={{ width: rem(28), height: rem(28) }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandYoutube style={{ width: rem(28), height: rem(28) }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandInstagram style={{ width: rem(28), height: rem(28) }} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Container>
    </div>
  );
}