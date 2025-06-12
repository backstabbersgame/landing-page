import React from 'react';
import {
  Chats,
  House,
  Rocket,
  Newspaper,
  UsersThree,
  ShoppingBag,
  ShoppingCart,
} from '@phosphor-icons/react/dist/ssr';

export const links = [
  { name: 'Início', href: '#inicio' },
  { name: 'Jogos', href: '#games' },
  { name: 'Sobre', href: '#about' },
  { name: 'Lojinha', href: '#store' },
  { name: 'Newsletter', href: '#newsletter' },
  // { name: 'Lojinha', href: '/lojinha' },
  // { name: 'Contato', href: '/contato' },
];

export const menuItems = [
  {
    id: 'inicio',
    label: 'Início',
    icon: <House size={24} />,
    href: '#inicio',
  },
  {
    id: 'jogos',
    label: 'Jogos',
    icon: <Rocket size={24} />,
    href: '#games',
    hasSubMenu: false,
    subItems: [
      { id: '', label: '', href: '' },
      { id: '', label: '', href: '' },
    ],
  },
  {
    id: 'sobre',
    label: 'Sobre',
    icon: <UsersThree size={24} />,
    href: '#about',
  },
  {
    id: 'store',
    label: 'Lojinha',
    icon: <ShoppingBag size={24} />,
    href: '#store',
  },
  {
    id: 'newsletter',
    label: 'Newsletter',
    icon: <Newspaper size={24} />,
    href: '#newsletter',
  },
  // {
  //   id: 'lojinha',
  //   label: 'Lojinha',
  //   icon: <ShoppingCart size={24} />,
  //   href: '/lojinha',
  // },
  // {
  //   id: 'contato',
  //   label: 'Contato',
  //   icon: <Chats size={24} />,
  //   href: '/contato',
  // },
];
