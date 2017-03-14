import React from "react";
import styles from "./main.scss";
import ContentSection
  from "../../../components/content-section/content-section";

const Main = () => (
  <div>
    <style dangerouslySetInnerHTML={{ __html: styles }} />
    <ContentSection>
      <div className="panes center-vertically">
        <div className="pane-50 pane">
          <h3>Interactivity Where You Need It Most</h3>
          <p>
            nteract is a desktop-based computing environment, which means that the application
            can take
            advantage of all the goodies that your operating system provides, like file search
            and click
            to open. nteract and the desktop belong together.
          </p>
        </div>
        <div className="pane-50 pane">
          <div className="section-graphic">
            <img
              src="https://nteract.github.io/assets/images/feature_nteract_desktop@2x.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </ContentSection>

    <ContentSection>
      <div className="panes center-vertically">
        <div className="pane-50 pane">
          <div className="section-graphic">
            <img
              src="https://nteract.github.io/assets/images/feature_nteract_composable@2x.png"
              alt=""
            />
          </div>
        </div>
        <div className="pane-50 pane">
          <h3>Composability for All</h3>
          <p>
            nteract is built on top of a rich ecosystem of packages that allow developers to
            write
            software built on top of the notebook document format and the code execution
            protocol. You
            can visit our GitHub organization to find out which packages you can start to
            develop with.
          </p>
        </div>

      </div>
    </ContentSection>
    <ContentSection>
      <div className="panes center-vertically">
        <div className="pane-50 pane">
          <h3>Open to All</h3>
          <p>
            nteract is completely open-source and licensed under the BSD 3-Clause License. We
            love
            getting pull requests and issues from our users, if you're interested in opening one
            check
            out our contributor documentation.
          </p>
        </div>
        <div className="pane-50 pane">
          <div className="section-graphic">
            <img
              src="https://nteract.github.io/assets/images/feature_nteract_open_to_all@2x.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </ContentSection>
  </div>
);

export default Main;
