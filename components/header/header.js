import styles from "./header.scss";
import Headroom from "react-headroom";
import Link from "next/link";
import NavigationLeft from "../navigation/navigation-left";
import NavigationRight from "../navigation/navigation-right";
import SocialButtons from "../navigation/social-buttons";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileMenuOpen: false
    };
  }

  handleClick(event) {
    event.preventDefault();
    let el = event.target;

    if (this.state.mobileMenuOpen) {
      this.setState({
        mobileMenuOpen: false
      });
    } else {
      this.setState({
        mobileMenuOpen: true
      });
    }
    console.log(this.state.mobileMenuOpen);
  }

  render() {
    const headerStyleHack = {
      color: this.props.themeColor
    };
    const MobileMenu = () => (
      <div
        className={`mobile-menu ${this.state.mobileMenuOpen
          ? "is-active"
          : ""}`}
      >
        <div className="close-button" onClick={this.handleClick.bind(this)}>
          <svg viewBox="0 0 24 24">
            <path
              fill="#000000"
              d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"
            />
          </svg>
        </div>
        <NavigationRight />
        <NavigationLeft />
        <SocialButtons />
      </div>
    );

    return (
      <div>
        <style dangerouslySetInnerHTML={{ __html: styles }} />
        <Headroom style={headerStyleHack}>
          <header className="header-main">
            <div className="header-main-wrapper">
              <div className="header-main-section">
                <div className="logo">
                  <Link href="/" prefetch>
                    <img
                      src="https://nteract.github.io/assets/images/feature_nteract_logo_header_white@2x.png"
                      alt=""
                    />
                  </Link>
                </div>
                <NavigationLeft />
              </div>
              <div className="header-main-section right not-mobile">
                <NavigationRight />
                <SocialButtons />
              </div>
              <div
                className="mobilemenubutton"
                onClick={this.handleClick.bind(this)}
              >
                <svg viewBox="0 0 24 24">
                  <path
                    fill="#000000"
                    d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z"
                  />
                </svg>
              </div>
            </div>
          </header>
          <MobileMenu />
        </Headroom>
      </div>
    );
  }
}

export default Header;
