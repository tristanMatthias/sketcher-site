import { generatePath } from 'react-router';

interface Params {
  [key: string]: number | string;
}

const linkParams = <T extends Params = {}>(link: string) =>
  (params?: T | false) =>
    params === false ? link : generatePath(link, params);

export const routes = {
  home: linkParams('/'),
  examples: linkParams('/examples'),
  example: linkParams<{ example: string }>('/example/:example'),
  site: linkParams<{ site: string }>('/s/:site')
};
