import { InjectionToken } from "@angular/core";
import { environment } from '../enviromnents/environment.prod';
import { AppConfig } from "./appconfig.interface";




export const APP_SERVICE_CONFIG = new InjectionToken<AppConfig>('app.config');

export const APP_CONGIG: AppConfig = {
    apiEndpoint:environment.apiEndpoint
};