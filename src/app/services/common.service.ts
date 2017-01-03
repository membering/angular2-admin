import {Injectable} from '@angular/core';
import {HttpClient} from '../_libraries/http.client';

@Injectable()
export class CommonService {
    constructor(
        private http: HttpClient
    ) {}

    getCategories() {
        return this.http.post('/card/categories_list');
    }

    getCities() {
        return this.http.post('/app/cities');
    }

    getDistricts() {
        return this.http.post('/app/districts');
    }
}