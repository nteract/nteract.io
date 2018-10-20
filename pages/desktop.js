// @flow
import * as React from 'react';
import { Hero } from '@components/hero';
import { Type } from '@components/typography';
import { ContentSection, ContentSections } from '@components/content-section';
import { Button, Buttons } from '@components/button';
import { Video } from '@components/video';
import { detectPlatform, getDownloadUrl } from '@lib';
import { DownloadFeaturette } from '@components/download-buttons';
import { CutoffImage } from '@components/cutoff-image';

class Atom extends React.Component<null, null> {
  static async getInitialProps(ctx: Context<EmptyQuery>): Promise<OSProps> {
    const platform = detectPlatform(ctx);
    const assetUrl = await getDownloadUrl(platform);
    return { platform, assetUrl };
  }

  render() {
    return (
      <>
        <Hero color="rgb(36, 77, 100)">
          <Hero.Pane padding="0 20px 0 0">
            <Hero.Title>Notebooks on your desktop</Hero.Title>

            <Type.p>
              Write code, prose, and embed interactive plots to tell powerful
              narratives. Explore computing creatively. All the power of Jupyter
              notebooks, wrapped in native desktop goodness.
            </Type.p>
            {/* Call to Action */}
            <DownloadFeaturette
              platform={this.props.platform}
              assetUrl={this.props.assetUrl}
            />
          </Hero.Pane>

          <Hero.Pane visual padding="40px 0 0 0">
            <CutoffImage
              src="https://cloud.githubusercontent.com/assets/836375/18421299/d95ad398-783b-11e6-8b23-d54cf7caad1e.png"
              alt="Desktop Notebooks hero image"
            />
          </Hero.Pane>
        </Hero>
        <ContentSections>
          <ContentSection>
            <ContentSection.Pane>
              <ContentSection.Title>Double Click</ContentSection.Title>
              <Type.p>
                Open notebooks natively on Mac, Windows, and Linux
              </Type.p>
            </ContentSection.Pane>

            <ContentSection.Pane visual>
              <Video mp4="/static/double-click-notebook.mp4" />
            </ContentSection.Pane>
          </ContentSection>
        </ContentSections>
      </>
    );
  }
}

export default Atom;
