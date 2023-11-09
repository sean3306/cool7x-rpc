import {Body, Controller, Inject, Post, Query} from "@midwayjs/core";
import {Provide} from "@midwayjs/decorator";
import {ConsulUtils} from "../common/consulUtils";
import {Util} from "../common/util";

@Provide()
@Controller('/api')
export class BasicController {
  @Inject()
  ctx;

  @Inject()
  consulUtil:ConsulUtils;

  @Inject()
  utils:Util;

  /**
   * 真实接口，唯一获取是否允许进入B
   */
  @Post('/get_conf')
  async appConf(
    @Query() req,
    @Body() data
  ) {
    //获取客户端请求IP
    const ip = await this.utils.getReqIP(this.ctx);
    // 获取请求头信息
    const authorization = this.ctx.headers["Authorization"] || this.ctx.headers["authorization"];

    data["rpcClientIP"] = ip;
    data["rpcAuthorization"] = authorization;
    data["rpcHostName"] = this.ctx.host;

    const response = await this.consulUtil.fetch({
      ctx:this.ctx,
      method:'post',
      url:'/app/base/conf/get_conf',
      serviceName:"admin",
      params:req,
      data:data,
      }
    );
    return response.data;
  }
}
