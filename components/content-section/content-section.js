import React from "react";
import styles from "./content-section.scss";
import inView from "in-view";

export class ContentSectionPane extends React.Component {


    render() {

        return (<div className={`pane-50 pane ${this.props.layout ? this.props.layout : ""}`}>
            {this.props.children}
        </div>);
    }
}

export class ContentSection extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        inView.offset(50);
        inView(".inview").on("enter", el => {
            if (!el.classList.contains("showing")) {
                el.classList.add("showing");
            }
        });
    }

    render() {
        return (
            <section className="content-section">
                <style dangerouslySetInnerHTML={{__html: styles}}/>
                <div className="content-section-wrapper inview">
                    <div className="panes center-vertically">
                        {this.props.children}
                    </div>
                </div>
            </section>
        );
    }
}
