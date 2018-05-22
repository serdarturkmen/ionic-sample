import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';

@Injectable()
export class GlobalService {
    isLargeScreen: boolean = false;

    constructor(public platform: Platform) { }

    getDeviceType() {
        let width = screen.width;

        if (width > 576) {
            return 'large';
        } else {
            return 'mobile';
        }
    }

    getDeviceView() {
        return this.isLargeScreen;
    }
}