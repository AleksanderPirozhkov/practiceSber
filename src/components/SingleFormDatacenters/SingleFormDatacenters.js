import React from 'react';
import PropTypes from 'prop-types';
import { Avatar } from '@mui/material';
import Crud from '../../api/crud';
import SingleFormHeader from '../BaseObjects/SingleFormBase/SingleFormHeader';
import SingleFormButtons from '../BaseObjects/SingleFormBase/SingleFormButtons';
import SingleFormBody from '../BaseObjects/SingleFormBase/SingleFormBody';
import '../../css/SingleFormDatacenters/SingleFormDatacenters.css';

export default function SingleFormDatacenters({ id, closeEvent }) {
  let entityId = id;

  const [code, setCode] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const onCodeChanged = (e) => setCode(e.target.value);
  const onTitleChanged = (e) => setTitle(e.target.value);
  const onDescriptionChanged = (e) => setDescription(e.target.value);

  const onSaveClicked = async () => {
    let isUpdate = true;

    if (entityId === 0) {
      const datacenters = await Crud.getAllDatacenters();
      entityId = datacenters.length + 1;
      isUpdate = false;
    }

    const entity = {
      id: String(entityId),
      code,
      title,
      description,
    };

    if (isUpdate) {
      Crud.updateDatacenter(entity);
    } else {
      Crud.createDatacenter(entity);
    }

    closeEvent();
  };

  const onCloseClicked = () => {
    closeEvent();
  };

  const onDeleteClicked = () => {
    const isDeleted = async () => (Crud.getDatacenter(entityId));
    if (entityId !== 0 && isDeleted) {
      Crud.deleteDatacenter(entityId);
    }

    closeEvent();
  };

  React.useEffect(() => {
    const fetchData = async () => {
      if (entityId !== 0) {
        try {
          const datacenter = await Crud.getDatacenter(entityId);
          if (datacenter) {
            setCode(datacenter.code);
            setTitle(datacenter.title);
            setDescription(datacenter.description);
          }
        } catch (error) { /* empty */ }
      }
    };

    fetchData();
  }, [entityId]);

  return (
    <div
      className="single-form-datacenters"
    >
      <SingleFormHeader
        image={<Avatar style={{ backgroundColor: 'skyblue' }}>X</Avatar>}
        itemName={code}
        itemLabel="Редактирование датацентра"
      />
      <SingleFormBody
        data={
          {
            code,
            title,
            description,
          }
        }
        events={
          {
            onCodeChanged,
            onTitleChanged,
            onDescriptionChanged,
          }
        }
      />
      <SingleFormButtons
        onDeleteClicked={onDeleteClicked}
        onCloseClicked={onCloseClicked}
        onSaveClicked={onSaveClicked}
        isExistDelete={id !== 0}
      />
    </div>
  );
}

SingleFormDatacenters.propTypes = {
  id: PropTypes.number.isRequired,
  closeEvent: PropTypes.func.isRequired,
};
