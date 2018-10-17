

function shadeColor(color, percent, rgb) {
    if (color == null) {
      console.error('Null color is getting passed to darken')
    }  
    var R = parseInt(color.substring(1,3),16);
    var G = parseInt(color.substring(3,5),16);
    var B = parseInt(color.substring(5,7),16);
  
    R = parseInt(R * (100 + percent) / 100);
    G = parseInt(G * (100 + percent) / 100);
    B = parseInt(B * (100 + percent) / 100);
  
    R = (R<255)?R:255;  
    G = (G<255)?G:255;  
    B = (B<255)?B:255;  
    if (rgb == true) {
      return `${R}, ${G}, ${B}`
    }
    var RR = ((R.toString(16).length==1)?"0"+R.toString(16):R.toString(16));
    var GG = ((G.toString(16).length==1)?"0"+G.toString(16):G.toString(16));
    var BB = ((B.toString(16).length==1)?"0"+B.toString(16):B.toString(16));
  
    return "#"+RR+GG+BB;
  }


export const darken = (color, percent, rgb) => shadeColor(color, -1*percent, rgb)
export const lighten = (color, percent, rgb) => shadeColor(color, percent, rgb)
let mainColor = '#334865';
let colorTextBase = '#313131'; // Default text color
let primaryColor =  '#5764c6';
let darkPrimaryColor = darken(primaryColor, 5);
let lightPrimaryColor =  lighten(primaryColor, 42);
let darkColor = '#333';
let darkGrayColor ='#666';
let darkerGrayColor = '#2B2B2B'
let grayColor = '#999'
let darkNavyColor = '#334865;';
let lightGrayColor = '#ccc';
let lightColor = '#fff';
let linkColor =  primaryColor;
let darkLinkColor =  darken(linkColor, 10);
let borderColor = '#efefef';
let bgColor = '#f8f8f8';
let darkBgColor = darken(bgColor, 3);
let lightBgColor = '#fff';
// Control colors
let controlColorSuccess = '#32b643';
let controlColorWarning =  '#ffb700';
let controlColorDanger =  '#e85600';
// Meta colors
let codeColor = '#e06870';
let highlightColor =  '#ffe9b3';
let lightCodeColor = '#BABABA'

export const colors = {
  // Core colors
  mainColor,
  colorTextBase,
  primaryColor,
  linkColor,
  bgColor,
  colorTextBase,
  darkPrimaryColor,
  lightPrimaryColor,
  darkColor,
  darkGrayColor,
  darkerGrayColor,
  grayColor,
  darkNavyColor,
  lightGrayColor,
  lightColor,
  darkLinkColor,
  borderColor,
  darkBgColor,
  lightBgColor,
  // Control colors
  controlColorSuccess,
  controlColorWarning,
  controlColorDanger,
  // Meta colors
  codeColor,
  lightCodeColor,
  highlightColor,
};
