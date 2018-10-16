import React from 'react';
import { StyledHeader } from '@components/header/styled';
import { StyledHero } from '@components/hero/styled';
import Pattern from '@components/hero/pattern';
import {
  SlackIcon,
  GithubCircleIcon,
  TwitterCircleIcon,
  MenuIcon,
  CloseIcon,
} from 'mdi-react';
import Link from 'next/link';

const leftNav = {
  items: [
    {
      label: 'Blog',
      href: 'https://blog.nteract.io/',
      target: '_blank',
    },
    {
      label: 'About',
      href: '/about',
      prefetch: true,
    },
  ],
};

const rightNav = {
  items: [
    {
      label: 'Desktop',
      href: '/desktop',
      prefetch: true,
    },
    {
      label: 'Atom',
      href: '/atom',
      prefetch: true,
    },
    {
      label: 'Kernels',
      href: '/kernels',
      prefetch: true,
    },
  ],
};

const socialItems = {
  items: [
    {
      icon: <SlackIcon color="currentColor" />,
      href: 'https://slackin-nteract.now.sh/',
      target: '_blank',
    },
    {
      icon: <GithubCircleIcon color="currentColor" />,
      href: 'https://github.com/nteract',
      target: '_blank',
    },
    {
      icon: <TwitterCircleIcon color="currentColor" />,
      href: 'https://twitter.com/nteractio',
      target: '_blank',
    },
  ],
};

const MobileMenu = ({ open, ...rest }) =>
  open ? <StyledHeader.MobileMenu {...rest} /> : null;

const NavItems = ({ items, ...rest }) => {
  let links = items.map(({ label, href, target, icon, ...linkProps }, i) => {
    const content = icon ? icon : label;
    return target ? (
      <a key={i} href={href} target={target} {...linkProps}>
        {content}
      </a>
    ) : (
      <Link key={i} href={href} {...linkProps}>
        <a href={href}>{content}</a>
      </Link>
    );
  })
  return (<StyledHeader.NavWrapper {...rest}>
    {links}
  </StyledHeader.NavWrapper>)
}

const MobileMenuButton = ({ open, ...rest }) => {
  const IconComponent = open ? CloseIcon : MenuIcon;
  return (
    <StyledHeader.MobileMenuButton {...rest}>
      <IconComponent color="white" size={32} />
    </StyledHeader.MobileMenuButton>
  );
};
class Header extends React.PureComponent {
  state = {
    mobileMenuOpen: false,
  };
  openMenu = () => {
    if (!this.state.mobileMenuOpen) {
      this.setState({
        mobileMenuOpen: true,
      });
    }
  };
  handleClick = () => {
    this.closeMenu()
  }
  closeMenu = () => {
    if (this.state.mobileMenuOpen) {
      this.setState({
        mobileMenuOpen: false,
      });
    }
  };

  render() {
    {
      return (
        <>
          <StyledHeader>
            <StyledHeader.Wrapper>
              <StyledHeader.Section>
                <Link href="/" prefetch>
                  <StyledHeader.Logo>
                    <img
                      src="https://nteract.github.io/assets/images/feature_nteract_logo_header_white@2x.png"
                      alt="nteract"
                    />
                  </StyledHeader.Logo>
                </Link>
                <NavItems {...leftNav} desktop />
              </StyledHeader.Section>

              <StyledHeader.Section>
                <NavItems {...rightNav} desktop />
                <NavItems {...socialItems} desktop row />
              </StyledHeader.Section>
            </StyledHeader.Wrapper>
          </StyledHeader>
          <MobileMenu open={this.state.mobileMenuOpen}>
            <NavItems onClick={this.handleClick} {...leftNav} />
            <NavItems onClick ={this.handleClick} {...rightNav} />
            <NavItems onClick ={this.handleClick} {...socialItems} row />
            <StyledHero.Background>
              <Pattern />
            </StyledHero.Background>
          </MobileMenu>
          <MobileMenuButton
            open={this.state.mobileMenuOpen}
            onClick={
              this.state.mobileMenuOpen
                ? () => this.closeMenu()
                : () => this.openMenu()
            }
          />
        </>
      );
    }
  }
}
const navigation = {
  left: leftNav,
  right: rightNav,
  social: socialItems,
};
export { Header, navigation, NavItems };
