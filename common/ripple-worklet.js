if (registerPaint) {
  registerPaint(
    'ripple',
    class {
      static get inputProperties() {
        return [
          'background-color',
          '--ripple-color',
          '--animation-tick',
          '--ripple-x',
          '--ripple-y',
          '--ripple-speed',
        ];
      }
      static get contextOptions() {
        return {
          /** Proposed option to force using 1:1 pixel mapping instead of CSS Pixels. */
          // nativePixels: true,

          /** Proposed option to disable the default upscaling via high resolution backing canvas.
           *
           *  Note: if animating and crisp lines are less important, disabling scaling
           *  improves polyfill performance, since it reduces the canvas size by 75%.
           */
          scaling: false,
        };
      }
      paint(ctx, geom, properties) {
        const bgColor = properties.get('background-color').toString();
        const rippleColor = properties.get('--ripple-color').toString();
        const x = parseFloat(properties.get('--ripple-x').toString());
        const y = parseFloat(properties.get('--ripple-y').toString());
        const speed =
          parseFloat((properties.get('--ripple-speed') || '').toString()) || 1;
        let tick = parseFloat(properties.get('--animation-tick').toString());
        tick *= speed;
        if (tick < 0) tick = 0;
        if (tick > 1000) tick = 1000;

        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, geom.width, geom.height);

        ctx.fillStyle = rippleColor;
        ctx.globalAlpha = 1 - tick / 1000;
        ctx.arc(
          x,
          y, // center
          geom.width * tick / 1000, // radius
          0, // startAngle
          2 * Math.PI, //endAngle
        );
        ctx.fill();
      }
    },
  );
}
