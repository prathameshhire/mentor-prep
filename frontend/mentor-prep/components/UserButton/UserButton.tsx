import { UnstyledButton, Avatar, Text, rem, Button, Modal, MenuItem, Menu } from '@mantine/core';
import { IconCalendar, IconLogout, IconSchool, IconUser, IconVideo } from '@tabler/icons-react';
import classes from './UserButton.module.css';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';

export function UserButton() {
  const router = useRouter();
  const [isModalOpen, setModalOpen] = useState(false);

 
  const handleLogout = () => {
    setModalOpen(true);
  };

  const handleConfirmLogout = () => {
    // Remove authToken from LocalStorage
    localStorage.removeItem('authtoken');
    // Redirect to the home page
    router.refresh();
    router.push("/");
    // Close the modal
    setModalOpen(false);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <Menu withArrow trigger='click-hover'>
        <UnstyledButton className={classes.user}>
        <Menu.Target>
        <Avatar
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png"
          radius="lg"
        />
        </Menu.Target>
        <Menu.Dropdown>
          <Link href={"/profile"} shallow={true}>
        <MenuItem leftSection={<IconUser
          style={{ width: rem(20), height: rem(20) }}
          stroke={1.5}
          />}>
        Profile
        </MenuItem>
        </Link>
        <MenuItem leftSection={<IconCalendar
          style={{ width: rem(20), height: rem(20) }}
          stroke={1.5}
          />}>
        Upcoming Sessions
        </MenuItem>
        <MenuItem leftSection={<IconSchool
          style={{ width: rem(20), height: rem(20) }}
          stroke={1.5}
          />}>
        My Mentors
        </MenuItem>
        <MenuItem leftSection={<IconVideo
          style={{ width: rem(20), height: rem(20) }}
          stroke={1.5}
          />}>
        Join Live Events
        </MenuItem>
        <MenuItem onClick={handleLogout} 
        leftSection={<IconLogout
          style={{ width: rem(20), height: rem(20) }}
          stroke={1.5}
          />}>
        Sign Out
        </MenuItem>
        </Menu.Dropdown>
        <Modal
        title="Confirm Sign Out"
        opened={isModalOpen}
        onClose={handleCloseModal}
        size="sm"
      >
        <Text className='text-center'>Are you sure you want to sign out?</Text>
        <div className='flex gap-5 pt-4 items-center justify-center'>
          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button color="red" onClick={handleConfirmLogout}>
            Sign Out
          </Button>
        </div>
      </Modal>
    </UnstyledButton>
      </Menu>
      
  );
}