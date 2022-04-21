import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { PayButtonModule } from '../_components/button/pay-button.module';
import { PayModalModule } from '../_components/modal/pay-modal.module';

@NgModule({
    declarations: [
        HomeComponent,
    ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        ReactiveFormsModule,
        PayButtonModule,
        PayModalModule
    ]
})
export class HomeModule { }