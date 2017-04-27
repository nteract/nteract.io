// // @flow
//
// /**
//  * Note that each of these pages has to exist as a standalone because of how
//  * the routing works with next.js. We get a nice nav, complete with prefetch,
//  * yet we have to repeat ourselves sometimes. I think it's worth it. :)
//  */
//
// import Head from "next/head";
// //Sections
//
// import Python from "./python";
//
// export default () => <Python />;


// @flow
import Layout from "../../components/layout/layout";
import {ContentSection, ContentSectionPane} from "../../components/content-section/content-section";
import React from "react";
import Node from '../../components/kernels/node';
import Python from '../../components/kernels/python';
import R from '../../components/kernels/r';
import {
    PageHeader,
    PageHeaderLeft,
    PageHeaderRight
} from "../../components/page-header/page-header";






export default class Kernels extends React.Component {
    render() {

        let themeColor = '#2C1F39';

        return (
            <Layout pageTitle=": connect with nteract" themeColor={themeColor}>
                <PageHeader themeColor={themeColor}>
                    <PageHeaderLeft>
                        <h1>
                            Kernels
                        </h1>
                        <p>
                            Kernels connect your favorite languages to nteract projects for an improved
                            REPL experience.
                        </p>

                    </PageHeaderLeft>
                    <PageHeaderRight>
                        <img
                            src="static/kernels-terminal.png"
                            alt="Hydrogen"
                            className="cutoff-image"
                        />
                    </PageHeaderRight>
                </PageHeader>





                <Python />
                <Node />
                <R />

            </Layout>
        );
    }
}
