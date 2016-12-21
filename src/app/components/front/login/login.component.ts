import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {Http, Response, Headers} from '@angular/http';
import {Router} from "@angular/router";
declare var $: any;

import '../../../../assets/js/plugins/iCheck/square/blue.css';
import '../../../../assets/js/plugins/iCheck/icheck.js';

@Component({
    templateUrl: 'login.html'
})

export class LoginComponent implements OnInit {
    form: FormGroup;
    loading: boolean = false;

    constructor(
        private http: Http,
        private router: Router
    ) {
    }

    ngOnInit() {
        $('body').addClass('login-page');
        $('input').iCheck({
            checkboxClass: 'icheckbox_square-blue',
            radioClass: 'iradio_square-blue',
            increaseArea: '20%'
        });
        this.buildForm();
    }

    buildForm() {
        this.form = new FormGroup({
            email: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required])
        });
    }

    onSubmit() {
        this.loading = true;
        let data = $.param(this.form.value);
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        this.http.post(process.env.apiUrl + '/master-service/v1/login', data, {headers: headers})
            .map((response: Response) => response.json())
            .subscribe(
                res => {
                    this.loading = false;
                    if (res.data.token) {
                        localStorage.setItem('id_token', res.data.token);
                        this.router.navigate(['']);
                    }
                },
                error => {
                    this.loading = false;
                    console.log(error);
                },
            );
    }
}