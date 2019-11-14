import './card.scss';

import React from 'react';

export const Card: React.FunctionComponent = ({
  children
}) => <div className="card">{children}</div>;
