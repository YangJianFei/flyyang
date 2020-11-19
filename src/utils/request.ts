import axios from "axios";
import tool from './tool';
import router from "../router";

const service = axios.create({
  baseURL: tool.getServeUrl(),
  withCredentials: true
});
// declare var window: Window & { loadingInstance: boolean };
service.interceptors.request.use(
  (config: any) => {
    // console.log(config); AxiosRequestConfig
    config.headers = {
      ...config.headers,
      ...tool.getRequestHeader()
    };
    if (!config.formData) {
      config.data = config.data || {};
    }
    if (config.loading === undefined || config.loading) {
      if (window.loadingInstance) {
        window.loadingInstance.close();
      }
      // Loading.service().close();
      tool.loading();
    }
    return config;
  },
  error => {
    console.log(error);
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response: any) => {
    if (response.config.loading) {
      // Loading.service().close();
      // window.loadingInstance.close();
    }
    // if (response.data.code != 200) {
    //   if (!response.config.noTip) {
    //     tool.msg({
    //       type: "error",
    //       message: response.data.message
    //     });
    //   }
    //   return Promise.reject(response.data);
    // } else {
    //   if (response.data.responseBody.code != 200) {
    //     if (response.data.responseBody.code == '401' || response.data.responseBody.code == '403') {
    //       if (!response.config.noTip) {
    //         tool.msg({
    //           type: "error",
    //           message: response.data.responseBody.message
    //         });
    //       }
    //       if (!response.config.noShowLogin) {
    //         router.push({
    //           path: '/login?redirect=' + encodeURIComponent(router.currentRoute.fullPath)
    //         });
    //       }
    //     } else {
    //       if (!response.config.noTip) {
    //         tool.msg({
    //           type: "error",
    //           message: response.data.responseBody.message
    //         });
    //       }
    //     }
    //     return Promise.reject(response.data.responseBody);
    //   }
    // }
    let data = response.data;
    tool.dealJSONData(data);
    return data;
  },
  error => {
    if (window.loadingInstance) {
      window.loadingInstance.close();
    }
    // Loading.service().close();
    tool.msg({
      type: "error",
      message: "请求失败！"
    });
    console.log("err" + error);
    return Promise.reject(error);
  }
);

export default service;
