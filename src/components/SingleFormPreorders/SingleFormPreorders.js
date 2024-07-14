import React from 'react';
import PropTypes from 'prop-types';
import { Avatar } from '@mui/material';
import Crud from '../../api/crud';
import SingleFormHeader from '../BaseObjects/SingleFormBase/SingleFormHeader';
import SingleFormButtons from '../BaseObjects/SingleFormBase/SingleFormButtons';
import SingleFormBodyPreorders from './SingleFormPreordersComponents/SingleFormBodyPreorders';
import '../../css/SingleFormPreorders/SingleFormPreorders.css';

export default function SingleFormPreorders({ id, closeEvent }) {
  let preorderId = parseInt(id, 10);

  const statusOptionsEnum = {
    statusNew: 'NEW',
    statusApproved: 'APPROVED',
    statusInWork: 'IN_WORK',
    statusCompleted: 'COMPLETED',
    statusCanceled: 'СANCELED',
  };

  const [configuration, setConfiguration] = React.useState(null);
  const [datacenters, setDatacenters] = React.useState([]);
  const [environment, setEnvironment] = React.useState(null);
  const [status, setStatus] = React.useState(statusOptionsEnum.statusNew);
  const [preorderType, setPreorderType] = React.useState('');
  const [isReplication, setIsReplication] = React.useState(false);
  const [regNumber, setRegNumber] = React.useState('');

  const onConfigurationChanged = (e) => setConfiguration(e.target.value);
  const onDatacentersChanged = async (e) => {
    const datacenterPromises = Object
      .values(typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value)
      .map(async (value) => {
        if (value) {
          return Crud.getDatacenter(value);
        }
        return null;
      })
      .filter((value) => value);
    const datacentersArray = await Promise.all(datacenterPromises);
    setDatacenters(datacentersArray);
  };
  const onEnvironmentChanged = (e) => setEnvironment(e.target.value);
  const onIsReplicationChanged = (e) => setIsReplication(e.target.checked);
  const onRegNumberChanged = (e) => setRegNumber(e.target.value);
  const onStatusChanged = (e) => setStatus(e.target.value);
  const onPreorderTypeChanged = (e) => setPreorderType(e.target.value);

  const [errors, setErrors] = React.useState(null);

  const onSaveClicked = async () => {
    const isFormValid = () => (
      regNumber !== ''
        && configuration
        && environment
        && datacenters.length > 0
        && status
        && preorderType
    );

    if (isFormValid()) {
      const configurationPreorder = await Crud.getConfiguration(configuration.id);
      const environmentPreorder = await Crud.getEnvironment(environment.id);
      const datacentersPreorder = datacenters;
      const replicationPreorder = isReplication;
      const statusPreorder = status;
      const preorderTypePreorder = preorderType;

      let isUpdate = true;

      if (preorderId === 0) {
        const preorders = await Crud.getAllPreorders();
        preorderId = preorders.length + 1 + 1;
        isUpdate = false;
      }

      const entity = {
        id: String(preorderId),
        regNumber,
        preorderType: preorderTypePreorder,
        configurationId: configurationPreorder,
        environmentId: environmentPreorder,
        datacenterIds: datacentersPreorder,
        isReplication: replicationPreorder,
        status: statusPreorder,
      };

      if (isUpdate) {
        Crud.updatePreorder(entity);
      } else {
        Crud.createPreorder(entity);
      }

      closeEvent();
    } else {
      const errorsData = {
        regNumber: false,
        configuration: false,
        environment: false,
        datacenters: false,
        status: false,
        preorderType: false,
      };
      if (!regNumber || regNumber.trim() === '') {
        errorsData.regNumber = true;
      }
      if (!configuration) {
        errorsData.configuration = true;
      }
      if (!environment) {
        errorsData.environment = true;
      }
      if (datacenters.length === 0) {
        errorsData.datacenters = true;
      }
      if (!status) {
        errorsData.status = true;
      }
      if (!preorderType) {
        errorsData.preorderType = true;
      }
      setErrors(errorsData);
    }
  };

  const onCloseClicked = () => {
    closeEvent();
  };

  const onDeleteClicked = () => {
    if (preorderId !== 0) {
      Crud.deletePreorder(preorderId);
    }

    closeEvent();
  };

  React.useEffect(() => {
    const fetchData = async () => {
      if (preorderId !== 0) {
        try {
          const preorder = await Crud.getPreorder(preorderId);
          if (preorder) {
            if (preorder.configurationId) {
              setConfiguration(preorder.configurationId);
            } else {
              setConfiguration('');
            }
            if (preorder.environmentId) {
              setEnvironment(preorder.environmentId);
            } else {
              setEnvironment('');
            }
            setDatacenters(preorder.datacenterIds.map((value) => value));
            setIsReplication(preorder.isReplication);
            setRegNumber(preorder.regNumber);
            setStatus(preorder.status);
            setPreorderType(preorder.preorderType);
          }
        } catch (error) { /* empty */ }
      }
    };

    fetchData();
  }, [preorderId]);

  const isNew = id === '0';

  return (
    <div
      className="single-form-preorders"
    >
      <SingleFormHeader
        image={<Avatar style={{ backgroundColor: 'skyblue' }}>X</Avatar>}
        itemName={regNumber}
        itemLabel="Редактирование потребности"
        itemStatus={status}
      />
      <SingleFormBodyPreorders
        data={
          {
            configuration,
            datacenters,
            environment,
            isReplication,
            regNumber,
            status,
            preorderType,
            isNew,
            errors,
          }
        }
        events={
          {
            onConfigurationChanged,
            onDatacentersChanged,
            onEnvironmentChanged,
            onIsReplicationChanged,
            onRegNumberChanged,
            onStatusChanged,
            onPreorderTypeChanged,
            setStatus,
          }
        }
      />
      <SingleFormButtons
        isExistDelete={id !== '0'}
        onDeleteClicked={onDeleteClicked}
        onCloseClicked={onCloseClicked}
        onSaveClicked={onSaveClicked}
      />
    </div>
  );
}

SingleFormPreorders.propTypes = {
  id: PropTypes.string.isRequired,
  closeEvent: PropTypes.func.isRequired,
};
