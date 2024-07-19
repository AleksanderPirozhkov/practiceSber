import React from 'react';
import PropTypes from 'prop-types';
import { Pagination } from '@mui/material';
import SearchBarPreorders from './SearchPreordersComponents/SearchBarPreorders';
import SearchResultsPreorders from './SearchPreordersComponents/SearchResultsPreorders';
import Crud from '../../api/crud';
import NumberOfFound from '../BaseObjects/SearchBase/NumberOfFound';
import '../../css/SearchPreorders/SearchPreorders.css';

export default function SearchPreorders(
  {
    isOpenSearchBar,
    setOpenSearchBar,
    elementOnPageCount,
  },
) {
  const [regNumber, setRegNumber] = React.useState('');
  const [configuration, setConfiguration] = React.useState();
  const [environment, setEnvironment] = React.useState();
  const [status, setStatus] = React.useState('');
  const [preorderType, setPreorderType] = React.useState('');
  const [isReplication, setIsReplication] = React.useState('');
  const [datacenters, setDatacenters] = React.useState([]);

  const [numberOfFound, setNumberOfFound] = React.useState(0);
  const [filter, setFilter] = React.useState([]);
  const [numberOfPages, setNumberOfPages] = React.useState(1);
  const [numberOfPage, setNumberOfPage] = React.useState(1);

  const isReplicationEnum = {
    exist: 'Yes',
    noExist: 'No',
  };

  const filteredPreorders = async (
    regNumberPreorder,
    configurationPreorder,
    environmentPreorder,
    statusPreorder,
    preorderTypePreorder,
    datacentersPreorder,
    isReplicationPreorder,
    numberOfPagePreorder,
  ) => {
    const searchObject = {};
    if (regNumberPreorder && regNumberPreorder !== '') {
      searchObject.regNumber = regNumberPreorder.trim();
    }
    if (configurationPreorder && configurationPreorder.id) {
      searchObject.configuration = { id: Number.parseInt(configurationPreorder.id, 10) };
    }
    if (environmentPreorder && environmentPreorder.id) {
      searchObject.environment = { id: Number.parseInt(environmentPreorder.id, 10) };
    }
    if (statusPreorder && statusPreorder !== '') {
      searchObject.status = statusPreorder;
    }
    if (preorderTypePreorder && preorderTypePreorder !== '') {
      searchObject.preorderType = preorderTypePreorder;
    }

    if (datacentersPreorder && datacentersPreorder.length !== 0) {
      searchObject.datacenters = datacentersPreorder
        .map(
          (datacenter) => Number.parseInt(datacenter.id, 10),
        );
    }
    if (isReplicationPreorder && isReplicationPreorder !== '') {
      searchObject.isReplication = (isReplicationPreorder === isReplicationEnum.exist);
    }

    const startNumber = elementOnPageCount * (Number.parseInt(numberOfPagePreorder, 10) - 1);
    const endNumber = startNumber + elementOnPageCount;
    const result = await Crud.searchPreorders(searchObject);

    if (Math.ceil(result.length / elementOnPageCount) < numberOfPages) {
      setNumberOfPage(1);
    }

    // if (result.length !== numberOfFound) {
    //   setNumberOfPage(1);
    // }

    setFilter(result.slice(startNumber, endNumber));
    setNumberOfFound(result.length);
    setNumberOfPages(Math.ceil(result.length / elementOnPageCount));
  };

  React.useEffect(() => {
    filteredPreorders(
      regNumber,
      configuration,
      environment,
      status,
      preorderType,
      datacenters,
      isReplication,
      numberOfPage,
    );
  }, [regNumber,
    configuration,
    environment,
    status,
    preorderType,
    datacenters,
    isReplication,
    numberOfPage,
    filteredPreorders,
  ]);
  const clearAll = () => {
    setRegNumber('');
    setConfiguration('');
    setEnvironment('');
    setStatus('');
    setPreorderType('');
    setDatacenters([]);
    setIsReplication('');
    filteredPreorders(
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      numberOfPage,
    );
  };
  const onRegNumberChanged = (e) => {
    setRegNumber(e.target.value);
    filteredPreorders(
      e.target.value,
      configuration,
      environment,
      status,
      preorderType,
      datacenters,
      isReplication,
      numberOfPage,
    );
  };
  const onConfigurationChanged = (e) => {
    setConfiguration(e.target.value);
    filteredPreorders(
      regNumber,
      e.target.value,
      environment,
      status,
      preorderType,
      datacenters,
      isReplication,
      numberOfPage,
    );
  };
  const onEnvironmentChanged = (e) => {
    setEnvironment(e.target.value);
    filteredPreorders(
      regNumber,
      configuration,
      e.target.value,
      status,
      preorderType,
      datacenters,
      isReplication,
      numberOfPage,
    );
  };
  const onStatusChanged = (e) => {
    setStatus(e.target.value);
    filteredPreorders(
      regNumber,
      configuration,
      environment,
      e.target.value,
      preorderType,
      datacenters,
      isReplication,
      numberOfPage,
    );
  };
  const onPreorderTypeChanged = (e) => {
    setPreorderType(e.target.value);
    filteredPreorders(
      regNumber,
      configuration,
      environment,
      status,
      e.target.value,
      datacenters,
      isReplication,
      numberOfPage,
    );
  };
  const onDatacentersChanged = (e) => {
    setDatacenters(e.target.value);
    filteredPreorders(
      regNumber,
      configuration,
      environment,
      status,
      preorderType,
      e.target.value,
      isReplication,
      numberOfPage,
    );
  };
  const onIsReplicationChanged = (e) => {
    setIsReplication(e.target.value);
    filteredPreorders(
      regNumber,
      configuration,
      environment,
      status,
      preorderType,
      datacenters,
      e.target.value,
      numberOfPage,
    );
  };
  const paginationHandleChange = (e, page) => {
    setNumberOfPage(page);
    filteredPreorders(
      regNumber,
      configuration,
      environment,
      status,
      preorderType,
      datacenters,
      isReplication,
      page,
    );
  };

  return (
    <div
      className="search-preorders"
    >
      <div>
        <SearchBarPreorders
          data={
            {
              regNumber,
              configuration,
              environment,
              status,
              preorderType,
              datacenters,
              isReplication,
              isReplicationEnum,
            }
          }
          events={
            {
              onRegNumberChanged,
              onConfigurationChanged,
              onEnvironmentChanged,
              onStatusChanged,
              onPreorderTypeChanged,
              onDatacentersChanged,
              onIsReplicationChanged,
              clearAll,
            }
          }
          isOpenSearchBar={isOpenSearchBar}
          setOpenSearchBar={setOpenSearchBar}
        />
      </div>
      <div>
        <NumberOfFound numberOfFound={numberOfFound} />
      </div>
      <div>
        <SearchResultsPreorders
          data={
            {
              filter,
              numberOfFound,
            }
          }
        />
      </div>
      <div
        className="search-preorders__pagination"
      >
        <Pagination
          count={numberOfPages}
          page={numberOfPage}
          onChange={paginationHandleChange}
        />
      </div>
    </div>
  );
}

SearchPreorders.propTypes = {
  isOpenSearchBar: PropTypes.bool.isRequired,
  setOpenSearchBar: PropTypes.func.isRequired,
  elementOnPageCount: PropTypes.number.isRequired,
};
