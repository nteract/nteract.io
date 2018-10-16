import React from "react"
import { StyledPageHeader } from './styled'
import { Type } from './../typography'
const Title = ({ children }) => (<Type.h1>{children}</Type.h1>)
const Left = ({ children }) => (<StyledPageHeader.Left>{children}</StyledPageHeader.Left>)
const Right = ({ children }) => (<StyledPageHeader.Right>{children}</StyledPageHeader.Right>)

const PageHeader = ({ children, themeColor }) => (
    <StyledPageHeader style={{ backgroundColor: themeColor }}>
        <StyledPageHeader.Wrapper>{children}</StyledPageHeader.Wrapper>
    </StyledPageHeader>
)

PageHeader.Title = Title
PageHeader.Left = Left
PageHeader.Right = Right

export { PageHeader }
