"use client";
import {  useState } from 'react';
import {
  IconLogout,
  IconHelpOctagon,
  IconTag,
  IconPencil,
  IconListCheck,
} from '@tabler/icons-react';
import classes from './NavbarSimple.module.css';
import classNames from 'classnames';
import { usePathname, useRouter } from 'next/navigation';

// ... (imports)

const data = [
  { link: '/community', label: 'Discussion', slug:'discussion' , icon: IconHelpOctagon },
  { link: '/community/tags', label: 'Tags', slug:'tags' ,  icon: IconTag },
  { link: '/community/myquestion', label: 'My Question', slug:'myquestion' , icon: IconPencil },
];

export default function ChooseQuestionType({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [active, setActive] = useState(() => {
    const initialActive = data.find(({ slug }) => pathname.toLowerCase().includes(slug))?.slug || 'discussion';
    return initialActive;
  });
  const userIsLoggedIn = Boolean(localStorage.getItem("authtoken"));
  // console.log("Active", active)

  const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement>, item: any) => {
    event.preventDefault();
    if (item.label === 'My Question' && !userIsLoggedIn) {
      // Do nothing or show a message indicating the user needs to be logged in
    } else {
      setActive(item.slug);
      // Navigate to the specified link using Next.js router
      router.push(item.link);
    }
  };

  const links = data.map((item) => (
    item.label === 'My Question' && !userIsLoggedIn ? null : (
      <a
        className={classNames(
          classes.link,
          { 'bg-blue-300': item.slug === active },
          "hover:text-blue-500",
          { "border-t": item.slug === 'myquestion' }
        )}

        data-active={item.label === active || undefined}
        href={item.link}
        key={item.label}
        onClick={(event) => handleLinkClick(event, item)}
      >
        <item.icon className={classes.linkIcon} stroke={1.5} />
        <span className='capitalize'>{item.label}</span>
      </a>
    )
  ));

  return (
    <main className='flex gap-[3rem]'>
    <nav className={classNames("flex flex-col justify-between", classes.navbar)}>
      <div className={classes.navbarMain}>
        {links}
      </div>
    </nav>
    <div className=''>
      {children}
    </div>
  </main>
  );
}

