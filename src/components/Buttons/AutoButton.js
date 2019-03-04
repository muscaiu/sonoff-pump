import React from 'react';
import { Button } from 'reactstrap';
import classNames from 'classnames';

const AutoButton = ({ fbMode, onToggleModal }) => (

  <Button
    onClick={() => fbMode === 'manual' && onToggleModal(true, 'mode')}
    color="info"
    id="1"
    size="sm"
    tag="label"
    className={classNames('btn-simple', {
      active: fbMode === 'auto',
    })}
  >

    <span className="d-sm-block d-md-block d-lg-block d-xl-block">
      Auto
    </span>

  </Button>
)

export default AutoButton;
