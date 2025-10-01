declare module "react-syntax-highlighter" {
  import { Component } from "react";

  interface SyntaxHighlighterProps {
    language?: string;
    style?: any;
    children?: string | string[];
    customStyle?: React.CSSProperties;
    codeTagProps?: React.HTMLProps<HTMLElement>;
    useInlineStyles?: boolean;
    showLineNumbers?: boolean;
    startingLineNumber?: number;
    lineNumberStyle?: any;
    [key: string]: any;
  }

  class SyntaxHighlighter extends Component<SyntaxHighlighterProps> {}
  export default SyntaxHighlighter;
  export { SyntaxHighlighter };
}

declare module "react-syntax-highlighter/styles/hljs" {
  export const github: any;
  export const monokai: any;
  export const tomorrow: any;
  export const vs: any;
  export const xcode: any;
  export const androidstudio: any;
  export const atomOneDark: any;
  export const atomOneLight: any;
  export const dracula: any;
  export const googlecode: any;
  export const hopscotch: any;
  export const hybrid: any;
  export const idea: any;
  export const ir_black: any;
  export const magula: any;
  export const monoBlue: any;
  export const monokaiSublime: any;
  export const obsidian: any;
  export const ocean: any;
  export const paraisoDark: any;
  export const paraisoLight: any;
  export const pojoaque: any;
  export const purebasic: any;
  export const qtcreatorDark: any;
  export const qtcreatorLight: any;
  export const railscasts: any;
  export const rainbow: any;
  export const schoolBook: any;
  export const solarizedDark: any;
  export const solarizedLight: any;
  export const sunburst: any;
  export const tomorrowNight: any;
  export const tomorrowNightBlue: any;
  export const tomorrowNightBright: any;
  export const tomorrowNightEighties: any;
  export const vs2015: any;
  export const xt256: any;
  export const zenburn: any;
}
