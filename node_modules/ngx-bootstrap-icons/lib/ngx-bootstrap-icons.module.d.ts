import { ModuleWithProviders } from '@angular/core';
import { IModuleConfigOptions } from './config/module.config';
import * as i0 from "@angular/core";
import * as i1 from "./components/ngx-bootstrap-icons/ngx-bootstrap-icons.component";
export declare class NgxBootstrapIconsModule {
    static pick(icons: {
        [key: string]: string;
    }, config?: IModuleConfigOptions): ModuleWithProviders<NgxBootstrapIconsModule>;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgxBootstrapIconsModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<NgxBootstrapIconsModule, [typeof i1.NgxBootstrapIconsLibComponent], never, [typeof i1.NgxBootstrapIconsLibComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<NgxBootstrapIconsModule>;
}
