// @flow
import Layout from "../components/layout/layout";
import {ContentSection, ContentSectionPane} from "../components/content-section/content-section";
import React from "react";
import "isomorphic-fetch";
import fetchUsers from 'fetch-github-organization';

import {
    PageHeader,
    PageHeaderLeft,
    PageHeaderRight
} from "../components/page-header/page-header";

const contributorsData = [
    {
        first_name: 'Kyle',
        last_name: 'Kelley',
        title: 'Netflix',
        avatar: 'https://avatars1.githubusercontent.com/u/836375?v=3&s=400',
        biography: 'Kyle is cool.',
        social: [
            {
                type: 'twitter',
                username: 'rgbkrk'
            },
            {
                type: 'github',
                username: 'rgbkrk'
            },
            {
                type: 'website',
                url: 'https://lambdaops.com/'
            }
        ]

    },
    {
        first_name: 'Kyle',
        last_name: 'Kelley',
        title: 'Netflix',
        avatar: 'https://avatars1.githubusercontent.com/u/836375?v=3&s=400',
        biography: 'Kyle is cool.',
        social: [
            {
                type: 'twitter',
                username: 'rgbkrk'
            },
            {
                type: 'github',
                username: 'rgbkrk'
            },
            {
                type: 'website',
                url: 'https://lambdaops.com/'
            }
        ]

    },
    {
        first_name: 'Kyle',
        last_name: 'Kelley',
        title: 'Netflix',
        avatar: 'https://avatars1.githubusercontent.com/u/836375?v=3&s=400',
        biography: 'Kyle is cool.',
        social: [
            {
                type: 'twitter',
                username: 'rgbkrk'
            },
            {
                type: 'github',
                username: 'rgbkrk'
            },
            {
                type: 'website',
                url: 'https://lambdaops.com/'
            }
        ]

    },
    {
        first_name: 'Kyle',
        last_name: 'Kelley',
        title: 'Netflix',
        avatar: 'https://avatars1.githubusercontent.com/u/836375?v=3&s=400',
        biography: 'Kyle is cool.',
        social: [
            {
                type: 'twitter',
                username: 'rgbkrk'
            },
            {
                type: 'github',
                username: 'rgbkrk'
            },
            {
                type: 'website',
                url: 'https://lambdaops.com/'
            }
        ]

    },
    {
        first_name: 'Kyle',
        last_name: 'Kelley',
        title: 'Netflix',
        avatar: 'https://avatars1.githubusercontent.com/u/836375?v=3&s=400',
        biography: 'Kyle is cool.',
        social: [
            {
                type: 'twitter',
                username: 'rgbkrk'
            },
            {
                type: 'github',
                username: 'rgbkrk'
            },
            {
                type: 'website',
                url: 'https://lambdaops.com/'
            }
        ]

    },
    {
        first_name: 'Kyle',
        last_name: 'Kelley',
        title: 'Netflix',
        avatar: 'https://avatars1.githubusercontent.com/u/836375?v=3&s=400',
        biography: 'Kyle is cool.',
        social: [
            {
                type: 'twitter',
                username: 'rgbkrk'
            },
            {
                type: 'github',
                username: 'rgbkrk'
            },
            {
                type: 'website',
                url: 'https://lambdaops.com/'
            }
        ]

    }
];


const Mission = () => (
    <ContentSection>
        <ContentSectionPane>
            <h3>Mission</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium amet blanditiis dicta dolorum
                modi pariatur perferendis quos. Consequuntur excepturi fuga illum maxime nemo neque non, officiis
                possimus provident quae, ullam!</p>
            <img
                src="https://media.githubusercontent.com/media/nteract/logos/master/nteract_logo_cube_book/exports/animations/nteract_logo_wide_idle_animation.gif"
                alt=""/>
        </ContentSectionPane>
    </ContentSection>
);

const twitter = (data => {
    let twitterLink = "http://twitter.com/" + data.username;
    return (<a href={twitterLink} target="_blank"><i className="mdi mdi-twitter"/></a>);
});

const github = (data => {
    let githubLink = "http://github.com/" + data.username;
    return (<a href={githubLink} target="_blank"><i className="mdi mdi-github-circle"/></a>);
});
const website = (data => {
    return (<a href={data.url} target="_blank"><i className="mdi mdi-web"/></a>);
});

const ContributorsSocial = (items) => {

    return items.map((social, index) => {
        return (
            <div key={index} className="social-item">
                {social.type === 'twitter' ? twitter(social) : '' }
                {social.type === 'github' ? github(social) : '' }
                {social.type === 'website' ? website(social) : '' }
                <style jsx>{`
                    .social-item{
                    font-size: 1.5rem;
                    padding:5px;
                    display: block;
                    }
                `}</style>
            </div>
        );
    });
};

const ContributorsList = contributorsData.map((person, index) => {
    return (
        <div key={index} className="person">
            <div className="person-avatar">
                <img src={person.avatar}/>
            </div>
            <div className="person-details">
                <div className="person-name">
                    {person.first_name + ' ' + person.last_name}
                </div>
                <div className="person-title">
                    {person.title}
                </div>
            </div>
            <div className="person-social">
                {ContributorsSocial(person.social)}
            </div>
            <style jsx>{`
                  .person {
                    max-width: calc(25% - 60px);
                    width: calc(25% - 60px);
                    min-width: 180px;
                    margin:30px;
                    padding:10px;
                  }
                  .person-avatar{
                    overflow: hidden;
                    border-radius: 50%;
                    border: 1px solid rgba(0,0,0,0.12);
                     box-shadow: 0px 3px 18px rgba(42,42,42, 0.09)
                  }
                  .person-details{
                    text-align: center;
                    padding-top: 20px;
                  }
                  .person-name{
                    font-size: 1.45rem;
                  }
                  .person-title{
                    padding-top: 8px;
                    font-style:italic;
                  }
                  .person-social{
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  padding-top: 10px;
                  }
    `}</style>
        </div>
    );
});


const Contributors = () => (
    <ContentSection>
        <ContentSectionPane layout="center">
            <h3>Contributors</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium amet blanditiis dicta dolorum
                modi pariatur perferendis quos. Consequuntur excepturi fuga illum maxime nemo neque non, officiis
                possimus provident quae, ullam!</p>
            <div className="grid">
                <div className="grid-wrapper">
                    {ContributorsList}
                </div>
            </div>
        </ContentSectionPane>
        <style jsx>{`
                  .grid-wrapper {
                    display: flex;
                    flex-wrap:wrap;
                    justify-content: center;
                    align-items: flex-start;
                  }
    `}</style>
    </ContentSection>
);

const Community = Mission;
const Sponsorship = Mission;

export default class AboutPage extends React.Component<void, OSProps, void> {



    render() {

        let themeColor = '#334865';

        return (
            <Layout pageTitle=": Encourage collaboration with others." themeColor={themeColor}>
                <PageHeader themeColor={themeColor}>
                    <PageHeaderLeft>
                        <h1>
                            About nteract
                        </h1>
                        <p>
                            Encourage collaboration with others.
                        </p>
                    </PageHeaderLeft>
                </PageHeader>
                <Mission />
                <Contributors />
                <Community />
                <Sponsorship />
            </Layout>
        );
    }
}
