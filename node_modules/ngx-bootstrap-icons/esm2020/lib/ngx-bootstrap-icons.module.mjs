import { NgModule, } from '@angular/core';
import { NgxBootstrapIconsLibComponent } from './components/ngx-bootstrap-icons/ngx-bootstrap-icons.component';
import { MODULE_CONFIG_TOKEN } from './config/module.config';
import { Icons } from './providers/icon.provider';
import * as i0 from "@angular/core";
export class NgxBootstrapIconsModule {
    static pick(icons, config) {
        return {
            ngModule: NgxBootstrapIconsModule,
            providers: [
                { provide: Icons, multi: true, useValue: icons },
                { provide: MODULE_CONFIG_TOKEN, useValue: config },
            ],
        };
    }
}
NgxBootstrapIconsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.8", ngImport: i0, type: NgxBootstrapIconsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NgxBootstrapIconsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.8", ngImport: i0, type: NgxBootstrapIconsModule, declarations: [NgxBootstrapIconsLibComponent], exports: [NgxBootstrapIconsLibComponent] });
NgxBootstrapIconsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.8", ngImport: i0, type: NgxBootstrapIconsModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.8", ngImport: i0, type: NgxBootstrapIconsModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [NgxBootstrapIconsLibComponent],
                    exports: [NgxBootstrapIconsLibComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWJvb3RzdHJhcC1pY29ucy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9wcm9qZWN0cy9uZ3gtYm9vdHN0cmFwLWljb25zLWxpYi9zcmMvbGliL25neC1ib290c3RyYXAtaWNvbnMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDZ0IsUUFBUSxHQUM5QixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSxnRUFBZ0UsQ0FBQztBQUMvRyxPQUFPLEVBQXdCLG1CQUFtQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDbkYsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLDJCQUEyQixDQUFDOztBQU1sRCxNQUFNLE9BQU8sdUJBQXVCO0lBQzNCLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBZ0MsRUFBRSxNQUE2QjtRQUNoRixPQUFPO1lBQ0wsUUFBUSxFQUFFLHVCQUF1QjtZQUNqQyxTQUFTLEVBQUU7Z0JBQ1QsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRTtnQkFDaEQsRUFBRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRTthQUNuRDtTQUNGLENBQUM7SUFDSixDQUFDOztvSEFUVSx1QkFBdUI7cUhBQXZCLHVCQUF1QixpQkFIbkIsNkJBQTZCLGFBQ2xDLDZCQUE2QjtxSEFFNUIsdUJBQXVCOzJGQUF2Qix1QkFBdUI7a0JBSm5DLFFBQVE7bUJBQUM7b0JBQ1IsWUFBWSxFQUFFLENBQUMsNkJBQTZCLENBQUM7b0JBQzdDLE9BQU8sRUFBRSxDQUFDLDZCQUE2QixDQUFDO2lCQUN6QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgTW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGUsXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBOZ3hCb290c3RyYXBJY29uc0xpYkNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9uZ3gtYm9vdHN0cmFwLWljb25zL25neC1ib290c3RyYXAtaWNvbnMuY29tcG9uZW50JztcclxuaW1wb3J0IHsgSU1vZHVsZUNvbmZpZ09wdGlvbnMsIE1PRFVMRV9DT05GSUdfVE9LRU4gfSBmcm9tICcuL2NvbmZpZy9tb2R1bGUuY29uZmlnJztcclxuaW1wb3J0IHsgSWNvbnMgfSBmcm9tICcuL3Byb3ZpZGVycy9pY29uLnByb3ZpZGVyJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgZGVjbGFyYXRpb25zOiBbTmd4Qm9vdHN0cmFwSWNvbnNMaWJDb21wb25lbnRdLFxyXG4gIGV4cG9ydHM6IFtOZ3hCb290c3RyYXBJY29uc0xpYkNvbXBvbmVudF0sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ3hCb290c3RyYXBJY29uc01vZHVsZSB7XHJcbiAgcHVibGljIHN0YXRpYyBwaWNrKGljb25zOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9LCBjb25maWc/OiBJTW9kdWxlQ29uZmlnT3B0aW9ucyk6IE1vZHVsZVdpdGhQcm92aWRlcnM8Tmd4Qm9vdHN0cmFwSWNvbnNNb2R1bGU+IHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIG5nTW9kdWxlOiBOZ3hCb290c3RyYXBJY29uc01vZHVsZSxcclxuICAgICAgcHJvdmlkZXJzOiBbXHJcbiAgICAgICAgeyBwcm92aWRlOiBJY29ucywgbXVsdGk6IHRydWUsIHVzZVZhbHVlOiBpY29ucyB9LFxyXG4gICAgICAgIHsgcHJvdmlkZTogTU9EVUxFX0NPTkZJR19UT0tFTiwgdXNlVmFsdWU6IGNvbmZpZyB9LFxyXG4gICAgICBdLFxyXG4gICAgfTtcclxuICB9XHJcbn1cclxuIl19