import request from './network.js'
// import {baseURL} from './config.js'

// const baseURL = 'http://106.54.54.237:8000/api/v1/'

export function getMultData() {
  return request({
    url: '/home/multidata',
    data: '',
    method: 'get'
  })
}

export function getGoodsList(type,page) {
  return request({
    url: '/home/data',
    data:{
      type,
      page
    }
  })
}