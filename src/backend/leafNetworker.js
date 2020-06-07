import preval from 'preval.macro';
import jquery from 'jquery';

class LeafNetworker {
  static baseURL() {
    const url = preval`module.exports = process.env.REACT_APP_BASE_URL ? process.env.REACT_APP_BASE_URL : 'https://myleaf-backend.herokuapp.com'`;
    return url;
  }

  log(msg) {
    if (preval`module.exports = process.env.REACT_APP_BASE_URL != null`) {
      console.log(`[LeafNetworker-DEBUG] ${msg}`);
    }
  }

  post(url, body) {
    return new Promise((resolve, reject) => {
      this.log(`sending off POST url ${url} body ${JSON.stringify(body)}`);
      jquery.ajax({
        method: 'POST',
        url: url,
        data: JSON.stringify(body),
        type: 'jsonp',
        success: (response) => {
          this.log(`success from POST url ${url} body ${JSON.stringify(body)} response ${JSON.stringify(response)}`);

          if (response && response.data && response.success) {
            resolve(response);
          } else {
            reject(response);
          }
        },
        error: (error) => {
          this.log(`failure from POST url ${url} body ${JSON.stringify(body)} error ${JSON.stringify(error)}`);
          reject(error);
        },
      });
    });
  }

  login({ username, password }) {
    const baseURL = LeafNetworker.baseURL();
    const reqURL = baseURL + '/login';
    const requestBody = {
      username: username,
      password: password,
    };

    return this.post(reqURL, requestBody);
  }

  register({ username, password }) {
    const baseURL = LeafNetworker.baseURL();
    const reqURL = baseURL + '/register';
    const requestBody = {
      username: username,
      password: password,
    };

    return this.post(reqURL, requestBody);
  }

  getCounters({ username, password }) {
    const baseURL = LeafNetworker.baseURL();
    const reqURL = baseURL + '/counters/get';
    const requestBody = {
      username: username,
      password: password,
    };

    return this.post(reqURL, requestBody);
  }

  setCounters({ username, password, itemValues }) {
    const baseURL = LeafNetworker.baseURL();
    const reqURL = baseURL + '/counters/set';
    const requestBody = {
      username: username,
      password: password,
      itemValues: itemValues && Object.keys(itemValues).length > 0 ? itemValues : {},
    };

    return this.post(reqURL, requestBody);
  }
}

export default LeafNetworker;
