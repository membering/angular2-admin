import {Component, OnInit} from '@angular/core';
declare var $: any;

@Component({
    templateUrl: 'dashboard.html'
})
export class DashboardComponent implements OnInit {
    ngOnInit() {
        $('input[type=datetime]').datetimepicker();
    }
}