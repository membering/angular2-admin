import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Http, Response} from '@angular/http';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {ToastyService} from 'ng2-toasty';
declare const $: any;

import '../../../../assets/js/plugins/iCheck/square/blue.css';
import '../../../../assets/js/plugins/iCheck/icheck.js';

@Component({
    templateUrl: 'register.html'
})

export class RegisterComponent implements OnInit {
    form: FormGroup;
    submitted: boolean = false;
    loading: boolean = false;

    constructor(
        private http: Http,
        private router: Router,
        private toastyService: ToastyService,
    ) {
    }

    ngOnInit() {
        localStorage.clear();
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
            name: new FormControl('', [Validators.required]),
            email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$')]),
            pwd: new FormControl('', [Validators.required]),
            phone: new FormControl('', [Validators.required])
        });
    }

    onSubmit() {
        this.submitted = true;
        if (this.form.valid) {
            this.loading = true;
            this.http.post(process.env.apiUrl + '/account/register', this.form.value)
                .map((res: Response) => res.json())
                .subscribe(
                    res => {
                        this.loading = false;
                        if (res.code === 200) {
                            if (res.data.token) {
                                localStorage.setItem('id_token', res.data.token);
                                this.router.navigate(['']);
                            }
                        }
                        else {
                            this.toastyService.error(res.message);
                        }
                    },
                    err => {
                        this.loading = false;
                        console.log(err);
                    },
                );
        }
    }
}