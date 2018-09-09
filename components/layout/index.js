import React from "react"
import Head from '../head'
import { StyledLayout } from "./styled"
import { Header } from '../header'
import { Footer } from '../footer'

export default ({ pageTitle, themeColor, children }) => (<StyledLayout><Head pageTitle={pageTitle} /><Header themeColor={themeColor} /><Footer /></StyledLayout>)
