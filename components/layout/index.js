import React from "react"
import Head from '../head'
import { StyledLayout, StyledPage } from "./styled"
import { Header } from '../header'
import { Footer } from '../footer'
export default ({ pageTitle, themeColor, children }) => { 
    return (<StyledLayout>
                <Head pageTitle={pageTitle} />
                <StyledPage>{children}</StyledPage>
            </StyledLayout>)
}
