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
  const [configurationId, setConfigurationId] = React.useState('');
  const [environmentId, setEnvironmentId] = React.useState('');
  const [status, setStatus] = React.useState('');
  const [preorderType, setPreorderType] = React.useState('');
  const [isReplication, setIsReplication] = React.useState('');
  const [datacenterIds, setDatacenterIds] = React.useState([]);
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
    configurationIdPreorder,
    environmentIdPreorder,
    statusPreorder,
    preorderTypePreorder,
    datacenterIdsPreorder,
    isReplicationPreorder,
    numberOfPagePreorder,
  ) => {
    const searchObject = {};
    if (regNumberPreorder && regNumberPreorder !== '') {
      searchObject.regNumber = regNumberPreorder.trim();
    }
    if (configurationIdPreorder && configurationIdPreorder !== '') {
      searchObject.configurationId = { id: Number.parseInt(configurationIdPreorder, 10) };
    }
    if (environmentIdPreorder && environmentIdPreorder !== '') {
      searchObject.environmentId = { id: Number.parseInt(environmentIdPreorder, 10) };
    }
    if (statusPreorder && statusPreorder !== '') {
      searchObject.status = statusPreorder;
    }
    if (preorderTypePreorder && preorderTypePreorder !== '') {
      searchObject.preorderType = preorderTypePreorder;
    }

    if (datacenterIdsPreorder && datacenterIdsPreorder.length !== 0) {
      searchObject.datacenterIds = datacenterIdsPreorder
        .map(
          (datacenterId) => Number.parseInt(datacenterId, 10),
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
      configurationId,
      environmentId,
      status,
      preorderType,
      datacenterIds,
      isReplication,
      numberOfPage,
    );
  }, [regNumber,
    configurationId,
    environmentId,
    status,
    preorderType,
    datacenterIds,
    isReplication,
    numberOfPage,
    filteredPreorders,
  ]);

  const onRegNumberChanged = (e) => {
    setRegNumber(e.target.value);
    filteredPreorders(
      e.target.value,
      configurationId,
      environmentId,
      status,
      preorderType,
      datacenterIds,
      isReplication,
      numberOfPage,
    );
  };
  const onConfigurationChanged = (e) => {
    setConfigurationId(e.target.value);
    filteredPreorders(
      regNumber,
      e.target.value,
      environmentId,
      status,
      preorderType,
      datacenterIds,
      isReplication,
      numberOfPage,
    );
  };
  const onEnvironmentChanged = (e) => {
    setEnvironmentId(e.target.value);
    filteredPreorders(
      regNumber,
      configurationId,
      e.target.value,
      status,
      preorderType,
      datacenterIds,
      isReplication,
      numberOfPage,
    );
  };
  const onStatusChanged = (e) => {
    setStatus(e.target.value);
    filteredPreorders(
      regNumber,
      configurationId,
      environmentId,
      e.target.value,
      preorderType,
      datacenterIds,
      isReplication,
      numberOfPage,
    );
  };

  const onPreorderTypeChanged = (e) => {
    setPreorderType(e.target.value);
    filteredPreorders(
      regNumber,
      configurationId,
      environmentId,
      status,
      e.target.value,
      datacenterIds,
      isReplication,
      numberOfPage,
    );
  };

  const onDatacentersChanged = (e) => {
    setDatacenterIds(typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value);
    filteredPreorders(
      regNumber,
      configurationId,
      environmentId,
      status,
      preorderType,
      (typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value),
      isReplication,
      numberOfPage,
    );
  };

  const onIsReplicationChanged = (e) => {
    setIsReplication(e.target.value);
    filteredPreorders(
      regNumber,
      configurationId,
      environmentId,
      status,
      preorderType,
      datacenterIds,
      e.target.value,
      numberOfPage,
    );
  };

  const paginationHandleChange = (e, page) => {
    setNumberOfPage(page);
    filteredPreorders(
      regNumber,
      configurationId,
      environmentId,
      status,
      preorderType,
      datacenterIds,
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
              configurationId,
              environmentId,
              status,
              preorderType,
              datacenterIds,
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
