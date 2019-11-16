import { useLazyQuery } from '@apollo/react-hooks';
import { useEffect, useState } from 'react';
import { EExtract } from 'sketch-site-api';
import { createContainer } from 'unstated-next';

import extractQuery from '../gql/queries/extract.gql';
import { history } from '../router/history';
import { Picture } from './picture.container';
import { Canvas } from './canvas.container';

const useExtract = () => {
  const { picture } = Picture.useContainer();
  const { clear } = Canvas.useContainer();
  const [query, { data, error, loading }] = useLazyQuery<{ extract: EExtract[] }>(extractQuery, {
    fetchPolicy: 'network-only'
  });
  const [components, setComponents] = useState<EExtract[]>([]);

  const extract = async (pic = picture) => {
    if (!pic) throw new Error('No picture');

    await query({
      variables: { extract: { image: pic } }
    });
  };

  useEffect(() => {
    if (data) {
      setComponents(data.extract);
      const siteString = btoa(`v1,${data.extract.map(c => c.component).join(',')}`);
      clear();
      history.push(`/s/${siteString}`);
    }
  }, [data]);

  const decodeSiteString = (site: string) => {
    const decoded = atob(site);
    const [, ...components] = decoded.split(',');
    setComponents(components.map(c => ({
      component: c,
      center: [0, 0],
      box: {
        w: 0,
        h: 0,
        x: 0,
        y: 0
      }
    })));
  };

  return {
    components, error, loading, extract, decodeSiteString
  };
};

export const Extract = createContainer(useExtract);
