import React from 'react';
import { Button } from 'reactstrap';
import classNames from 'classnames';

const ManualButton = ({ fbMode, onToggleModal }) => (
    <Button
        onClick={() => fbMode === 'auto' && onToggleModal(true, 'mode')}
        tag="label"
        className={classNames('btn-simple', {
            active: fbMode === 'manual',
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
