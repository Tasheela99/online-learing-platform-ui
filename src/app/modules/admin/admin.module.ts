import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatLabel
  ]
})
export class AdminModule {
}
