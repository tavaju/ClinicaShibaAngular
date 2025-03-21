import { InjectionToken } from '@angular/core';
import { ColorTheme } from '../enums/color-theme.enum';
import { ColorThemeType } from '../types/color-theme.type';
/**
 * Module configuration interface.
 */
export interface IModuleConfigOptions {
    /** width */
    width?: string;
    /** height */
    height?: string;
    /** color theme */
    theme?: ColorTheme | ColorThemeType;
}
export declare const MODULE_CONFIG_TOKEN: InjectionToken<IModuleConfigOptions>;
