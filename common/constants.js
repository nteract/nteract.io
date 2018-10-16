const unit = 12;
const gutter = unit * 2;
const globalWidth = 1250;
const globalEasing = `cubic-bezier(0.24, 0.8, 0, 0.97)`
const headerHeight = 100;

const primaryColor = `rgba(87, 100, 198, 1)`;
const linkColor = primaryColor;
const bgColor = `rgba(248, 248, 248, 1)`;
const colors = {
  // Core colors
  primaryColor,
  linkColor,
  bgColor,
  colorTextBase: `rgba(49, 49, 49, 1)`,
  darkPrimaryColor: `${primaryColor}`,
  lightPrimaryColor: `${primaryColor}`,
  darkColor: `#333`,
  darkGrayColor: `#666`,
  grayColor: `#999`,
  lightGrayColor: `#ccc`,
  lightColor: `#fff`,
  darkLinkColor: `${linkColor}`,
  borderColor: `#efefef`,
  darkBgColor: `${bgColor}`,

  lightBgColor: `#fff`,
  darkNavyColor: `#334865`,
  kernelColor: `rgb(44, 31, 57)`,
  // Control colors
  controlColorSuccess: `#32b643`,
  controlColorWarning: `#ffb700`,
  controlColorDanger: `#e85600`,
  // Meta colors
  codeColor:`#e06870`,
  dropShadow: `rgba(8, 12, 16, 0.2)`,
  highlightColor: `#ffe9b3`
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
  dropShadow: `0px 2px 8px rgba(${colors.dropShadow}`,
  dropShadowLight: `0px 2px 6px ${colors.dropShadow}`,
  dropShadowXL: `0px 10px 20px ${colors.dropShadow}`,
  dropShadowXLLight: `0px 10px 20px ${colors.dropShadow}`,
  dropShadowL: `0px 6px 14px ${colors.dropShadow}`,
  dropShadowLLight: `0px 6px 14px ${colors.dropShadow}`,
  dropShadowPressed: `0px 2px 2px ${colors.dropShadow};`,
  textShadowDefault: `0px 1px 2px ${colors.dropShadow}`,
}

export { spacing, colors, fonts, effects, animations };
