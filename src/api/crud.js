import axios from 'axios';

const localhost = 'http://localhost:4000'

async function makeRequest(method, endpoint, data, filter) {
  try {
    let url = `${localhost}/${endpoint}`;
    
    if (filter) {
      const params = new URLSearchParams(filter);
      url += `?${params.toString()}`;
    }

    const response = await axios({ method, url, data });

    return response.data;
  } catch (error) {
    console.error(`Error making ${method} request to ${endpoint}:`, error);
    throw error;
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
    let response = await getAllPreorders();
    const filteredResponse = response.filter(obj => {
      if (filter.regNumber && !(obj.regNumber.includes(filter.regNumber))) {
        return false;
      }
      if (filter.preorderType && !(obj.preorderType.includes(filter.preorderType))) {
        return false;
      }
      if (filter.configurationId && !(obj.configurationId.id === filter.configurationId.id)) {
        return false;
      }
      if (filter.environmentId && !(obj.environmentId.id === filter.environmentId.id)) {
        return false;
      }
      if (filter.datacenterIds && !(obj.datacenterIds.id === filter.datacenterIds.id)) {
        return false;
      }
      if (filter.isReplication && !(obj.isReplication.includes(filter.isReplication))) {
        return false;
      }
      if (filter.status && !(obj.status.includes(filter.status))) {
        return false;
      }
      return true;
    });
    return filteredResponse;
  } catch (error) {
    console.error('Error getting all filtered preorders:', error);
    throw error;
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
