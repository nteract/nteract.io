import Head from '../head/head'
import Header from '../header/header'
import Footer from '../footer/footer'
import styles from './layout.scss'


export default ({children, pageTitle}) => (
    <div className="layout">
        <style dangerouslySetInnerHTML={{__html: styles}}/>

        <Head pageTitle={pageTitle}/>
        <Header />
        <div className="page">
            { children }
        </div>
        <Footer />
    </div>
)