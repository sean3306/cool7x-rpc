import {Provide} from "@midwayjs/decorator";
import {Inject} from "@midwayjs/core";
import {BalancerService} from "@midwayjs/consul";
import axios from "axios";
import {Context} from "vm";

/**
 * 网络请求封装
 */

export type Method =
  | 'get' | 'GET'
  | 'delete' | 'DELETE'
  | 'head' | 'HEAD'
  | 'options' | 'OPTIONS'
  | 'post' | 'POST'
  | 'put' | 'PUT'
  | 'patch' | 'PATCH'
  | 'purge' | 'PURGE'
  | 'link' | 'LINK'
  | 'unlink' | 'UNLINK';

@Provide()
export class ConsulUtils{

  @Inject()
  balancerService: BalancerService;

  /**
   * 获取对应的网络服务
   * @param serviceName 服务名称
   * @param passingOnly 仅查询在线的服务
   * @return {
   *   serviceIP:string,
   *   port:string
   * }
   */
  async getService(serviceName:string){
    try {
      const service = await this.balancerService
        .getServiceBalancer()
        .select(serviceName);
      return {
        serviceIP: service.ServiceAddress,
        port: service.ServicePort
      }
    }catch (error){
      return "10001";
    }
  }

  async fetch(config:{ctx: Context,method:Method,url:string,serviceName?:string,params?:any,data?:any}){
    try {
      const service = await this.getService(config.serviceName);
      if(service !== '10001'){
       const response = axios({
          method: config.method,
          url: config.url,
          data:config.data,
          params:config.params,
          baseURL: `http://${service.serviceIP}:${service.port}`
        });
        return response;
      }else{
        return {
          data:"Server Error!"
        }
      }
    }catch (error){
      return {
        data:error
      };
    }
  }
}
