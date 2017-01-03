import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRouteSnapshot} from '@angular/router';
import {Title} from '@angular/platform-browser';

import '../../../assets/less/skins/_all-skins.less';
import '../../../assets/js/app.js';
import '../../../assets/js/demo.js';

@Component({
    templateUrl: 'home.html'
})
export class HomeComponent implements OnInit {
    title: string;
    currentTitle: string;

    constructor(
        private router: Router,
        private titleService: Title
    ) {}

    ngOnInit() {
        this.currentTitle = this.titleService.getTitle();
        this.router.events
            .subscribe(
                () => {
                    this.parseRoute(this.router.routerState.snapshot.root);
                }
            );
    }

    parseRoute(node: ActivatedRouteSnapshot) {
        if (node.data['name']) {
            this.title = node.data['name'];
            this.titleService.setTitle(this.currentTitle + ' - ' + node.data['name'].toUpperCase());
        }
        if (node.firstChild) {
            this.parseRoute(node.firstChild);
        }
    }
}