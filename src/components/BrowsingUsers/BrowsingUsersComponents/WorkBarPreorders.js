import { Button } from '@mui/material';
import React from 'react';
import Modal from 'react-modal';
import { useLocation } from 'react-router-dom';
import SingleFormPreorders from '../../SingleFormPreorders/SingleFormPreorders';
import SingleFormConfigurations from '../../SingleFormConfigurations/SingleFormConfigurations';
import SingleFormDatacenters from '../../SingleFormDatacenters/SingleFormDatacenters';
import SingleFormEnvironments from '../../SingleFormEnvironments/SingleFormEnvironments';
import '../../../css/BrowsingUsers/BrowsingUsersComponents/WorkBarPreorders.css';

export default function WorkBarPreorders() {
  const location = useLocation();

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  const [modalIsOpen, setIsOpen] = React.useState(false);

  const openModal = (e) => {
    e.preventDefault();
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  function contentModal() {
    if (location.pathname === '/configurations') {
      return <SingleFormConfigurations id={0} closeEvent={closeModal} />;
    }
    if (location.pathname === '/datacenters') {
      return <SingleFormDatacenters id={0} closeEvent={closeModal} />;
    }
    if (location.pathname === '/environments') {
      return <SingleFormEnvironments id={0} closeEvent={closeModal} />;
    }
    return <SingleFormPreorders id={0} closeEvent={closeModal} />;
  }

  return (
    <div
      className="work-bar"
    >
      <div
        className="work-bar__title"
      >
        Потребности
      </div>
      <div
        className="work-bar__button"
      >
        <Button variant="outlined" onClick={openModal}>+ Создать</Button>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          {contentModal()}
        </Modal>
      </div>
    </div>
  );
}
