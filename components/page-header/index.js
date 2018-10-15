import React from "react"
import { StyledPageHeader } from './styled'

const Title = ({ children }) => (<h1>{children}</h1>)
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
