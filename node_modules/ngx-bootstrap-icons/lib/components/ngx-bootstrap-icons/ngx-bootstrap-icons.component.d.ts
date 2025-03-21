import { ChangeDetectorRef, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import { IModuleConfigOptions } from '../../config/module.config';
import { IconNamesEnum } from '../../enums/icon-names.enum';
import { Icons } from '../../providers/icon.provider';
import { IconName } from '../../types/icon-names.type';
import * as i0 from "@angular/core";
/**
 * Bootstrap icon component.
 */
export declare class NgxBootstrapIconsLibComponent implements OnChanges {
    private _elem;
    private _changeDetector;
    private _icons;
    private _config;
    /** Icon name. */
    name: IconNamesEnum | IconName;
    /** Icon width. */
    width: string;
    /** Icon height. */
    height: string;
    /** Removes default dimensions from svg. */
    resetDefaultDimensions: boolean;
    constructor(_elem: ElementRef, _changeDetector: ChangeDetectorRef, _icons: Icons, _config: IModuleConfigOptions);
    /**
     * OnChanges event.
     *
     * @param changes SimpleChanges
     */
    ngOnChanges(changes: SimpleChanges): void;
    private _setSize;
    private _setIconMessage;
    private _logMessage;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgxBootstrapIconsLibComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NgxBootstrapIconsLibComponent, "i-bs, *[i-bs]", never, { "name": "name"; "width": "width"; "height": "height"; "resetDefaultDimensions": "resetDefaultDimensions"; }, {}, never, ["*"]>;
}
