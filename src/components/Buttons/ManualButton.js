import React from 'react';
import { Button } from 'reactstrap';
import classNames from 'classnames';

const ManualButton = ({ mode, onToggleModal }) => (
    <Button
        onClick={() => mode === 'auto' && onToggleModal(true, 'mode')}
        tag="label"
        className={classNames('btn-simple', {
            active: mode === 'manual',
        })}
        color="info"
        id="0"
        size="sm"
    >
        <span className="d-sm-block d-md-block d-lg-block d-xl-block">
            Manual
        </span>
    </Button>
)

export default ManualButton;
