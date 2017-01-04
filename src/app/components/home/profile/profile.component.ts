import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {ToastyService} from 'ng2-toasty';
import {Util} from '../../../_libraries/util';
import {CommonService, ProfileService} from '../../../services/index';
declare const $:any;

@Component({
    templateUrl: 'profile.component.html',
    providers: [CommonService, ProfileService]
})

export class ProfileComponent implements OnInit {
    form: FormGroup;
    submitted: boolean = false;
    data: any = [];
    categories: any = [];
    cities: any = [];
    districts: any = [];
    images: any = [];

    constructor(
        private util: Util,
        private fb: FormBuilder,
        private toastyService: ToastyService,
        private service: ProfileService,
        private commonService: CommonService
    ) {}

    ngOnInit() {
        this.buildForm();
        this.loadProfile();
        this.loadCategories();
        this.loadCities();
        this.loadDistricts();
    }

    buildForm() {
        this.form = this.fb.group({
            name: ['', [Validators.required]],
            phone: ['', [Validators.required]],
            web: ['', [Validators.required]],
            openingtime: ['', [Validators.required]],
            bio: ['', [Validators.required]],
            field: ['', [Validators.required]],
            address: this.fb.array([])
        });
    }

    fileChange(event: any, target: string) {
        if (target == 'avatar') {
            let reader = new FileReader();
            reader.onload = () => {
                this.data.supp_avatar = reader.result;
                this.form.addControl('avatar', new FormControl(reader.result));
            };
            reader.readAsDataURL(event.target.files[0]);
        }
        if (target == 'images') {
            for (let i = 0; i < event.target.files.length; i++) {
                let reader = new FileReader();
                reader.onload = () => {
                    this.data.images.push({
                        image: reader.result
                    });
                    this.images.push(reader.result);
                };
                reader.readAsDataURL(event.target.files[i]);
            }
            this.form.addControl('images', new FormControl(this.images));
        }
    }

    removeImage(id: number, index: number) {
        if (typeof id !== 'undefined') {
            let params = {
                id: id
            };
            this.service.removeImage(params)
                .subscribe(
                    res => {
                        if (res.code === 200) {
                            this.data.images.forEach((v: any, i: any) => {
                                if (v.id == id) {
                                    this.data.images.splice(i, 1);
                                }
                            })

                        }
                        else {
                            this.toastyService.error(res.message);
                        }
                    }
                );
        }
        else {
            this.data.images.splice(index, 1);
            this.images.splice(index, 1);
        }
        $('#images').val('');
    }

    initAddress() {
        return this.fb.group({
            address: ['', [Validators.required]],
            city_id: ['', [Validators.required]],
            district_id: ['', [Validators.required]]
        });
    }

    addAddress() {
        (<FormArray>this.form.controls['address']).push(this.initAddress());
    }

    removeAddress(i: number) {
        (<FormArray>this.form.controls['address']).removeAt(i);
    }

    loadProfile() {
        this.service.getProfile()
            .subscribe(
                res => {
                    this.data = res.data;
                    this.data.address = JSON.parse(this.data.address);
                    this.data.supp_address = JSON.parse(this.data.supp_address);
                    this.form.patchValue({
                        name: this.data.supp_name,
                        phone: this.data.supp_phone,
                        web: this.data.supp_web,
                        openingtime: this.data.supp_openingtime,
                        bio: this.data.supp_bio,
                        field: this.data.supp_field
                    });
                    this.data.address.map((v: any, i: any) => {
                        (<FormArray>this.form.controls['address']).setControl(i,
                            this.fb.group({
                                address: [v.address, [Validators.required]],
                                city_id: [v.city_id, [Validators.required]],
                                district_id: [v.district_id, [Validators.required]],
                            })
                        );
                    });
                }
            );
    }

    loadCategories() {
        this.commonService.getCategories().subscribe(res => this.categories = res.data.data);
    }

    loadCities() {
        this.commonService.getCities().subscribe(res => this.cities = res.data.data);
    }

    loadDistricts() {
        this.commonService.getDistricts().subscribe(res => this.districts = res.data.data);
    }

    onSubmit() {
        this.submitted = true;
        if (this.form.valid) {
            let formData = new FormData();
            for (let key in this.form.value) {
                if (key == 'address') {
                    formData.append(key, JSON.stringify(this.form.value[key]));
                }
                else if (key == 'avatar') {
                    formData.append('avatar', this.util.dataURItoBlob(this.form.value['avatar']));
                }
                else if (key == 'images') {
                    this.form.value['images'].forEach((v: any, i: any) => {
                        formData.append('images', this.util.dataURItoBlob(v));
                    })
                }
                else formData.append(key, this.form.value[key]);
            }
            this.service.editProfile(formData)
                .subscribe(
                    res => {
                        if (res.code === 200) {
                            this.submitted = false;
                            this.buildForm();
                            this.loadProfile();
                        }
                        else {
                            this.toastyService.error(res.message);
                        }
                    }
                );
        }
    }
}