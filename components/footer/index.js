import React from 'react';
import Link from "next/link";
import { navigation, NavItems } from '@components/header';
import { StyledFooter } from '@components/footer/styled';

const Footer = (props) => (
  <StyledFooter>
    <StyledFooter.Wrapper>
      <StyledFooter.Section>
        <Link href="https://numfocus.org/">
          <a target="_blank">
            <img
              src="https://nteract.github.io/assets/images/sponsor-numfocus.png"
              alt="NumFocus"
            />
          </a>
        </Link>
      </StyledFooter.Section>
      <StyledFooter.Section>
        <NavItems {...navigation.left} />
        <NavItems {...navigation.right} />
        <NavItems {...navigation.social} />
      </StyledFooter.Section>
    </StyledFooter.Wrapper>
  </StyledFooter>
);

export { Footer };
