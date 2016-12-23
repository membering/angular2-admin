import {Injectable} from '@angular/core';
declare var $: any;

@Injectable()
export class AlertService {
    constructor() {}

    success(message: string) {
        $.notify(message, {
            type: 'success',
            // delay: 1000
        });
    }

    error(message: string) {
        $.notify(message, {
            type: 'danger',
            // delay: 1000
        });
    }
}