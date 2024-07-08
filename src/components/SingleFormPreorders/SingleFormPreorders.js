import React from 'react';
import PropTypes from 'prop-types';
import { Avatar } from '@mui/material';
import Crud from '../../api/crud';
import SingleFormHeader from '../BaseObjects/SingleFormBase/SingleFormHeader';
import SingleFormButtons from '../BaseObjects/SingleFormBase/SingleFormButtons';
import SingleFormBodyPreorders from './SingleFormPreordersComponents/SingleFormBodyPreorders';
import '../../css/SingleFormPreorders/SingleFormPreorders.css';

export default function SingleFormPreorders({ id, closeEvent }) {
  let preorderId = id;

  const [configurationId, setConfigurationId] = React.useState(null);
  const [datacenterIds, setDatacenterIds] = React.useState([]);
  const [environmentId, setEnvironmentId] = React.useState(null);
  const [status, setStatus] = React.useState('');
  const [preorderType, setPreorderType] = React.useState('');
  const [isReplication, setIsReplication] = React.useState(null);
  const [regNumber, setRegNumber] = React.useState('');

  const onConfigurationChanged = (e) => setConfigurationId(e.target.value);
  const onDatacentersChanged = (e) => setDatacenterIds(typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value);
  const onEnvironmentChanged = (e) => setEnvironmentId(e.target.value);
  const isReplicationEnum = {
    exist: 'Yes',
    noExist: 'No',
  };
  const onIsReplicationChanged = (e) => setIsReplication(e.target.value);
  const onRegNumberChanged = (e) => setRegNumber(e.target.value);
  const onStatusChanged = (e) => setStatus(e.target.value);
  const onPreorderTypeChanged = (e) => setPreorderType(e.target.value);

  const onSaveClicked = async () => {
    const configuration = await Crud.getConfiguration(configurationId);
    const environment = await Crud.getEnvironment(environmentId);
    let datacenters = [];
    const replication = (isReplication !== '' ? (isReplication === isReplicationEnum.exist) : null);
    const statusPreorder = status;
    const preorderTypePreorder = preorderType;

    let isUpdate = true;

    if (preorderId === 0) {
      const preorders = await Crud.getAllPreorders();
      preorderId = preorders.length + 1;
      isUpdate = false;
    }
    const datacenterPromises = Object
      .values(datacenterIds)
      .map((value) => Crud.getDatacenter(value));
    datacenters = await Promise.all(datacenterPromises);

    const entity = {
      id: String(preorderId),
      regNumber,
      preorderType: preorderTypePreorder,
      configurationId: configuration,
      environmentId: environment,
      datacenterIds: datacenters,
      isReplication: replication,
      status: statusPreorder,
    };

    if (isUpdate) {
      Crud.updatePreorder(entity);
    } else {
      Crud.createPreorder(entity);
    }

    closeEvent();
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
              setConfigurationId(preorder.configurationId.id);
            } else {
              setConfigurationId(null);
            }
            if (preorder.environmentId) {
              setEnvironmentId(preorder.environmentId.id);
            } else {
              setEnvironmentId(null);
            }
            setDatacenterIds(preorder.datacenterIds.map((preorderValue) => preorderValue.id));
            if (preorder.isReplication !== null) {
              if (preorder.isReplication) {
                setIsReplication(isReplicationEnum.exist);
              } else {
                setIsReplication(isReplicationEnum.noExist);
              }
            } else {
              setIsReplication('');
            }
            setRegNumber(preorder.regNumber);
            setStatus(preorder.status);
            setPreorderType(preorder.preorderType);
          }
        } catch (error) { /* empty */ }
      }
    };

    fetchData();
  }, [isReplicationEnum.exist, isReplicationEnum.noExist, preorderId]);

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
            configurationId,
            datacenterIds,
            environmentId,
            isReplication,
            isReplicationEnum,
            regNumber,
            status,
            preorderType,
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
          }
        }
      />
      <SingleFormButtons
        isExistDelete={id !== 0}
        onDeleteClicked={onDeleteClicked}
        onCloseClicked={onCloseClicked}
        onSaveClicked={onSaveClicked}
      />
    </div>
  );
}

SingleFormPreorders.propTypes = {
  id: PropTypes.number.isRequired,
  closeEvent: PropTypes.func.isRequired,
};
