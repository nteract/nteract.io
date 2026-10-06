import { TerminalDemo, type TerminalStep } from "@/components/terminal-demo";

// Exact stdout from `nteract open --help`, captured on Rivet on 2026-10-06.
// Binary: nteract 2.8.0-nightly.202610060313+0088b6b.
// Directory semantics: nteract/nteract docs/runbooks/cli.md at 105ad3b8f9b7b965f6fd2496a8f476fccb60bd89.
// The directory-open command is illustrated, never executed by this component.
const steps: TerminalStep[] = [
  {
    command: "nteract open --help",
    output: `Open the notebook application

Usage: nteract open [OPTIONS] [PATH]

Arguments:
  [PATH]  Path to notebook file or directory to open

Options:
  -r, --runtime <RUNTIME>  Runtime for new notebooks (python, deno)
  -h, --help               Print help`,
  },
  {
    command: "nteract .",
    note: "Opens a fresh untitled notebook in the current directory. This step is illustrated; no application is launched here.",
  },
];

export function NteractCliDemo() {
  return <TerminalDemo title="nteract · your project" steps={steps} caption="Help output captured from a local nteract 2.8 nightly. The directory-open step is an illustration of the documented behavior." />;
}
