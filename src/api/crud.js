import axios from 'axios';

const localhost = 'http://localhost:4000';

async function makeRequest(method, endpoint, data = null, filter = null) {
  try {
    const url = `${localhost}/${endpoint}`;

    let response = (await axios({ method, url, data })).data;

    if (filter && Object.keys(filter).length !== 0) {
      response = response.filter(
        (obj) => Object.entries(filter)
          .every(
            ([keyFilter, valueFilter]) => {
              const objValue = obj[keyFilter];
              return objValue !== undefined
                && objValue.toLowerCase().includes(valueFilter.toLowerCase());
            },
          ),
      );
    }

    return response;
  } catch (error) {
    console.error(`Error making ${method} request to ${endpoint}:`, error);
    return null;
  }
}

// Preorders

async function createPreorder(entity) {
  return makeRequest('post', 'preorders', entity);
}

async function updatePreorder(entity) {
  return makeRequest('put', `preorders/${entity.id}`, entity);
}

async function deletePreorder(id) {
  return makeRequest('delete', `preorders/${id}`);
}

async function getPreorder(id) {
  return makeRequest('get', `preorders/${id}`);
}

async function getAllPreorders() {
  return makeRequest('get', 'preorders');
}

async function searchPreorders(filter) {
  try {
    const response = await getAllPreorders();
    let filteredResponse = response.filter((obj) => {
      // if ((obj.preorderType === null && filter.preorderType)
      //   || (obj.configurationId === null && filter.configurationId)
      //   || (obj.environmentId === null && filter.environmentId)
      //   || (obj.datacenterIds === null && filter.datacenterIds)
      //   || (obj.status === null && filter.status)
      // ) {
      //   return false;
      // }
      if (filter.regNumber
        && !(obj.regNumber.toLowerCase().includes(filter.regNumber.toLowerCase()))) {
        return false;
      }
      if (filter.preorderType
        && obj.preorderType
        && !(obj.preorderType.includes(filter.preorderType))) {
        return false;
      }
      if (filter.configuration
        && obj.configurationId
        && !(obj.configurationId.id === filter.configuration.id)) {
        return false;
      }
      if (filter.environment
        && obj.environmentId
        && !(obj.environmentId.id === filter.environment.id)) {
        return false;
      }
      if (filter.datacenters
        && obj.datacenterIds
        && !(filter.datacenters
          .every(
            (id) => obj.datacenterIds
              .map(
                (datacenterId) => {
                  if (datacenterId) {
                    return datacenterId.id;
                  }
                  return null;
                },
              )
              .includes(id),
          )
        )
      ) {
        return false;
      }
      if (
        'isReplication' in filter
        && 'isReplication' in obj
        && obj.isReplication !== filter.isReplication
      ) {
        return false;
      }
      if (filter.status && !(obj.status.includes(filter.status))) {
        return false;
      }
      return true;
    });
    filteredResponse = filteredResponse.map((preorder) => {
      return {
        ...preorder,
        configuration: preorder.configurationId,
        environment: preorder.environmentId,
        datacenters: preorder.datacenterIds,
      };
    });
    return filteredResponse;
  } catch (error) {
    console.error('Error getting all filtered preorders:', error);
    return null;
  }
}

// Configurations

async function createConfiguration(entity) {
  return makeRequest('post', 'configurations', entity);
}

async function updateConfiguration(entity) {
  return makeRequest('put', `configurations/${entity.id}`, entity);
}

async function deleteConfiguration(id) {
  return makeRequest('delete', `configurations/${id}`);
}

async function getConfiguration(id) {
  return makeRequest('get', `configurations/${id}`);
}

async function getAllConfigurations() {
  return makeRequest('get', 'configurations');
}

async function searchConfigurations(filter) {
  return makeRequest('get', 'configurations', null, filter);
}

// Datacenters

async function createDatacenter(entity) {
  return makeRequest('post', 'datacenters', entity);
}

async function updateDatacenter(entity) {
  return makeRequest('put', `datacenters/${entity.id}`, entity);
}

async function deleteDatacenter(id) {
  return makeRequest('delete', `datacenters/${id}`);
}

async function getDatacenter(id) {
  return makeRequest('get', `datacenters/${id}`);
}

async function getAllDatacenters() {
  return makeRequest('get', 'datacenters');
}

async function searchDatacenters(filter) {
  return makeRequest('get', 'datacenters', null, filter);
}

// Environments

async function createEnvironment(entity) {
  return makeRequest('post', 'environments', entity);
}

async function updateEnvironment(entity) {
  return makeRequest('put', `environments/${entity.id}`, entity);
}

async function deleteEnvironment(id) {
  return makeRequest('delete', `environments/${id}`);
}

async function getEnvironment(id) {
  return makeRequest('get', `environments/${id}`);
}

async function getAllEnvironments() {
  return makeRequest('get', 'environments');
}

async function searchEnvironments(filter) {
  return makeRequest('get', 'environments', null, filter);
}

export default {
  createPreorder,
  updatePreorder,
  deletePreorder,
  getPreorder,
  getAllPreorders,
  searchPreorders,
  createConfiguration,
  updateConfiguration,
  deleteConfiguration,
  getConfiguration,
  getAllConfigurations,
  searchConfigurations,
  createDatacenter,
  updateDatacenter,
  deleteDatacenter,
  getDatacenter,
  getAllDatacenters,
  searchDatacenters,
  createEnvironment,
  updateEnvironment,
  deleteEnvironment,
  getEnvironment,
  getAllEnvironments,
  searchEnvironments,
};
