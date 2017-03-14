import React from 'react'
import styles from './hero.scss'

import SocialButtons from "../../../components/navigation/social-buttons";

export default () => (
    <div>
        <style dangerouslySetInnerHTML={{__html: styles}}/>
        <section className="hero">
            <div className="hero-wrapper">
                <div className="hero-left">
                    <h1>Take your computing experience to the next level.</h1>
                    <p>nteract is a desktop application that allows you to develop rich documents that contain prose,
                        executable
                        code (in almost any language!), and images. Whether you're a developer, data scientist,
                        researcher, or journalist, nteract helps you
                        write your next code-driven story.</p>
                    <div className="mobile-only hero-mobile-message">
                        <h4>Connect with us</h4>
                        <SocialButtons/>
                    </div>
                    <div className="buttons not-mobile">
                        <div className="button button-primary">
                            <div className="button-wrapper">
                                <div className="button-icon">
                                    <img src="https://nteract.io/assets/images/icon-nteract-download.svg" alt=""/>
                                </div>
                                <div className="button-label">
                                    Download Alpha for MacOS
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="footnote not-mobile">
                        <div className="footnote-message">
                            Also available for other platforms
                        </div>
                        <div className="footnote-icon">
                            <svg viewBox="0 0 24 24">
                                <path fill="#000000"
                                      d="M3,12V6.75L9,5.43V11.91L3,12M20,3V11.75L10,11.9V5.21L20,3M3,13L9,13.09V19.9L3,18.75V13M20,13.25V22L10,20.09V13.1L20,13.25Z"/>
                            </svg>
                        </div>
                        <div className="footnote-icon">
                            <svg viewBox="0 0 24 24">
                                <path fill="#000000" d="M13.18,14.5C12.53,15.26 11.47,15.26 10.82,14.5L7.44,10.5C7.16,11.28 7,12.12 7,13C7,14.67 7.57,16.18 8.5,17.27C10,17.37 11.29,17.96 11.78,19C11.85,19 11.93,19 12.22,19C12.71,18 13.95,17.44 15.46,17.33C16.41,16.24 17,14.7 17,13C17,12.12 16.84,11.28 16.56,10.5L13.18,14.5M20,20.75C20,21.3 19.3,22 18.75,22H13.25C12.7,22 12,21.3 12,20.75C12,21.3 11.3,22 10.75,22H5.25C4.7,22 4,21.3 4,20.75C4,19.45 4.94,18.31 6.3,17.65C5.5,16.34 5,14.73 5,13C4,15 2.7,15.56 2.09,15C1.5,14.44 1.79,12.83 3.1,11.41C3.84,10.6 5,9.62 5.81,9.25C6.13,8.56 6.54,7.93 7,7.38V7A5,5 0 0,1 12,2A5,5 0 0,1 17,7V7.38C17.46,7.93 17.87,8.56 18.19,9.25C19,9.62 20.16,10.6 20.9,11.41C22.21,12.83 22.5,14.44 21.91,15C21.3,15.56 20,15 19,13C19,14.75 18.5,16.37 17.67,17.69C19.05,18.33 20,19.44 20,20.75M9.88,9C9.46,9.5 9.46,10.27 9.88,10.75L11.13,12.25C11.54,12.73 12.21,12.73 12.63,12.25L13.88,10.75C14.29,10.27 14.29,9.5 13.88,9H9.88M10,5.25C9.45,5.25 9,5.9 9,7C9,8.1 9.45,8.75 10,8.75C10.55,8.75 11,8.1 11,7C11,5.9 10.55,5.25 10,5.25M14,5.25C13.45,5.25 13,5.9 13,7C13,8.1 13.45,8.75 14,8.75C14.55,8.75 15,8.1 15,7C15,5.9 14.55,5.25 14,5.25Z" />
                            </svg>
                        </div>
                    </div>
                </div>
                <div className="hero-right">
                    <img src="https://nteract.io/assets/images/nteract_app_demo@2x.png" alt="nteract demo" className="mobile-only" />
                    <video className="not-mobile" poster="https://nteract.io/assets/images/nteract_app_demo@2x.png" preload="auto"
                           loop="loop" autoPlay="true" muted="true">
                        <source src="https://nteract.io/assets/images/video/nteract_app_demo@2x.mp4" type="video/mp4"/>
                        <source src="https://nteract.io/assets/images/video/nteract_app_demo@2x.webm"
                                type="video/webm"/>
                    </video>
                </div>
            </div>
        </section>
    </div>
)