import React from 'react';
import PropTypes from 'prop-types';
import {
  FormControl, InputLabel, MenuItem, Select,
} from '@mui/material';
import Crud from '../../../api/crud';
import SearchBarSelect from '../../BaseObjects/SearchBase/SearchBaseComponents/SearchBarSelect';
import SearchBarTextBox from '../../BaseObjects/SearchBase/SearchBaseComponents/SearchBarTextBox';
import '../../../css/SingleFormPreorders/SingleFormPreordersComponents/SingleFormBodyPreorders.css';

export default function SingleFormBodyPreorders({
  data,
  events,
}) {
  const [configurationsOptions, setConfigurationsOptions] = React.useState();
  const [datacentersOptions, setDatacentersOptions] = React.useState([]);
  const [environmentsOptions, setEnvironmentsOptions] = React.useState();
  const [statusOptions, setStatusOptions] = React.useState();
  const [preorderTypeOptions, setPreorderTypeOptions] = React.useState();

  React.useEffect(() => {
    const fetchConfigurationsAndEnvironments = async () => {
      const configurations = await Crud.getAllConfigurations();
      const datacenters = await Crud.getAllDatacenters();
      const environments = await Crud.getAllEnvironments();
      const statusOptionsEnum = {
        statusNew: 'NEW',
        statusApproved: 'APPROVED',
        statusInWork: 'IN_WORK',
        statusCompleted: 'COMPLETED',
        statusCanceled: 'СANCELED',
      };
      const preorderTypeOptionsEnum = {
        preorderTypeServer: 'SERVER',
        preorderTypeSHD: 'SHD',
        preorderTypeVIRTUALIZATION: 'VIRTUALIZATION',
      };
      setConfigurationsOptions(configurations.map((configuration) => (
        <MenuItem key={configuration.id} value={configuration.id}>
          {configuration.code}
        </MenuItem>
      )));
      setDatacentersOptions(datacenters.map((datacenter) => (
        <MenuItem key={datacenter.id} value={datacenter.id}>
          {datacenter.code}
        </MenuItem>
      )));
      setStatusOptions(Object.values(statusOptionsEnum).map((status) => (
        <MenuItem key={status} value={status}>
          {status}
        </MenuItem>
      )));
      setPreorderTypeOptions(Object.values(preorderTypeOptionsEnum).map((preorderType) => (
        <MenuItem key={preorderType} value={preorderType}>
          {preorderType}
        </MenuItem>
      )));
      setEnvironmentsOptions(environments.map((environment) => (
        <MenuItem key={environment.id} value={environment.id}>
          {environment.code}
        </MenuItem>
      )));
    };

    fetchConfigurationsAndEnvironments();
  }, []);

  return (
    <div
      className="single-form-body-preorders"
    >
      <div>
        <SearchBarTextBox
          label="Регистрационный номер"
          value={data.regNumber}
          onChange={events.onRegNumberChanged}
        />
      </div>
      <div
        className="single-form-body-preorders__row"
      >
        <div>
          <SearchBarSelect
            label="Конфигурация"
            value={data.configurationId}
            options={configurationsOptions}
            onChange={events.onConfigurationChanged}
            color="skyblue"
          />
        </div>
        <div>
          <SearchBarSelect
            label="Среда"
            value={data.environmentId}
            options={environmentsOptions}
            onChange={events.onEnvironmentChanged}
            color="skyblue"
          />
        </div>
      </div>
      <div
        className="single-form-body-preorders__row"
      >
        <div>
          <FormControl>
            <InputLabel disableAnimation shrink style={{ backgroundColor: 'skyblue', zIndex: 0 }} id={`${'ЦОД'}-label`}>ЦОД</InputLabel>
            <Select
              labelId={`${'ЦОД'}-label`}
              value={data.datacenterIds}
              onChange={events.onDatacentersChanged}
              style={{ width: '200px', height: '60px' }}
              multiple
            >
              {datacentersOptions}
            </Select>
          </FormControl>
        </div>
        <div>
          <SearchBarSelect
            label="Признак репликации"
            value={data.isReplication}
            options={
              Object.values(data.isReplicationEnum).map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))
            }
            onChange={events.onIsReplicationChanged}
            color="skyblue"
          />
        </div>
      </div>
      <div
        className="single-form-body-preorders__row"
      >
        <SearchBarSelect
          label="Статус"
          value={data.status}
          options={statusOptions}
          onChange={events.onStatusChanged}
          color="skyblue"
        />
        <SearchBarSelect
          label="Тип потребности"
          value={data.preorderType}
          options={preorderTypeOptions}
          onChange={events.onPreorderTypeChanged}
          color="skyblue"
        />
      </div>
    </div>
  );
}

SingleFormBodyPreorders.propTypes = {
  data: PropTypes.shape({
    regNumber: PropTypes.string,
    configurationId: PropTypes.string,
    environmentId: PropTypes.string,
    datacenterIds: PropTypes.string,
    isReplication: PropTypes.string,
    isReplicationEnum: PropTypes.string,
    status: PropTypes.string,
    preorderType: PropTypes.string,
  }).isRequired,
  events: PropTypes.shape({
    onRegNumberChanged: PropTypes.func,
    onConfigurationChanged: PropTypes.func,
    onEnvironmentChanged: PropTypes.func,
    onDatacentersChanged: PropTypes.func,
    onIsReplicationChanged: PropTypes.func,
    onStatusChanged: PropTypes.func,
    onPreorderTypeChanged: PropTypes.func,
  }).isRequired,
};
