import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { createContainer } from 'unstated-next';
import API from '../lib/API';
import { ComponentType, ParsedComponent } from '../types/entities';
import { Canvas } from './Canvas.container';
import { Picture } from './Picture.container';


export default createContainer(() => {
  const history = useHistory();

  const { picture } = Picture.useContainer();
  const { clear } = Canvas.useContainer();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const [components, setComponents] = useState<ParsedComponent[]>([]);

  const extract = async (pic = picture) => {
    if (!pic) throw new Error('No picture');
    setLoading(true);

    try {
      const data = await API.extract(pic);

      if (data) {
        console.log(data);

        setComponents(data);
        const siteString = btoa(`v1,${data.map(c =>
          `${c.component}:${c.box.x}:${c.box.w}`
        ).join(',')}`);
        clear();
        console.log(siteString);

        history.push(`/s/${siteString}`);
      }
    } catch (e) {
      console.log(e);

      setError(e.message);
    }

    setLoading(false);
  };

  const decodeSiteString = (site: string) => {
    const decoded = atob(site);
    const [, ...components] = decoded.split(',');
    setComponents(components.map(c => {
      const [, type, x, w] = /(\w+):(\d+):(\d+)$/.exec(c)!;

      return {
        component: type as ComponentType,
        center: [0, 0],
        box: {
          w: parseInt(w),
          h: 0,
          x: parseInt(x),
          y: 0
        }
      }
    }));
  };

  return {
    components, error, loading, extract, decodeSiteString
  };
});
