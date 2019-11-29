import './examples.page.scss';

import React from 'react';
import { Link } from 'react-router-dom';

import { Page } from '../../components/Page/Page';
import exampleForm from '../../images/examples/form.jpg';
import { routes } from '../../router/routes';

export const examples = [
  { name: 'Simple form', image: exampleForm, type: 'form' }
];

export const ExamplesPage = () => {

  return <Page type="examples">
    <div className="content">
      <h1>Examples</h1>
      <div className="grid">
        {examples.map(e => <Link to={routes.example({ example: e.type })}>
          <div className="img">
            <img src={e.image} alt={e.name} />
          </div>
          <span>{e.name}</span>
        </Link>)}
      </div>
    </div>
  </Page>;
};
