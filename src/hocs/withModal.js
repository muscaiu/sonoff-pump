import React from 'react';

// import Modal from 'components/Modals/Modal';

export default function withModal(WrappedComponent) {
    class Dialog extends React.Component {
        state = {
            showModal: false,
            dialogType: '',
        };

        handleToggleModal = (toggle, title) => {
            this.setState({
                showModal: toggle,
                dialogType: title,
            });
        };

        render() {
            const { showModal, dialogType } = this.state;
            return (
                <WrappedComponent
                    {...this.props}
                    onToggleModal={this.handleToggleModal}
                    showModal={showModal}
                    dialogType={dialogType}
                />
            )
        }
    }

    return (Dialog);
}
