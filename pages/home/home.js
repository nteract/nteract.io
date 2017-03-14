import React from 'react'

import styles from './home.scss'

//Sections
import Hero from './hero/hero'
import Main from './main/main'

class Home extends React.Component {

    render () {
        return (
            <div>
                <style dangerouslySetInnerHTML={{__html: styles}}/>
                <Hero />
                <Main />
            </div>
        )
    }
}

export default Home