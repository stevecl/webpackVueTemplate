import axios from 'axios'
import Bus from './bus'

let headerConf = {
	"app-version": "4.0.1",
	"cli-os": "web",
};

let instance = axios.create({
	// baseURL: '',
	timeout: 8000,
	withCredentials: false,
	headers: {
		'Accept': '*/*',
		'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
	}
});

// 添加请求拦截器
instance.interceptors.request.use((req) => {
	//默认请求带上header
	req.headers = Object.assign(req.headers, headerConf);
	// req.headers['authorize-token'] = sessionStorage['authorize-token'];
	return req
}, (err) => {
  	return Promise.reject(err)
});

// 添加响应拦截器
instance.interceptors.response.use((res) => {
 	return res
}, (err) => {
	//响应超时处理
	if (err.code === 'ECONNABORTED' && err.message.indexOf('timeout') !== -1) {
		Bus.$emit('loadingHide');
		Bus.$emit('showToast', '网络繁忙,请稍候试试吧')
	}

	return Promise.reject(err)
});

export default instance
