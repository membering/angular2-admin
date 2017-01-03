import {Component} from '@angular/core';
import {ToastyConfig} from 'ng2-toasty';

@Component({
    selector: 'app',
    template: `<ng2-toasty></ng2-toasty><router-outlet></router-outlet>`
})
export class AppComponent {
    constructor(
        private toastyConfig: ToastyConfig
    ) {
        // this.toastyConfig.timeout = 0;
        this.toastyConfig.position = 'top-right';
    }
}