import request from './request';

export default {
  getBan(){
    return request.get('/banner')
  },
  getNav(){
    return request.get('/nav')
  },
  getVideo(params) {
    return request.get('/video', {params})
}
}
