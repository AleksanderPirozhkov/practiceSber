import React from 'react';
import PropTypes from 'prop-types';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import Crud from '../../../api/crud';
import SearchBarTextBox from '../../BaseObjects/SearchBase/SearchBaseComponents/SearchBarTextBox';
import SearchBarSelect from '../../BaseObjects/SearchBase/SearchBaseComponents/SearchBarSelect';
import '../../../css/SearchPreorders/SearchPreordersComponents/SearchBarPreorders.css';

export default function SearchBarPreorders(
  {
    data,
    events,
    isOpenSearchBar,
    setOpenSearchBar,
  },
) {
  const [configurationsOptions, setConfigurationsOptions] = React.useState();
  const [environmentsOptions, setEnvironmentsOptions] = React.useState();
  const [statusOptions, setStatusOptions] = React.useState();
  const [preorderTypeOptions, setPreorderTypeOptions] = React.useState();
  const [datacentersOptions, setDatacentersOptions] = React.useState([]);

  React.useEffect(() => {
    const fetchConfigurationsAndEnvironments = async () => {
      const configurations = await Crud.getAllConfigurations();
      const environments = await Crud.getAllEnvironments();
      const datacenters = await Crud.getAllDatacenters();
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
        <MenuItem key={configuration.id} value={configuration}>
          {configuration.code}
        </MenuItem>
      )));
      setEnvironmentsOptions(environments.map((environment) => (
        <MenuItem key={environment.id} value={environment}>
          {environment.code}
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
      setDatacentersOptions(datacenters.map((datacenter) => (
        <MenuItem key={datacenter.id} value={datacenter}>
          {datacenter.code}
        </MenuItem>
      )));
    };

    fetchConfigurationsAndEnvironments();
  }, []);

  const onClickButtonSearchBar = () => {
    setOpenSearchBar(!isOpenSearchBar);
  };

  return (
    <div>
      <Accordion expanded={isOpenSearchBar} onChange={onClickButtonSearchBar}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
        >
          Фильтр
        </AccordionSummary>
        <AccordionDetails>
          <div
            className="search-bar-preorders__content"
            id="searchBar"
          >
            <SearchBarTextBox
              label="Регистрационный номер"
              value={data.regNumber}
              onChange={events.onRegNumberChanged}
              icon={<SearchIcon />}
            />
            <SearchBarSelect
              label="Конфигурация"
              value={data.configuration ? data.configuration : ''}
              options={configurationsOptions}
              onChange={events.onConfigurationChanged}
              color="white"
            />
            <SearchBarSelect
              label="Среда"
              value={data.environment ? data.environment : ''}
              options={environmentsOptions}
              onChange={events.onEnvironmentChanged}
              color="white"
            />
            <SearchBarSelect
              label="Статус"
              value={data.status}
              options={statusOptions}
              onChange={events.onStatusChanged}
              color="white"
            />
            <SearchBarSelect
              label="Тип потребности"
              value={data.preorderType}
              options={preorderTypeOptions}
              onChange={events.onPreorderTypeChanged}
              color="white"
            />
            <FormControl>
              <InputLabel disableAnimation shrink style={{ backgroundColor: 'white', zIndex: '0' }} id={`${'ЦОД'}-label`}>ЦОД</InputLabel>
              <Select
                labelId={`${'ЦОД'}-label`}
                value={data.datacenters}
                onChange={events.onDatacentersChanged}
                style={{ width: '160px', height: '60px' }}
                multiple
              >
                {datacentersOptions}
              </Select>
            </FormControl>
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
              color="white"
            />
            <div>
              <Button onClick={events.clearAll}>Очистить все</Button>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

SearchBarPreorders.propTypes = {
  data: PropTypes.shape({
    regNumber: PropTypes.string,
    // eslint-disable-next-line react/forbid-prop-types
    configuration: PropTypes.any,
    // eslint-disable-next-line react/forbid-prop-types
    environment: PropTypes.any,
    status: PropTypes.string,
    preorderType: PropTypes.string,
    // eslint-disable-next-line react/forbid-prop-types
    datacenters: PropTypes.arrayOf(PropTypes.any),
    isReplication: PropTypes.string,
    // eslint-disable-next-line react/forbid-prop-types
    isReplicationEnum: PropTypes.object,
  }).isRequired,
  events: PropTypes.shape({
    onRegNumberChanged: PropTypes.func,
    onConfigurationChanged: PropTypes.func,
    onEnvironmentChanged: PropTypes.func,
    onStatusChanged: PropTypes.func,
    onPreorderTypeChanged: PropTypes.func,
    onDatacentersChanged: PropTypes.func,
    onIsReplicationChanged: PropTypes.func,
    clearAll: PropTypes.func,
  }).isRequired,
  isOpenSearchBar: PropTypes.bool.isRequired,
  setOpenSearchBar: PropTypes.func.isRequired,
};
