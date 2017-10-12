import React from "react";
import styles from "./footer.scss";
import NavigationLeft from "../navigation/navigation-left";
import NavigationRight from "../navigation/navigation-right";
import SocialButtons from "../navigation/social-buttons";

class Footer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <style dangerouslySetInnerHTML={{ __html: styles }} />
        <footer className="footer-main">
          <div className="footer-main-wrapper">
            <div className="footer-main-section">
              <div className="logos">
                <div className="logos-wrapper">
                  {/*<div className="logo"><img*/}
                  {/*src="https://s3-us-west-1.amazonaws.com/plotly-tutorials/plotly-marketing-pages/images/new-branding/logo/images/plotly-logo-01-stripe%402x.png"*/}
                  {/*alt=""/>*/}
                  {/*</div>*/}
                  {/*<div className="logo"><img*/}
                  {/*src="https://nteract.github.io/assets/images/sponsor-domino@3x.png"*/}
                  {/*alt=""/>*/}
                  {/*</div>*/}
                  {/*<div className="logo"><img src="https://nteract.github.io/assets/images/sponsor-carina.svg"*/}
                  {/*alt=""/>*/}
                  {/*</div>*/}
                  <div className="logo">
                    <img
                      src="https://nteract.github.io/assets/images/sponsor-numfocus.png"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="footer-main-section links light">
              <NavigationLeft />
              <NavigationRight />
              <SocialButtons />
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

export default Footer;
