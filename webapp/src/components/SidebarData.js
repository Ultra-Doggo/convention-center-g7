import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Find Events',
    path: '/findevents',
    icon: <IoIcons.IoIosSearch/>,
    cName: 'nav-text'
  },
  {
    title: 'Create an Event',
    path: '/eventcreation',
    icon: <IoIcons.IoMdCreate />,
    cName: 'nav-text'
  },
  {
    title: 'Logout',
    path: '/',
    icon: <IoIcons.IoMdLogOut />,
    cName: 'nav-text'
  }
];