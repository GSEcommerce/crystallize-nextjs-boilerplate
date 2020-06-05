import React, { useState } from 'react';
import Link from 'next/link';

import { useAuth } from 'components/auth-context';
import { useSettings } from 'components/settings-context';

import LogoShop from 'ui/icons/logo-shop';

import BurgerButton from './burger-button';
import BasketButton from './basket-button';
import { Outer, Nav, Logo, NavActions, NavList, NavListItem } from './styles';

export default function Header({ simple }) {
  const { mainNavigation, language } = useSettings();
  const auth = useAuth();

  const [navOpen, setNavOpen] = useState(false);

  return (
    <Outer simple={simple}>
      <Link href={`/${language}`}>
        <a>
          <Logo>
            <LogoShop />
          </Logo>
        </a>
      </Link>
      <Nav open={navOpen}>
        <NavList>
          {mainNavigation.map((category) => (
            <NavListItem key={category.path}>
              <Link
                as={`/${category.language}${category.path}`}
                href="/[lang]/[...catalogue]"
              >
                <a onClick={() => setNavOpen(false)}>{category.name}</a>
              </Link>
            </NavListItem>
          ))}
        </NavList>
      </Nav>
      <NavActions open={navOpen}>
        {auth.isLoggedIn ? (
          <button type="button" onClick={auth.logout}>
            Logout
          </button>
        ) : (
          <Link href={`/${language}/login`}>
            <a>Login</a>
          </Link>
        )}
      </NavActions>
      <BasketButton />
      <BurgerButton active={navOpen} onClick={() => setNavOpen(!navOpen)} />
    </Outer>
  );
}
