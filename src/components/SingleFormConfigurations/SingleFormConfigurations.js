import React from 'react';
import PropTypes from 'prop-types';
import { Avatar } from '@mui/material';
import Crud from '../../api/crud';
import SingleFormHeader from '../BaseObjects/SingleFormBase/SingleFormHeader';
import SingleFormButtons from '../BaseObjects/SingleFormBase/SingleFormButtons';
import SingleFormBody from '../BaseObjects/SingleFormBase/SingleFormBody';
import '../../css/SingleFormConfigurations/SingleFormConfigurations.css';

export default function SingleFormConfigurations({ id, closeEvent }) {
  const [code, setCode] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const onCodeChanged = (e) => setCode(e.target.value);
  const onTitleChanged = (e) => setTitle(e.target.value);
  const onDescriptionChanged = (e) => setDescription(e.target.value);

  let entityId = parseInt(id, 10);

  const [errors, setErrors] = React.useState(null);

  const onSaveClicked = async () => {
    const isFormValid = () => (
      code !== ''
        && title !== ''
        && description !== ''
    );

    if (isFormValid()) {
      let isUpdate = true;

      if (entityId === 0) {
        const configurations = await Crud.getAllConfigurations();
        entityId = configurations.length + 1 + 1;
        isUpdate = false;
      }

      const entity = {
        id: String(entityId),
        code,
        title,
        description,
      };

      if (isUpdate) {
        Crud.updateConfiguration(entity);
      } else {
        Crud.createConfiguration(entity);
      }

      closeEvent();
    } else {
      const errorsData = {
        code: false,
        title: false,
        description: false,
      };
      if (!code || code.trim() === '') {
        errorsData.code = true;
      }
      if (!title || title.trim() === '') {
        errorsData.title = true;
      }
      if (!description || description.trim() === '') {
        errorsData.description = true;
      }
      setErrors(errorsData);
    }
  };

  const onCloseClicked = () => {
    closeEvent();
  };

  const onDeleteClicked = () => {
    if (entityId !== 0) {
      Crud.deleteConfiguration(entityId);
    }

    closeEvent();
  };

  React.useEffect(() => {
    const fetchData = async () => {
      if (entityId !== 0) {
        try {
          const configuration = await Crud.getConfiguration(entityId);
          if (configuration) {
            setCode(configuration.code);
            setTitle(configuration.title);
            setDescription(configuration.description);
          }
        } catch (error) { /* empty */ }
      }
    };

    fetchData();
  }, [entityId]);

  return (
    <div
      className="single-form-configurations"
    >
      <SingleFormHeader
        image={<Avatar style={{ backgroundColor: 'skyblue' }}>X</Avatar>}
        itemName={code}
        itemLabel="Редактирование конфигурации"
      />
      <SingleFormBody
        data={
          {
            code,
            title,
            description,
            errors,
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
        isExistDelete={id !== '0'}
      />
    </div>
  );
}

SingleFormConfigurations.propTypes = {
  id: PropTypes.string.isRequired,
  closeEvent: PropTypes.func.isRequired,
};
