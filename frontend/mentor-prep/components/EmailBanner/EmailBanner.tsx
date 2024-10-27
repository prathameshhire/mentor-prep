import { Text, Title, TextInput, Button } from '@mantine/core';
import classes from './EmailBanner.module.css';
import image from '../../public/banner.svg'
import Image from 'next/image';

export function EmailBanner() {
  return (
    <div className={classes.wrapper}>
      <div className={classes.body}>
        <Title className={classes.title}>Wait a minute...</Title>
        <Text fw={500} fz="lg" mb={5}>
          Subscribe to our newsletter!
        </Text>
        <Text fz="sm" c="dimmed">
          You will never miss important product updates, latest news and community QA sessions. Our
          newsletter is once a week, every Sunday.
        </Text>

        <div className={classes.controls}>
          <TextInput
            placeholder="Your email"
            classNames={{ input: classes.input, root: classes.inputWrapper }}
          />
          <Button className={classes.control}>Subscribe</Button>
        </div>
      </div>
      <Image src={image.src} className={classes.image} alt='banner' width={350} height={320} />
    </div>
  );
}