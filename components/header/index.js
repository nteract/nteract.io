import React from "react";
import { StyledHeader } from "@components/header/styled";
import { StyledHero } from "@components/hero/styled";
import Pattern from "@components/hero/pattern";
import DiscordIcon from "mdi-react/DiscordIcon";
import GithubCircleIcon from "mdi-react/GithubIcon";
import TwitterCircleIcon from "mdi-react/TwitterIcon";
import MenuIcon from "mdi-react/MenuIcon";
import CloseIcon from "mdi-react/CloseIcon";
import Link from "next/link";

const leftNav = {
  items: [
    {
      label: "Blog",
      href: "https://blog.nteract.io/",
      target: "_blank"
    },
    {
      label: "About",
      href: "/about",
      prefetch: true
    },
    {
      label: "Feedback",
      href: "https://github.com/nteract/nteract/issues/new/choose",
      target: "_blank"
    }
  ]
};

const rightNav = {
  items: [
    {
      label: "Core SDK",
      href: "/sdk",
      prefetch: true
    },
    {
      label: "Applications",
      href: "/applications",
      prefetch: true
    },
    {
      label: "Libraries",
      href: "/libraries",
      prefetch: true
    },
    {
      label: "Kernels",
      href: "/kernels",
      prefetch: true
    },
    {
      label: "Docs",
      href: "https://docs.nteract.io",
      prefetch: false
    },
    {
      label: "Help",
      href: "https://discord.gg/tQrtRwuxqW",
      prefetch: false
    },
    {
      label: "Donate",
      href: "https://numfocus.org/donate-to-nteract",
      prefetch: false
    },
  ]
};

const socialItems = {
  items: [
    {
      icon: <DiscordIcon color="currentColor" />,
      href: "https://discord.gg/tQrtRwuxqW",
      target: "_blank"
    },
    {
      icon: <GithubCircleIcon color="currentColor" />,
      href: "https://github.com/nteract",
      target: "_blank"
    },
    {
      icon: <TwitterCircleIcon color="currentColor" />,
      href: "https://twitter.com/nteractio",
      target: "_blank"
    }
  ]
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
  });
  return <StyledHeader.NavWrapper {...rest}>{links}</StyledHeader.NavWrapper>;
};

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
    mobileMenuOpen: false
  };
  openMenu = () => {
    if (!this.state.mobileMenuOpen) {
      this.setState({
        mobileMenuOpen: true
      });
    }
  };
  handleClick = () => {
    this.closeMenu();
  };
  closeMenu = () => {
    if (this.state.mobileMenuOpen) {
      this.setState({
        mobileMenuOpen: false
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
                      src="/static/feature_nteract_logo_header_white.svg"
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
            <NavItems onClick={this.handleClick} {...rightNav} />
            <NavItems onClick={this.handleClick} {...socialItems} row />
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
  social: socialItems
};
export { Header, navigation, NavItems };
