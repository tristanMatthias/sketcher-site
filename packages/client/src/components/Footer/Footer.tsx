import './footer.scss';

import React from 'react';

import { Canvas as CC } from '../../containers/canvas.container';
import { Extract } from '../../containers/extract.container';
import { Picture } from '../../containers/picture.container';
import { Button } from '../Button/Button';
import { Icon } from '../Icon/Icon';

export const Footer = () => {
  const { undo, clear, userActions } = CC.useContainer();
  const { picture } = Picture.useContainer();
  const { data, extract } = Extract.useContainer();

  console.log(data);


  return <footer>
    <div>
      {userActions.length !== 0 &&
        <>
          <Button onClick={undo}>
            <Icon type="undo" size="large" />
          </Button>
          <Button onClick={clear}>
            <Icon type="remove" size="large" />
          </Button>
        </>}
    </div>

    <Button className="camera">
      <Icon type="camera" size="large" />
    </Button>


    <div>
      <Button
        className="check"
        type="submit"
        disabled={!Boolean(picture)}
        onClick={() => extract()}
      >
        <Icon type="check" size="large" />
        <span>Go!</span>
      </Button>
    </div>
  </footer>;
};
