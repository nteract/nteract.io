// @flow
//Sections
import Layout from "../../components/layout/layout";
import ContentSection from "../../components/content-section/content-section";
import DesktopHeader from './page-header'


const OpenNotebooksFeature = () => (
    <ContentSection>
        <div className="panes center-vertically">
            <div className="pane-30 pane">
                <h3>Double Click</h3>
                <p>Open notebooks natively on Mac, Windows, and Linux</p>
            </div>
            <div className="pane-70 pane">
                <div className="section-graphic">
                    <video
                        style={{
              boxShadow: "0 4px 14px 0 rgba(0,0,0,.1)",
              transform: "translateX(50px)"
            }}
                        src="/static/double-click-notebook.mp4"
                        autoPlay
                        loop
                    />
                </div>
            </div>
        </div>
    </ContentSection>
);

export default () => (
    <Layout pageTitle=": The nteract Desktop App">
        <DesktopHeader />
        <OpenNotebooksFeature />
    </Layout>
);
