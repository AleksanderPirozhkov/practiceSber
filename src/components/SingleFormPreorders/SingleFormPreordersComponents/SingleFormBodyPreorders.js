import React from 'react';
import PropTypes from 'prop-types';
import {
  FormControl, FormControlLabel, InputLabel, MenuItem, Select, Checkbox,
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
  const statusOptions = ['NEW', 'APPROVED', 'IN_WORK', 'COMPLETED', 'СANCELED'];
  const preorderTypeOptions = ['SERVER', 'SHD', 'VIRTUALIZATION'];

  React.useEffect(() => {
    const fetchConfigurationsAndEnvironments = async () => {
      const configurations = await Crud.getAllConfigurations();
      const datacenters = await Crud.getAllDatacenters();
      const environments = await Crud.getAllEnvironments();
      setConfigurationsOptions(configurations);
      setDatacentersOptions(datacenters);
      setEnvironmentsOptions(environments);
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
          error={data.errors && (data.errors.regNumber)}
        />
      </div>
      <div
        className="single-form-body-preorders__row"
      >
        <div>
          <SearchBarSelect
            label="Конфигурация"
            value={(configurationsOptions && configurationsOptions.find((value) => data.configuration && value.id.toString() === data.configuration.id.toString())) || ''}
            options={configurationsOptions && configurationsOptions.map((configuration) => (
              <MenuItem key={configuration.id} value={configuration}>
                {configuration.code}
              </MenuItem>
            ))}
            onChange={events.onConfigurationChanged}
            color="skyblue"
            error={data.errors && (data.errors.configuration)}
            isNullVariant={false}
          />
        </div>
        <div>
          <SearchBarSelect
            label="Среда"
            value={(environmentsOptions && environmentsOptions.find((value) => data.environment && value.id.toString() === data.environment.id.toString())) || ''}
            options={environmentsOptions && environmentsOptions.map((environment) => (
              <MenuItem key={environment.id} value={environment}>
                {environment.code}
              </MenuItem>
            ))}
            onChange={events.onEnvironmentChanged}
            color="skyblue"
            error={data.errors && (data.errors.environment)}
            isNullVariant={false}
          />
        </div>
      </div>
      <div
        className="single-form-body-preorders__row"
      >
        <div>
          <FormControl error={data.errors && (data.errors.datacenters)}>
            <InputLabel required disableAnimation shrink style={{ backgroundColor: 'skyblue' }} id={`${'ЦОД'}-label`}>ЦОД</InputLabel>
            <Select
              labelId={`${'ЦОД'}-label`}
              value={data.datacenters
                .map((value) => (value ? value.id : null)).filter(((value) => value))}
              onChange={events.onDatacentersChanged}
              style={{ width: '200px', height: '60px' }}
              multiple
            >
              {datacentersOptions && datacentersOptions.map((datacenter) => (
                <MenuItem key={datacenter.id} value={datacenter.id}>
                  {datacenter.code}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControlLabel
            control={(
              <Checkbox
                checked={data.isReplication}
                onChange={events.onIsReplicationChanged}
              />
            )}
            label="Признак репликации"
          />
        </div>
      </div>
      <div
        className="single-form-body-preorders__row"
      >
        {!data.isNew && (
          <SearchBarSelect
            label="Статус"
            value={data.status}
            options={statusOptions && statusOptions.map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
            onChange={events.onStatusChanged}
            color="skyblue"
            error={data.errors && (data.errors.status)}
            isNullVariant={false}
          />
        )}
        <SearchBarSelect
          label="Тип потребности"
          value={data.preorderType}
          options={preorderTypeOptions && preorderTypeOptions.map((preorderType) => (
            <MenuItem key={preorderType} value={preorderType}>
              {preorderType}
            </MenuItem>
          ))}
          onChange={events.onPreorderTypeChanged}
          color="skyblue"
          error={data.errors && (data.errors.preorderType)}
          isNullVariant={false}
        />
      </div>
    </div>
  );
}

SingleFormBodyPreorders.propTypes = {
  data: PropTypes.shape({
    regNumber: PropTypes.string,
    // eslint-disable-next-line react/forbid-prop-types
    configuration: PropTypes.object,
    // eslint-disable-next-line react/forbid-prop-types
    environment: PropTypes.object,
    // eslint-disable-next-line react/forbid-prop-types
    datacenters: PropTypes.arrayOf(PropTypes.object),
    isReplication: PropTypes.bool,
    status: PropTypes.string,
    preorderType: PropTypes.string,
    errors: PropTypes.shape({
      regNumber: PropTypes.bool,
      configuration: PropTypes.bool,
      environment: PropTypes.bool,
      datacenters: PropTypes.bool,
      isReplication: PropTypes.bool,
      status: PropTypes.bool,
      preorderType: PropTypes.bool,
    }),
    isNew: PropTypes.bool,
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
