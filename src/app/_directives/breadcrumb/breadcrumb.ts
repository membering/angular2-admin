import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRouteSnapshot, UrlSegment} from "@angular/router";

@Component({
    selector: 'breadcrumb',
    templateUrl: 'breadcrumb.html'
})
export class BreadcrumbDirective implements OnInit {
    breadcrumbs: {
        name: string;
        url: string
    }[] = [];

    constructor(
        private router: Router
    ) {}

    ngOnInit() {
        this.router.events.subscribe(event => {
            this.breadcrumbs = [];
            this.parseRoute(this.router.routerState.snapshot.root);
        })
    }

    parseRoute(node: ActivatedRouteSnapshot) {
        if (node.data['name']) {
            let urlSegments: UrlSegment[] = [];
            node.pathFromRoot.forEach(routerState => {
                urlSegments = urlSegments.concat(routerState.url);
            });
            let url = urlSegments.map(urlSegment => {
                return urlSegment.path;
            }).join('/');
            this.breadcrumbs.push({
                name: node.data['name'],
                url: '/' + url
            });
        }
        if (node.firstChild) {
            this.parseRoute(node.firstChild);
        }
    }
}