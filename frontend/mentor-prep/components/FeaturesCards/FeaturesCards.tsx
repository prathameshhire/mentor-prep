import {
    Badge,
    Group,
    Title,
    Text,
    Card,
    SimpleGrid,
    Container,
    rem,
    useMantineTheme,
  } from '@mantine/core';
  import { IconGauge, IconUser, IconCookie, IconDevicesPc, IconBuildingWarehouse } from '@tabler/icons-react';
  import classes from './FeaturesCards.module.css';
  
  const mockdata = [
    {
      title: 'Web Development',
      description:
        'This dust is actually a powerful poison that will even make a pro wrestler sick, Regice cloaks itself with frigid air of -328 degrees Fahrenheit',
      icon: IconDevicesPc,
    },
    {
      title: 'Machine Learning',
      description:
        'People say it can run at the same speed as lightning striking, Its icy body is so cold, it will not melt even if it is immersed in magma',
      icon: IconBuildingWarehouse,
    },
    {
      title: 'Miscallaneous',
      description:
        'They’re popular, but they’re rare. Trainers who show them off recklessly may be targeted by thieves',
      icon: IconCookie,
    },
  ];
  
  export function FeaturesCards() {
    // const theme = useMantineTheme();
    const features = mockdata.map((feature) => (
      <Card key={feature.title} shadow="md" radius="md" className={classes.card} padding="xl">
        <feature.icon
          style={{ width: rem(50), height: rem(50), alignItems: "center" }}
          stroke={2}
          className='self-center'
        />
        <Text fz="lg" fw={500} className={classes.cardTitle} mt="md">
          {feature.title}
        </Text>
        <Text fz="sm" c="dimmed" mt="sm">
          {feature.description}
        </Text>
      </Card>
    ));
  
    return (
      <Container size="lg" py="xl">
        <Group justify="center">
          <Badge variant="filled" size="lg">
            Mentor - Prep
          </Badge>
        </Group>
  
        <Title order={2} className={classes.title} ta="center" mt="sm">
          Join any Community effortlessly with yout favourite technology stack
        </Title>
  
        <Text c="dimmed" className={classes.description} ta="center" mt="md">
          Every once in a while, you’ll see a Golbat that’s grown some fangs. This happens when
          you are with your community support.
        </Text>
  
        <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl" mt={50}>
          {features}
        </SimpleGrid>
      </Container>
    );
  }