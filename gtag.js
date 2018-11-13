// nteract.io's GA Tracking ID (I just set this up)
export const GA_TRACKING_ID = "UA-129108362-1";

/**
 * pages/_document.js will load the google analytics adapter and use
 * nteract.io's tracking ID above.
 *
 * The following functions are helpers for submitting events and page views
 *
 * Usage:
 *   gtag.event({
 *      action: 'clone',
 *      category: 'workflow',
 *      label: 'test'
 *   })
 *
 */

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = url => {
  window.gtag("config", GA_TRACKING_ID, {
    page_location: url
  });
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }) => {
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value
  });
};
