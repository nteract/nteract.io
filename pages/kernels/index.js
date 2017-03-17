// @flow

/**
 * Note that each of these pages has to exist as a standalone because of how
 * the routing works with next.js. We get a nice nav, complete with prefetch,
 * yet we have to repeat ourselves sometimes. I think it's worth it. :)
 */

import Head from "next/head";
//Sections
import Layout from "../../components/layout/layout";
import ContentSection from "../../components/content-section/content-section";
import PageHeader from './page-header'

import Python from "./python";


export default () => (
    <Layout pageTitle=": The nteract Desktop App">
        <PageHeader />
        <ContentSection>
            <Python />
        </ContentSection>
    </Layout>
);
