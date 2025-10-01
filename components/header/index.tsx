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

interface NavItem {
  label?: string;
  href: string;
  target?: string;
  icon?: React.ReactNode;
  prefetch?: boolean;
}

interface NavConfig {
  items: NavItem[];
}

const leftNav: NavConfig = {
  items: [
    {
      label: "Blog",
      href: "https://blog.nteract.io/",
      target: "_blank",
    },
    {
      label: "About",
      href: "/about",
      prefetch: true,
    },
    {
      label: "Feedback",
      href: "https://github.com/nteract/nteract/issues/new/choose",
      target: "_blank",
    },
  ],
};

const rightNav: NavConfig = {
  items: [
    {
      label: "Core SDK",
      href: "/sdk",
      prefetch: true,
    },
    {
      label: "Applications",
      href: "/applications",
      prefetch: true,
    },
    {
      label: "Libraries",
      href: "/libraries",
      prefetch: true,
    },
    {
      label: "Kernels",
      href: "/kernels",
      prefetch: true,
    },
    {
      label: "Docs",
      href: "https://docs.nteract.io",
      prefetch: false,
    },
    {
      label: "Help",
      href: "https://discord.gg/tQrtRwuxqW",
      prefetch: false,
    },
    {
      label: "Donate",
      href: "https://numfocus.org/donate-to-nteract",
      prefetch: false,
    },
  ],
};

const socialItems: NavConfig = {
  items: [
    {
      icon: <DiscordIcon color="currentColor" />,
      href: "https://discord.gg/tQrtRwuxqW",
      target: "_blank",
    },
    {
      icon: <GithubCircleIcon color="currentColor" />,
      href: "https://github.com/nteract",
      target: "_blank",
    },
    {
      icon: <TwitterCircleIcon color="currentColor" />,
      href: "https://twitter.com/nteractio",
      target: "_blank",
    },
  ],
};

interface MobileMenuProps {
  open: boolean;
  children?: React.ReactNode;
}

const MobileMenu = ({ open, ...rest }: MobileMenuProps) =>
  open ? <StyledHeader.MobileMenu {...rest} /> : null;

interface NavItemsProps extends NavConfig {
  onClick?: () => void;
  $desktop?: boolean;
  $row?: boolean;
}

const NavItems = ({ items, ...rest }: NavItemsProps) => {
  let links = items.map(({ label, href, target, icon, ...linkProps }, i) => {
    const content = icon ? icon : label;
    return target ? (
      <a key={i} href={href} target={target} {...linkProps}>
        {content}
      </a>
    ) : (
      <Link key={i} href={href} {...linkProps}>
        {content}
      </Link>
    );
  });
  return <StyledHeader.NavWrapper {...rest}>{links}</StyledHeader.NavWrapper>;
};

interface MobileMenuButtonProps {
  open: boolean;
  onClick?: () => void;
}

const MobileMenuButton = ({ open, ...rest }: MobileMenuButtonProps) => {
  const IconComponent = open ? CloseIcon : MenuIcon;
  return (
    <StyledHeader.MobileMenuButton {...rest}>
      <IconComponent color="white" size={32} />
    </StyledHeader.MobileMenuButton>
  );
};

interface HeaderState {
  mobileMenuOpen: boolean;
}

class Header extends React.PureComponent<{}, HeaderState> {
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
    this.closeMenu();
  };

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
                      src="/feature_nteract_logo_header_white.svg"
                      alt="nteract"
                    />
                  </StyledHeader.Logo>
                </Link>
                <NavItems {...leftNav} $desktop />
              </StyledHeader.Section>

              <StyledHeader.Section>
                <NavItems {...rightNav} $desktop />
                <NavItems {...socialItems} $desktop $row />
              </StyledHeader.Section>
            </StyledHeader.Wrapper>
          </StyledHeader>
          <MobileMenu open={this.state.mobileMenuOpen}>
            <NavItems onClick={this.handleClick} {...leftNav} />
            <NavItems onClick={this.handleClick} {...rightNav} />
            <NavItems onClick={this.handleClick} {...socialItems} $row />
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
