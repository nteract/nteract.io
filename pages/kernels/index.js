// @flow

/**
 * Note that each of these pages has to exist as a standalone because of how
 * the routing works with next.js. We get a nice nav, complete with prefetch,
 * yet we have to repeat ourselves sometimes. I think it's worth it. :)
 */

import Python from "./python";
export default () => <Python />;
