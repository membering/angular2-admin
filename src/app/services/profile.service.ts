import {Injectable} from '@angular/core';
import {HttpClient} from '../_libraries/http.client';

@Injectable()
export class ProfileService {
    constructor(
        private http: HttpClient
    ) {}

    getProfile() {
        return this.http.post('/supplier/profile');
    }

    editProfile(params: any) {
        return this.http.post('/supplier/profile/save', params);
    }
}