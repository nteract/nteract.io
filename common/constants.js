const unit = 12;
const gutter = unit * 2;
const globalWidth = 1250;
const globalEasing = 'cubic-bezier(0.24, 0.8, 0, 0.97)'
const headerHeight = 100;

const primaryColor = '#5764c6';
const linkColor = primaryColor;
const bgColor = '#f8f8f8';
const colors = {
  // Core colors
  primaryColor,
  linkColor,
  bgColor,
  colorTextBase: '#313131',
  darkPrimaryColor: `darken(${primaryColor}, 5%)`,
  lightPrimaryColor: `lighten(${primaryColor}, 42%)`,
  darkColor: '#333',
  darkGrayColor: '#666',
  grayColor: '#999',
  lightGrayColor: '#ccc',
  lightColor: '#fff',
  darkLinkColor: `darken(${linkColor}, 10%)`,
  borderColor: '#efefef',
  darkBgColor: `darken(${bgColor}, 3%')`,
  lightBgColor: '#fff',
  darkNavyColor: '#334865',
  // Control colors
  controlColorSuccess: '#32b643',
  controlColorWarning: '#ffb700',
  controlColorDanger: '#e85600',
  // Meta colors
  codeColor:'#e06870',
  highlightColor: '#ffe9b3'
};

const timing = 0.38;
const easing = globalEasing;
const transition =  `${timing} all ${easing}`;
const timingAnimation = `${0.38*2.5}`;
const timingAnimationDelay = `${0.38*2.5/2}`;
const animations = {
  timing,
  timingAnimation,
  timingAnimationDelay,
  easing,
  transition
}

const fonts = {
  headings: `"Nunito", sans-serif`,
  body: `-apple-system, system-ui, BlinkMacSystemFont, "Segoe UI",
  Roboto`,
};

const spacing = {
  unit,
  gutter,
  globalWidth,
  headerHeight,
};


const effects = { 
  dropShadow: '0px 2px 8px rgba(darken($main-color, 25%), 0.4)',
  dropShadowLight: '0px 2px 6px rgba(darken($main-color, 25%), 0.08")',
  dropShadowXL: '0px 10px 20px rgba(darken($main-color, 25%), 0.4)',
  dropShadowXLLight: '0px 10px 20px rgba(darken($main-color, 25%), 0.2)',
  dropShadowL: '0px 6px 14px rgba(darken($main-color, 25%), 0.4)',
  dropShadowLLight: '0px 6px 14px rgba(darken($main-color, 25%), 0.1)',
  dropShadowPressed: '0px 2px 2px rgba(darken($main-color, 25%), 0.2)',
  textShadowDefault: '0px 1px 2px rgba(darken($main-color, 25%), 0.5)',
}

export { spacing, colors, fonts, effects, animations };
