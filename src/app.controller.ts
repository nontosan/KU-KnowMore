import { Controller, Get, Post, Request, UseGuards, HttpService, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { AxiosRequestConfig } from '../node_modules/axios';
import { User_Service } from './users/users.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
    private readonly http: HttpService,
    private userService: User_Service
  ) {}
  
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('auth/token')
  async getToken(@Body() auth_code) {
    var data = JSON.stringify({
      "grant_type": "authorization_code",
      "client_id": "38d38f02785c632dc6df02461443b84a936",
      "client_secret": "e9157b30e2c9e5cd4b1ecf3aa42a137d3fa5da226e70ea041f239b30fb2f891d818aad34afaf01c8502e97",
      "code": auth_code.code,
      "redirect_uri": "http://localhost:3000/portal"
    });

    var config: AxiosRequestConfig = {
      method: 'post',
      url: 'https://sso-dev.ku.ac.th/idp/apps/token',
      headers: { 
        'Content-Type': 'application/json', 
      },
      data : data
    };
    const response = await this.http.request(config).toPromise();
    const user_info = await this.authService.validateToken(response.data.access_token);
    var u_id, status;
    try {
      u_id = (await this.userService.findUserIDFromUID(user_info.uid));
      status = 'Old'
    } catch (error) {
      u_id = await this.userService.createNewUser(user_info)
      console.log(u_id);
      status = 'New'
    }
    var res;
    if ( response.data.error ) res = response.data;
    else {
      res = {
        "access_token": response.data.access_token,
        "expires_in": response.data.expires_in,
        "token_type": response.data.token_type,
        "scope": response.data.scope,
        "refresh_token": response.data.refresh_token,
        "user_status": status,
        "user_id": u_id.id
      }  
    }
    return res
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
