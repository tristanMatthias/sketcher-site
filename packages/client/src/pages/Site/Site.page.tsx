import './site.page.scss';

import React, { useEffect } from 'react';

import { Button } from '../../components/Button/Button';
import { Select } from '../../components/Select/Select';
import { Extract } from '../../containers/extract.container';

export const SitePage: React.FunctionComponent<{ site: string }> = ({
  site
}) => {
  const { components, decodeSiteString } = Extract.useContainer();

  useEffect(() => {
    if (!components.length) decodeSiteString(site);
  }, []);

  return <main className="site">
    {components.map(c => {
      // const style: CSSProperties = {
      //   position: 'absolute',
      //   left: c.center[0],
      //   top: c.center[0],
      //   transform: 'translate(-50%, -50%)'
      // };
      const props = {};
      switch (c.component) {
        case 'input':
          return <input {...props} />;
        case 'image':
          return <img src={'http://placehold.it/100x100'} {...props} />;
        case 'circle_image':
          return <img src={'http://placehold.it/100x100'} style={{ borderRadius: '50%' }} />;
        case 'button':
          return <Button {...props}><span>Some text</span></Button>;
        case 'text':
          return <span {...props}>Lorem ipsum dolor sit amet.&nbsp;</span>;
        case 'select':
          return <Select>
            <option value="" disabled selected>Select something…</option>
            <option value="" >Some option</option>
            <option value="" >Another option</option>
          </Select>;
        default:
          return null;
      }
    })}
  </main>;
};

