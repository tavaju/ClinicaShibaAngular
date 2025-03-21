import { Component, Inject, Input, } from '@angular/core';
import { MODULE_CONFIG_TOKEN, } from '../../config/module.config';
import { toCamelCase } from '../../internal/utils/toCamelCase';
import { Icons } from '../../providers/icon.provider';
import * as i0 from "@angular/core";
import * as i1 from "../../providers/icon.provider";
const DEFAULT_SIZE = 16;
const MESSAGE = {
    iconNotFound: 'Icon not found',
};
var DimensionType;
(function (DimensionType) {
    DimensionType["Width"] = "width";
    DimensionType["Height"] = "height";
})(DimensionType || (DimensionType = {}));
/**
 * Bootstrap icon component.
 */
export class NgxBootstrapIconsLibComponent {
    constructor(_elem, _changeDetector, _icons, _config) {
        this._elem = _elem;
        this._changeDetector = _changeDetector;
        this._icons = _icons;
        this._config = _config;
        /** Removes default dimensions from svg. */
        this.resetDefaultDimensions = false;
        this._setSize = (type, size = DEFAULT_SIZE) => `${type}="${size}"`;
        this._setIconMessage = (message, icon) => `${message}: ${icon}\n`;
        this._logMessage = (message) => console.warn(message);
    }
    /**
     * OnChanges event.
     *
     * @param changes SimpleChanges
     */
    ngOnChanges(changes) {
        // icons are provided as an array of objects because of "multi: true"
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const icons = Object.assign({}, ...this._icons);
        let svg = icons[toCamelCase(changes.name.currentValue)] || '';
        if (!svg) {
            this._logMessage(this._setIconMessage(MESSAGE.iconNotFound, changes.name.currentValue));
            return;
        }
        // if config provided
        if (this._config) {
            if (this._config.width) {
                svg = svg.replace(this._setSize(DimensionType.Width), this._setSize(DimensionType.Width, this._config.width));
            }
            if (this._config.height) {
                svg = svg.replace(this._setSize(DimensionType.Height), this._setSize(DimensionType.Height, this._config.height));
            }
            if (this._config.theme) {
                this._elem.nativeElement.classList.add(this._config.theme);
            }
        }
        if (this.resetDefaultDimensions) {
            svg = svg.replace(this._setSize(DimensionType.Width), '');
            svg = svg.replace(this._setSize(DimensionType.Height), '');
        }
        if (this.width && svg.includes(DimensionType.Width)) {
            svg = svg.replace(this._setSize(DimensionType.Width), this._setSize(DimensionType.Width, this.width));
        }
        if (this.height && svg.includes(DimensionType.Height)) {
            svg = svg.replace(this._setSize(DimensionType.Height), this._setSize(DimensionType.Height, this.height));
        }
        this._elem.nativeElement.innerHTML = svg;
        this._changeDetector.markForCheck();
    }
}
NgxBootstrapIconsLibComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.8", ngImport: i0, type: NgxBootstrapIconsLibComponent, deps: [{ token: i0.ElementRef }, { token: i0.ChangeDetectorRef }, { token: Icons }, { token: MODULE_CONFIG_TOKEN }], target: i0.ɵɵFactoryTarget.Component });
NgxBootstrapIconsLibComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.8", type: NgxBootstrapIconsLibComponent, selector: "i-bs, *[i-bs]", inputs: { name: "name", width: "width", height: "height", resetDefaultDimensions: "resetDefaultDimensions" }, usesOnChanges: true, ngImport: i0, template: '<ng-content></ng-content>', isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.8", ngImport: i0, type: NgxBootstrapIconsLibComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'i-bs, *[i-bs]',
                    template: '<ng-content></ng-content>',
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.ChangeDetectorRef }, { type: i1.Icons, decorators: [{
                    type: Inject,
                    args: [Icons]
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [MODULE_CONFIG_TOKEN]
                }] }]; }, propDecorators: { name: [{
                type: Input
            }], width: [{
                type: Input
            }], height: [{
                type: Input
            }], resetDefaultDimensions: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWJvb3RzdHJhcC1pY29ucy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtYm9vdHN0cmFwLWljb25zLWxpYi9zcmMvbGliL2NvbXBvbmVudHMvbmd4LWJvb3RzdHJhcC1pY29ucy9uZ3gtYm9vdHN0cmFwLWljb25zLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBRUwsU0FBUyxFQUVULE1BQU0sRUFDTixLQUFLLEdBR04sTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUVMLG1CQUFtQixHQUNwQixNQUFNLDRCQUE0QixDQUFDO0FBRXBDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUMvRCxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sK0JBQStCLENBQUM7OztBQUd0RCxNQUFNLFlBQVksR0FBRyxFQUFFLENBQUM7QUFDeEIsTUFBTSxPQUFPLEdBQUc7SUFDZCxZQUFZLEVBQUUsZ0JBQWdCO0NBQy9CLENBQUM7QUFFRixJQUFLLGFBR0o7QUFIRCxXQUFLLGFBQWE7SUFDaEIsZ0NBQWUsQ0FBQTtJQUNmLGtDQUFpQixDQUFBO0FBQ25CLENBQUMsRUFISSxhQUFhLEtBQWIsYUFBYSxRQUdqQjtBQUVEOztHQUVHO0FBS0gsTUFBTSxPQUFPLDZCQUE2QjtJQWlCeEMsWUFDVSxLQUFpQixFQUNqQixlQUFrQyxFQUNuQixNQUFhLEVBQ0MsT0FBNkI7UUFIMUQsVUFBSyxHQUFMLEtBQUssQ0FBWTtRQUNqQixvQkFBZSxHQUFmLGVBQWUsQ0FBbUI7UUFDbkIsV0FBTSxHQUFOLE1BQU0sQ0FBTztRQUNDLFlBQU8sR0FBUCxPQUFPLENBQXNCO1FBUnBFLDJDQUEyQztRQUVwQywyQkFBc0IsR0FBRyxLQUFLLENBQUM7UUFrRjlCLGFBQVEsR0FBRyxDQUFDLElBQW1CLEVBQUUsT0FBd0IsWUFBWSxFQUFVLEVBQUUsQ0FBQyxH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LEVBQ25DLElBQUksQ0FBQyxRQUFRLENBQ1gsYUFBYSxDQUFDLE1BQU0sRUFDcEIsSUFBSSxDQUFDLE1BQU0sQ0FDWixDQUNGLENBQUM7U0FDSDtRQUVELElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUM7UUFDekMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN0QyxDQUFDOzswSEEvRlUsNkJBQTZCLDZFQW9COUIsS0FBSyxhQUNMLG1CQUFtQjs4R0FyQmxCLDZCQUE2Qix3TEFGOUIsMkJBQTJCOzJGQUUxQiw2QkFBNkI7a0JBSnpDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGVBQWU7b0JBQ3pCLFFBQVEsRUFBRSwyQkFBMkI7aUJBQ3RDOzswQkFxQkksTUFBTTsyQkFBQyxLQUFLOzswQkFDWixNQUFNOzJCQUFDLG1CQUFtQjs0Q0FsQnRCLElBQUk7c0JBRFYsS0FBSztnQkFLQyxLQUFLO3NCQURYLEtBQUs7Z0JBS0MsTUFBTTtzQkFEWixLQUFLO2dCQUtDLHNCQUFzQjtzQkFENUIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgQ29tcG9uZW50LFxyXG4gIEVsZW1lbnRSZWYsXHJcbiAgSW5qZWN0LFxyXG4gIElucHV0LFxyXG4gIE9uQ2hhbmdlcyxcclxuICBTaW1wbGVDaGFuZ2VzLFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHtcclxuICBJTW9kdWxlQ29uZmlnT3B0aW9ucyxcclxuICBNT0RVTEVfQ09ORklHX1RPS0VOLFxyXG59IGZyb20gJy4uLy4uL2NvbmZpZy9tb2R1bGUuY29uZmlnJztcclxuaW1wb3J0IHsgSWNvbk5hbWVzRW51bSB9IGZyb20gJy4uLy4uL2VudW1zL2ljb24tbmFtZXMuZW51bSc7XHJcbmltcG9ydCB7IHRvQ2FtZWxDYXNlIH0gZnJvbSAnLi4vLi4vaW50ZXJuYWwvdXRpbHMvdG9DYW1lbENhc2UnO1xyXG5pbXBvcnQgeyBJY29ucyB9IGZyb20gJy4uLy4uL3Byb3ZpZGVycy9pY29uLnByb3ZpZGVyJztcclxuaW1wb3J0IHsgSWNvbk5hbWUgfSBmcm9tICcuLi8uLi90eXBlcy9pY29uLW5hbWVzLnR5cGUnO1xyXG5cclxuY29uc3QgREVGQVVMVF9TSVpFID0gMTY7XHJcbmNvbnN0IE1FU1NBR0UgPSB7XHJcbiAgaWNvbk5vdEZvdW5kOiAnSWNvbiBub3QgZm91bmQnLFxyXG59O1xyXG5cclxuZW51bSBEaW1lbnNpb25UeXBlIHtcclxuICBXaWR0aCA9ICd3aWR0aCcsXHJcbiAgSGVpZ2h0ID0gJ2hlaWdodCcsXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBCb290c3RyYXAgaWNvbiBjb21wb25lbnQuXHJcbiAqL1xyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2ktYnMsICpbaS1ic10nLFxyXG4gIHRlbXBsYXRlOiAnPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PicsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ3hCb290c3RyYXBJY29uc0xpYkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XHJcbiAgLyoqIEljb24gbmFtZS4gKi9cclxuICBASW5wdXQoKVxyXG4gIHB1YmxpYyBuYW1lITogSWNvbk5hbWVzRW51bSB8IEljb25OYW1lO1xyXG5cclxuICAvKiogSWNvbiB3aWR0aC4gKi9cclxuICBASW5wdXQoKVxyXG4gIHB1YmxpYyB3aWR0aCE6IHN0cmluZztcclxuXHJcbiAgLyoqIEljb24gaGVpZ2h0LiAqL1xyXG4gIEBJbnB1dCgpXHJcbiAgcHVibGljIGhlaWdodCE6IHN0cmluZztcclxuXHJcbiAgLyoqIFJlbW92ZXMgZGVmYXVsdCBkaW1lbnNpb25zIGZyb20gc3ZnLiAqL1xyXG4gIEBJbnB1dCgpXHJcbiAgcHVibGljIHJlc2V0RGVmYXVsdERpbWVuc2lvbnMgPSBmYWxzZTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIF9lbGVtOiBFbGVtZW50UmVmLFxyXG4gICAgcHJpdmF0ZSBfY2hhbmdlRGV0ZWN0b3I6IENoYW5nZURldGVjdG9yUmVmLFxyXG4gICAgQEluamVjdChJY29ucykgcHJpdmF0ZSBfaWNvbnM6IEljb25zLFxyXG4gICAgQEluamVjdChNT0RVTEVfQ09ORklHX1RPS0VOKSBwcml2YXRlIF9jb25maWc6IElNb2R1bGVDb25maWdPcHRpb25zLFxyXG4gICkge1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogT25DaGFuZ2VzIGV2ZW50LlxyXG4gICAqXHJcbiAgICogQHBhcmFtIGNoYW5nZXMgU2ltcGxlQ2hhbmdlc1xyXG4gICAqL1xyXG4gIHB1YmxpYyBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XHJcbiAgICAvLyBpY29ucyBhcmUgcHJvdmlkZWQgYXMgYW4gYXJyYXkgb2Ygb2JqZWN0cyBiZWNhdXNlIG9mIFwibXVsdGk6IHRydWVcIlxyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcclxuICAgIGNvbnN0IGljb25zID0gT2JqZWN0LmFzc2lnbih7fSwgLi4uKHRoaXMuX2ljb25zIGFzIGFueSBhcyBvYmplY3RbXSkpO1xyXG4gICAgbGV0IHN2ZyA9IGljb25zW3RvQ2FtZWxDYXNlKGNoYW5nZXMubmFtZS5jdXJyZW50VmFsdWUpXSB8fCAnJztcclxuXHJcbiAgICBpZiAoIXN2Zykge1xyXG4gICAgICB0aGlzLl9sb2dNZXNzYWdlKHRoaXMuX3NldEljb25NZXNzYWdlKE1FU1NBR0UuaWNvbk5vdEZvdW5kLCBjaGFuZ2VzLm5hbWUuY3VycmVudFZhbHVlKSk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBpZiBjb25maWcgcHJvdmlkZWRcclxuICAgIGlmICh0aGlzLl9jb25maWcpIHtcclxuICAgICAgaWYgKHRoaXMuX2NvbmZpZy53aWR0aCkge1xyXG4gICAgICAgIHN2ZyA9IHN2Zy5yZXBsYWNlKFxyXG4gICAgICAgICAgdGhpcy5fc2V0U2l6ZShEaW1lbnNpb25UeXBlLldpZHRoKSxcclxuICAgICAgICAgIHRoaXMuX3NldFNpemUoXHJcbiAgICAgICAgICAgIERpbWVuc2lvblR5cGUuV2lkdGgsXHJcbiAgICAgICAgICAgIHRoaXMuX2NvbmZpZy53aWR0aCxcclxuICAgICAgICAgICksXHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHRoaXMuX2NvbmZpZy5oZWlnaHQpIHtcclxuICAgICAgICBzdmcgPSBzdmcucmVwbGFjZShcclxuICAgICAgICAgIHRoaXMuX3NldFNpemUoRGltZW5zaW9uVHlwZS5IZWlnaHQpLFxyXG4gICAgICAgICAgdGhpcy5fc2V0U2l6ZShcclxuICAgICAgICAgICAgRGltZW5zaW9uVHlwZS5IZWlnaHQsXHJcbiAgICAgICAgICAgIHRoaXMuX2NvbmZpZy5oZWlnaHQsXHJcbiAgICAgICAgICApLFxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICh0aGlzLl9jb25maWcudGhlbWUpIHtcclxuICAgICAgICB0aGlzLl9lbGVtLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmFkZCh0aGlzLl9jb25maWcudGhlbWUpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMucmVzZXREZWZhdWx0RGltZW5zaW9ucykge1xyXG4gICAgICBzdmcgPSBzdmcucmVwbGFjZSh0aGlzLl9zZXRTaXplKERpbWVuc2lvblR5cGUuV2lkdGgpLCAnJyk7XHJcbiAgICAgIHN2ZyA9IHN2Zy5yZXBsYWNlKHRoaXMuX3NldFNpemUoRGltZW5zaW9uVHlwZS5IZWlnaHQpLCAnJyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMud2lkdGggJiYgc3ZnLmluY2x1ZGVzKERpbWVuc2lvblR5cGUuV2lkdGgpKSB7XHJcbiAgICAgIHN2ZyA9IHN2Zy5yZXBsYWNlKFxyXG4gICAgICAgIHRoaXMuX3NldFNpemUoRGltZW5zaW9uVHlwZS5XaWR0aCksXHJcbiAgICAgICAgdGhpcy5fc2V0U2l6ZShcclxuICAgICAgICAgIERpbWVuc2lvblR5cGUuV2lkdGgsXHJcbiAgICAgICAgICB0aGlzLndpZHRoLFxyXG4gICAgICAgICksXHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuaGVpZ2h0ICYmIHN2Zy5pbmNsdWRlcyhEaW1lbnNpb25UeXBlLkhlaWdodCkpIHtcclxuICAgICAgc3ZnID0gc3ZnLnJlcGxhY2UoXHJcbiAgICAgICAgdGhpcy5fc2V0U2l6ZShEaW1lbnNpb25UeXBlLkhlaWdodCksXHJcbiAgICAgICAgdGhpcy5fc2V0U2l6ZShcclxuICAgICAgICAgIERpbWVuc2lvblR5cGUuSGVpZ2h0LFxyXG4gICAgICAgICAgdGhpcy5oZWlnaHQsXHJcbiAgICAgICAgKSxcclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9lbGVtLm5hdGl2ZUVsZW1lbnQuaW5uZXJIVE1MID0gc3ZnO1xyXG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3IubWFya0ZvckNoZWNrKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9zZXRTaXplID0gKHR5cGU6IERpbWVuc2lvblR5cGUsIHNpemU6IG51bWJlciB8IHN0cmluZyA9IERFRkFVTFRfU0laRSk6IHN0cmluZyA9PiBgJHt0eXBlfT1cIiR7c2l6ZX1cImA7XHJcblxyXG4gIHByaXZhdGUgX3NldEljb25NZXNzYWdlID0gKG1lc3NhZ2U6IHN0cmluZywgaWNvbjogc3RyaW5nKTogc3RyaW5nID0+IGAke21lc3NhZ2V9OiAke2ljb259XFxuYDtcclxuXHJcbiAgcHJpdmF0ZSBfbG9nTWVzc2FnZSA9IChtZXNzYWdlOiBzdHJpbmcpOiB2b2lkID0+IGNvbnNvbGUud2FybihtZXNzYWdlKTtcclxufVxyXG4iXX0=