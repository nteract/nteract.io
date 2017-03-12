// @flow
import Link from "next/link";

type KernelSelect = {
  path: string,
  name: string
};

type LanguageToggleProps = {
  kernels: Array<KernelSelect>,
  current: string
};

const LanguageToggle = (props: LanguageToggleProps) => (
  <nav>
    <ul>
      {props.kernels.map((kernel: KernelSelect) => (
        <li
          key={kernel.path}
          className={props.current === kernel.name ? "kernel-selected" : ""}
        >
          <Link href={kernel.path} prefetch>
            <a>{kernel.name}</a>
          </Link>
        </li>
      ))}
    </ul>
  </nav>
);

export default LanguageToggle;
