import React from 'react';
import { Link } from 'react-router-dom';

import { Page } from '../../components/Page/Page';
import exampleForm from '../../images/examples/form.jpg';
import { routes } from '../../Router/routes';
import styled from 'styled-components';
import theme from '../../styles/theme';

export const examples = [
  { name: 'Simple form', image: exampleForm, type: 'form' }
];


const StyledPage = styled(Page)`
  .content {
    margin: auto;
    margin-top: 4rem;
    @media (min-width: 600px) {
      margin-top: 6rem;
    }
    max-width: 60rem;
    width: 100%;
    padding: 4rem;
    padding-top: 0;
  }

  .grid {
    margin-top: 3rem;
    display: grid;
    grid-gap: 2rem;
    grid-template-columns: repeat(3, 1fr);

    a {
        transition: all 0.1s ease-out;

      .img {
        display: block;
        position: relative;
        width: 100%;
        padding-bottom: 100%;
        margin-bottom: 1rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

        img {
          position: absolute;
          width: 100%;
          height: 100%;
          object-fit: contain;
          border: ${theme.borders.width} solid ${theme.color('main')};
          border-radius: ${theme.borderRadius};
          padding: 1rem;
          transition: all 0.1s ease-out;
        }
      }

      span {
        display: block;
        text-align: center;
        color: currentColor
      }

      &:hover {
        color: ${theme.color('alt')};
        .img img {
          padding: 0.5rem;
          border-color: ${theme.color('alt')};
          background-color: rgba(${theme.color('alt')}, 0.1);
        }
      }
    }
  }
`;

export default () => <StyledPage>
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
  </StyledPage>;
