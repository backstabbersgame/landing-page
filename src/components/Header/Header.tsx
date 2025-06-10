'use client';

import React, { useState } from 'react';
import {
  Header as HeaderComponent,
  ModalMenu,
} from '@backstabbersgame/design-system';
import {
  Chats,
  House,
  Rocket,
  Newspaper,
  UsersThree,
  ShoppingCart,
} from '@phosphor-icons/react/dist/ssr';
import { useRouter } from 'next/navigation';
import useBreakpoint from 'src/hooks/useBreakpoint';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('inicio');
  const [openSubMenu, setOpenSubMenu] = useState<string | undefined>();
  const { currentBreakpoint } = useBreakpoint();
  const isMobile = currentBreakpoint === 'mobile';
  const router = useRouter();

  const handleLogoClick = () => {
    router.push('/');
    setActiveItem('inicio');
    setOpenSubMenu(undefined);
  };

  const handleMenuClick = () => {
    setIsMenuOpen(true);
  };

  const handleToggleSubMenu = (id?: string) => {
    if (id === 'jogos') {
      setOpenSubMenu((currentState) => (currentState === id ? undefined : id));
      setActiveItem('jogos');
    }
  };

  const handleLinkClick = (href: string) => {
    // router.push(href);
    const active = links.find((link) => link.href === href)?.name.toLowerCase();
    if (active) {
      setActiveItem(active);
      setOpenSubMenu(undefined);
    }
  };

 const handleAccountClick = () => {
    // router.push('/account');
   console.log('Clicou no botão do header');
 };

  const handleModalAccountClick = () => {
    // router.push('/account');
    console.log('Clicou no botão do modal');
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
    setOpenSubMenu(undefined);
  };

  const handleItemSelect = (id: string) => {
    if (id.startsWith('jogo')) {
      setActiveItem('jogos');
    } else {
      setActiveItem(id);
    }
  };

  const handleNavigate = (href: string) => {
    // router.push(href);
    setIsMenuOpen(false);
    setOpenSubMenu(undefined);
    const menuItem = menuItems.find(
      (item) =>
        item.href === href || item.subItems?.some((sub) => sub.href === href)
    );

    if (menuItem) {
      setActiveItem(menuItem.id);
    }
  };

  const links = [
    { name: 'Início', href: '/' },
    { name: 'Jogos', href: '/jogos' },
    { name: 'Sobre', href: '/sobre' },
    { name: 'Newsletter', href: '/Newsletter' },
    // { name: 'Lojinha', href: '/lojinha' },
    // { name: 'Contato', href: '/contato' },
  ];

  const menuItems = [
    {
      id: 'inicio',
      label: 'Início',
      icon: <House size={24} />,
      href: '/',
    },
    {
      id: 'jogos',
      label: 'Jogos',
      icon: <Rocket size={24} />,
      href: '/jogos',
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
      href: '/Sobre',
    },
    {
      id: 'newsletter',
      label: 'Newsletter',
      icon: <Newspaper size={24} />,
      href: '/newsletter',
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

  return (
    <>
      <HeaderComponent
        links={links}
        activeLink={activeItem}
        onLogoClick={handleLogoClick}
        onMenuClick={handleMenuClick}
        onLinkClick={handleLinkClick}
        onAccountClick={handleAccountClick}
      />
      <ModalMenu
        isOpen={isMenuOpen}
        onClose={handleCloseMenu}
        activeItem={activeItem}
        onItemSelect={handleItemSelect}
        customItems={menuItems}
        openSubMenu={openSubMenu}
        onToggleSubMenu={handleToggleSubMenu}
        onNavigate={handleNavigate}
        // footerButton={
        //   isMobile
        //     ? {
        //         label: 'Minha Conta',
        //         onClick: handleModalAccountClick,
        //       }
        //     : undefined
        // }
      />
    </>
  );
};

export default Header;
