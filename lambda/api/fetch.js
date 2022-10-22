import http from 'http'

const get = (url, options = {}) => {
    return new Promise((resolve, reject) => {
    const req = http.get(url, options, res => {
      let rawData = '';

      res.on('data', chunk => {
        rawData += chunk;
      });

      res.on('end', () => {
        try {
          resolve(JSON.parse(rawData));
        } catch (err) {
          reject(new Error(err));
        }
      });
    });

    req.on('error', err => {
      reject(new Error(err));
    });
  });
}


export default {
    get
}