"use client"
import { Carousel } from '@mantine/carousel';
import { useMediaQuery } from '@mantine/hooks';
import { Button, Paper, Title, useMantineTheme, Text } from '@mantine/core';
import classes from './CardsCarousel.module.css'
import classNames from 'classnames';
import { useRouter } from 'next/navigation';

const data = [
  {
    image:
      'https://images.unsplash.com/photo-1668342482782-582a821eaa59?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Satya Nadella',
    category: 'MICROSOFT',
  },
  {
    image:
      'https://images.unsplash.com/photo-1672825464619-79acee9f7e29?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDEwfHRvd0paRnNrcEdnfHxlbnwwfHx8fHw%3D',
    title: 'Jeff Bezos',
    category: 'AMAZON',
  },
  {
    image:
      'https://images.unsplash.com/photo-1692839929461-b3b30e36ef70?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDEzfHRvd0paRnNrcEdnfHxlbnwwfHx8fHw%3D',
    title: 'Elon Musk',
    category: 'TESLA',
  },
  {
    image:
      'https://images.unsplash.com/photo-1704570249452-c45247dd2b6e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDM3fHRvd0paRnNrcEdnfHxlbnwwfHx8fHw%3D',
    title: 'Ratan Tata',
    category: 'TATA GROUP',
  },
  {
    image:
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cHJvZmVzc2lvbmFsfGVufDB8fDB8fHww',
    title: 'Mukesh Ambani',
    category: 'RELIANCE INDUSTRIES',
  },
  {
    image:
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cHJvZmVzc2lvbmFsfGVufDB8fDB8fHww',
    title: 'Gautam Adani',
    category: 'ADANI & CO.',
  },
];

interface CardProps {
  image: string;
  title: string;
  category: string;
}

function Card({ image, title, category }: CardProps) {
  const router = useRouter();
  const handleMentor = () => {
    router.push(`/mentor/123`)
  }
  return (
    <Paper
  shadow="md"
  p="xl"
  radius="md"
  style={{
    backgroundImage: `url(${image})`,
    width: '300px', // Set width to 300px
    height: '400px', // Set height to 500px
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }}
  className={classNames("text-center", classes.card)}
>
  <div className='self-center'>
    <Text className={classes.category} size="xs">
      {category}
    </Text>
    <Title order={3} className={classes.title}>
      {title}
    </Title>
  </div>
  <Button variant="white" color="dark" className='mt-4 self-center' onClick={handleMentor}>
    Know More
  </Button>
</Paper>

  );
}

export default function CardsCarousel() {
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const slides = data.map((item) => (
    <Carousel.Slide key={item.title} className='w-fit min-w-fit'>
      <Card {...item} />
    </Carousel.Slide>
  ));

  return (
    <>
    <Title
        order={2}
        size="h1"
        style={{ fontFamily: 'Greycliff CF, var(--mantine-font-family)', paddingBottom: 'calc(var(--mantine-spacing-xl) * 2)' }}
        fw={900}
        ta="center"
        id='mentors'
      >
        Meet Our Mentors
      </Title>
    <Carousel
      withIndicators
      slideSize={{ base: '100%', sm: '50%', md: '33.333333%' }}
      slideGap={{ base: 0, sm: 'md', md: 'sm' }}
      loop
      align="start"
      className='px-10 mx-10 lg:px-20 lg:mx-32'
      slidesToScroll={mobile ? 1 : 2}
    >
      {slides}
    </Carousel>
    </>
  );
}