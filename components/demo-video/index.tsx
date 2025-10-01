const Index = () => (
  <video
    poster="/static/nteract_app_demo@2x.png"
    preload="auto"
    autoPlay
    muted
    loop
  >
    <source src="/static/nteract_app_demo@2x.mp4" type="video/mp4" />
    <source src="/static/nteract_app_demo@2x.webm" type="video/webm" />
  </video>
);

export default Index;
