/**
 * @author yjf.fly
 */
const getServeUrl = (): string => {
  // if (process.env.NODE_ENV == "production") {
  //   return process.env.VUE_APP_SERVE_URL || window.location.origin;
  // } else {
  // return "http://192.168.2.34:9098";
  // return "http://ccf-scheme.aieraonline.cn";
  // return "http://192.168.2.79:9098";
  return "http://192.168.2.49:7777";
  // return "http://192.168.2.41:9090";
  // return "http://192.168.2.47:771";
  // }
};

const setToken = token => {
  localStorage.setItem("token", token);
};

const getToken = () => {
  return localStorage.getItem("token");
};

const getRequestHeader = () => {
  return {
    authorization: getToken()
  };
};

const getResourceUrl = url => {
  return getServeUrl() + url;
}

const loading = () => {
  console.log('loading');
}

const msg = (option: any) => {
  console.log(option);
}

const dealJSONData = function (data) {
  let deal = function (data) {
    if (Array.isArray(data)) {
      data.forEach(function (item, index) {
        if (item === null) {
          data[index] = '';
        } else {
          deal(item);
        }
      });
    } else if (typeof (data) == "object" && Object.prototype.toString.call(data).toLowerCase() == "[object object]" && !data.length) {
      for (let k in data) {
        if (data[k] === null) {
          data[k] = '';
        } else {
          deal(data[k]);
        }
      }
    }
  };
  deal(data);
};

export default {
  getServeUrl,
  setToken,
  getToken,
  getRequestHeader,
  loading,
  msg,
  dealJSONData,
  getResourceUrl
};
