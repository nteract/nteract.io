// @flow
import * as React from "react";
import Link from "next/link";
import { StyledLanguageToggle, StyledKernelListItem } from './styled'
type KernelSelect = {
  path: string,
  name: string
};

type LanguageToggleProps = {
  kernels: Array<KernelSelect>,
  current: string
};

const LanguageToggle = ({kernels, current}: LanguageToggleProps) => (
  <StyledLanguageToggle>
    <ul>
      {kernels.map((kernel: KernelSelect) => (
        <StyledKernelListItem
          key={kernel.path}
          selected={props.current === kernel.name}
        >
          <Link href={kernel.path} prefetch>
            <a>{kernel.name}</a>
          </Link>
        </StyledKernelListItem>
      ))}
    </ul>
  </StyledLanguageToggle>
);

export default LanguageToggle;
