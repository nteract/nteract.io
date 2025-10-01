import * as React from "react";
import Link from "next/link";
import { StyledLanguageToggle, StyledKernelListItem } from "./styled";

type KernelSelect = {
  path: string;
  name: string;
};

type LanguageToggleProps = {
  kernels: Array<KernelSelect>;
  current: string;
};

const LanguageToggle = ({ kernels, current }: LanguageToggleProps) => (
  <StyledLanguageToggle>
    <ul>
      {kernels.map((kernel: KernelSelect) => (
        <StyledKernelListItem
          key={kernel.path}
          selected={current === kernel.name}
        >
          <Link href={kernel.path} prefetch>
            {kernel.name}
          </Link>
        </StyledKernelListItem>
      ))}
    </ul>
  </StyledLanguageToggle>
);

export default LanguageToggle;
