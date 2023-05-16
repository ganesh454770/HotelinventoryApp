import { Injectable, Inject } from '@angular/core';
import { RouteConfigToken } from '../rooms/services/routeConfig.service';
import { RouteConfig } from '../rooms/services/routeConfig';

@Injectable({
  providedIn: 'any'
})
export class ConfigService {

  constructor(@Inject(RouteConfigToken) private configToken: RouteConfig) { 
    console.log('ConfigService Intilized');
    console.log(this.configToken);
  }
}
