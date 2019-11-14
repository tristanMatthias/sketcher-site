import { useLazyQuery } from '@apollo/react-hooks';
import { EExtract } from 'sketch-site-api';
import { createContainer } from 'unstated-next';

import extractQuery from '../gql/queries/extract.gql';
import { Picture } from './picture.container';

const useExtract = () => {
  const { picture } = Picture.useContainer();
  const [query, { data, error, loading }] = useLazyQuery<{ extract: EExtract[] }>(extractQuery);

  const extract = async (pic = picture) => {
    if (!pic) throw new Error('No picture');
    console.log(pic);

    await query({
      variables: { extract: { image: pic } }
    });
  };

  return {
    data, error, loading, extract
  };
};

export const Extract = createContainer(useExtract);
