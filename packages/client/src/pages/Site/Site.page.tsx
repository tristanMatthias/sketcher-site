import React, { CSSProperties, useEffect } from 'react';

import { Button } from '../../components/Button/Button';
import { Page } from '../../components/Page/Page';
import { Select } from '../../components/Select/Select';
import Extract from '../../containers/Extract.container';
import { ImagePlaceholder } from '../../components/ImagePlaceholder/ImagePlaceholder';
import styled from 'styled-components';
import { TextInput } from '../../components/TextInput/TextInput';

const Content = styled.div`
  --cols: 6;
  padding: 2rem;
  width: 80%;
  max-width: 60rem;
  margin: auto;
  position: relative;
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(var(--cols), 1fr);
  align-items: center;

  button {
    margin-bottom: 2.5rem;
    margin-left: 0;
  }

  span.text {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  img {
    width: 100%;
  }

  select {
    width: 100%;
  }
`;

const SitePage: React.FunctionComponent<{ site: string }> = ({
  site
}) => {
  const { components, decodeSiteString } = Extract.useContainer();

  useEffect(() => {
    if (!components.length) decodeSiteString(site);
  }, []);

  return <Page type="site">
    <Content>
      {components.map(c => {
        const style: CSSProperties = {
          gridColumn: `${c.box.x + 1} / span ${c.box.w}`
        };

        const props = { style };
        console.log(props.style, c.component);


        switch (c.component) {
          case 'input':
            return <TextInput {...props} placeholder="Type something" />;
          case 'image':
            style.paddingBottom = `50%`;
            return <ImagePlaceholder style={{ paddingBottom: '50%', ...style }} />;

          case 'circle_image':
            return <img src={'http://placehold.it/100x100'} style={{ borderRadius: '50%', ...props }} />;

          case 'button':
            return <Button {...props} alt><span>Some button</span></Button>;

          case 'text':
            return <span {...props} className="text">Lorem ipsum dolor sit amet.&nbsp;</span>;

          case 'select':
            return <Select {...props}>
              <option value="" disabled selected>Select something…</option>
              <option value="" >Some option</option>
              <option value="" >Another option</option>
            </Select>;

          default:
            return null;
        }
      })}
    </Content>
  </Page>;
};

export default SitePage;
