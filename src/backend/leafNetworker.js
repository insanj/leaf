import preval from 'preval.macro';
import jquery from 'jquery';

class LeafNetworker {
  static baseURL() {
    const addemURL = preval`module.exports = process.env.REACT_APP_BASE_URL ? process.env.REACT_APP_BASE_URL : 'https://myleaf-backend.herokuapp.com'`;
    return addemURL;
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
          resolve(response);
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
}

export default LeafNetworker;
