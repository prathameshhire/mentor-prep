"use client"
import { Container, Title, Button, Group, Text, List, ThemeIcon, rem } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import classes from './HeroBullets.module.css';
import image from '../../public/image.svg'
import Image from 'next/image';

export function HeroBullets() {
  return (
    <Container size="md" id='hero'>
      <div className={classes.inner}>
        <div className={classes.content}>
          <Title className={classes.title}>
            Welcome to Mentor Prep, a platform for All
          </Title>
          <Text c="dimmed" mt="md">
            Mentor Prep acknowledges certain challenges and limitations in the current system that hinder its effectiveness
          </Text>
          <List
            mt={30}
            spacing="sm"
            size="sm"
            icon={
              <ThemeIcon size={20} radius="xl">
                <IconCheck style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
              </ThemeIcon>
            }
          >
            <List.Item>
              <b>Community Enhancement</b> – Elevate your Mentor Prep experience by actively participating in our enriched community
            </List.Item>
            <List.Item>
              <b>Enhanced Mentor Search</b> – Unlock the potential of Mentor Prep with Us
            </List.Item>
            <List.Item>
              <b>Right Place for Learning</b> – Navigate through your learning journey seamlessly at Mentor Prep
            </List.Item>
          </List>
        </div>
        <Image src={image.src} className={classes.image} alt='image' width={376} height={356}/>
      </div>
    </Container>
  );
}
