import { MidwayConfig } from '@midwayjs/core';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: 'cool-admin for node consul',
  koa: {
    port: 80,
  },
  consul: {
    provider: {
      // 注册本服务
      register: true,
      // 应用正常下线反注册
      deregister: true,
      // consul server 服务地址
      host: '10.18.18.27',
      // consul server 服务端口
      port: '8500',
      // 调用服务的策略(默认选取 random 具有随机性)
      strategy: 'random',
    },
    service: {
      // 此处是当前这个 midway 应用的地址
      address: '10.18.18.27',
      // 当前 midway 应用的端口
      port: 80,
      // 做泳道隔离等使用
      // tags: ['tag1', 'tag2'],
      name: 'api'
      // others consul service definition
    }
  },
} as MidwayConfig;
