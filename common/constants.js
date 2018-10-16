import { colors, darken, lighten } from '@common/colors'
const unit = 12;
const gutter = unit * 2;
const globalWidth = 1250;
const globalEasing = `cubic-bezier(0.24, 0.8, 0, 0.97)`
const headerHeight = 100;

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
  dropShadow: `0px 2px 8px rgba(${darken(colors.mainColor, 25, true)}, 0.4)`,
  dropShadowLight: `0px 2px 6px rgba(${darken(colors.mainColor, 25, true)}, 0.08)`,
  dropShadowXL: `0px 10px 20px rgba(${darken(colors.mainColor, 25, true)}, 0.4)`,
  dropShadowXLLight: `0px 10px 20px rgba(${darken(colors.mainColor, 25, true)}, 0.2)`,
  dropShadowL: `0px 6px 14px rgba(${darken(colors.mainColor, 25, true)}, 0.4)`,
  dropShadowLLight: `0px 6px 14px rgba(${darken(colors.mainColor, 25, true)}, 0.1)`,
  dropShadowPressed: `0px 2px 2px rgba(${darken(colors.mainColor, 25, true)}, 0.2);`,
  textShadowDefault: `0px 1px 2px rgba(${darken(colors.mainColor, 25, true)}, 0.5)`,
}

export { spacing, fonts, effects, animations };
