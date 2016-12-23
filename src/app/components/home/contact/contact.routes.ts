import { Routes } from '@angular/router';
import { ContactComponent } from './index';
import { ListComponent } from './list/index';
import { DetailComponent, CreateComponent } from './action/index';

export const contactRoutes: Routes = [
    {
        path: 'contact',
        component: ContactComponent,
        data: { name: 'Contact' },
        children: [
            { path: '', redirectTo: 'list', pathMatch: 'full' },
            { path: 'create', component: CreateComponent, data: { name: 'Create' } },
            { path: 'list', component: ListComponent, data: { name: 'List' } },
            { path: 'detail/:id', component: DetailComponent, data: { name: 'Detail' } },
        ]
    }
];