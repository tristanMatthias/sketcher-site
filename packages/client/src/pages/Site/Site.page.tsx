import './site.page.scss';

import React, { CSSProperties, useEffect } from 'react';

import { Button } from '../../components/Button/Button';
import { Page } from '../../components/Page/Page';
import { Select } from '../../components/Select/Select';
import { Extract } from '../../containers/extract.container';

export const SitePage: React.FunctionComponent<{ site: string }> = ({
  site
}) => {
  const { components, decodeSiteString } = Extract.useContainer();

  useEffect(() => {
    if (!components.length) decodeSiteString(site);
  }, []);

  return <Page type="site">
    <div className="content">
      {components.map(c => {
        const style: CSSProperties = {
          gridColumn: `${c.box.x + 1} / span ${c.box.w}`
        };

        const props = { style };

        switch (c.component) {
          case 'input':
            return <input {...props} />;
          case 'image':
            const w = Math.round(c.box.w / 12 * 600);
            style.width = w;
            style.height = w;
            return <img src={`http://placehold.it/${w}x${w}`} {...props} />;

          case 'circle_image':
            return <img src={'http://placehold.it/100x100'} style={{ borderRadius: '50%', ...props }} />;

          case 'button':
            return <Button {...props}><span>Some button</span></Button>;

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
    </div>
  </Page>;
};

