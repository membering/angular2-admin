import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {Util} from '../../../_libraries/util';
import {CommonService, ProfileService} from '../../../services/index';

@Component({
    templateUrl: 'profile.component.html',
    providers: [CommonService, ProfileService]
})

export class ProfileComponent implements OnInit {
    form: FormGroup;
    title: string;
    data: any = [];
    categories: any = [];
    cities: any = [];
    districts: any = [];

    constructor(
        private util: Util,
        private fb: FormBuilder,
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
                    this.data.images.push(reader.result);
                };
                reader.readAsDataURL(event.target.files[i]);
            }
            this.form.addControl('images', new FormControl(this.data.images));
        }
    }

    initAddress() {
        return this.fb.group({
            address: ['', [Validators.required]],
            city_id: ['', [Validators.required]],
            district_id: ['', [Validators.required]]
        });
    }

    addAddress() {
        let control = <FormArray>this.form.controls['address'];
        control.push(this.initAddress());
    }

    removeAddress(i: number) {
        let control = <FormArray>this.form.controls['address'];
        control.removeAt(i);
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
        console.log(this.form);
        let formData = new FormData();
        for (let key in this.form.value) {
            if (key == 'address') {
                formData.append(key, JSON.stringify(this.form.value[key]));
            }
            else if (key == 'avatar') {
                formData.append(key, this.util.dataURItoBlob(this.form.value[key]));
            }
            else if (key == 'images') {
                this.form.value[key].forEach((v: any,i: any) => {
                    formData.append('images['+i+']', this.util.dataURItoBlob(v));
                })
            }
            else formData.append(key, this.form.value[key]);
        }
        this.service.editProfile(formData)
            .subscribe(
                res => {
                    console.log(res);
                    if (res.code === 200) {

                    }
                    else {

                    }
                }
            );
    }
}