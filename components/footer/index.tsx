import * as React from "react";
import Link from "next/link";
import { navigation, NavItems } from "@components/header";
import { StyledFooter } from "@components/footer/styled";

const Footer = () => (
  <StyledFooter>
    <StyledFooter.Wrapper>
      <StyledFooter.Section>
        <Link href="https://numfocus.org/" target="_blank">
          <img src="/static/sponsor-numfocus.png" alt="NumFocus" />
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
