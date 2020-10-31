import { Injectable, HttpService } from '@nestjs/common';
import { User_Service } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AxiosRequestConfig } from '../../node_modules/axios';

@Injectable()
export class AuthService {
  constructor(
    private usersService: User_Service,
    private jwtService: JwtService,
    private readonly http: HttpService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    //const ru = await this.usersService.findUserIDFromUsername(user.username);
    //console.log(ru);
    return {
      userid: '5f82fd2e04eb8600aa617b66',
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateToken(token: string) {
    var newToken = token;
    var res;
    var config: AxiosRequestConfig = {
      method: 'get',
      url: 'https://sso-dev.ku.ac.th/idp/apps/userinfo',
      headers: { 
        'Authorization': `Bearer ${newToken}`, 
      }
    };
    try {
      var response = await this.http.request(config).toPromise();
      res = response.data
    } catch (error) {
      res = {
        "error": "invalid_token",
        "error_description": "The access token provided is invalid"
      }
    }
    return res;
  }
}
