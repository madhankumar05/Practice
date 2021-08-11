import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { EntryComponent } from './components/entry/entry.component';
import { RouterModule, Routes } from '@angular/router';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { FormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';

const routes: Routes = [{ path: '', component: RegisterComponent }];

@NgModule({
  declarations: [RegisterComponent, EntryComponent],
  imports: [
    NzFormModule,
    NzInputModule,
    NzGridModule,
    FormsModule,
    CommonModule,
    RouterModule.forChild(routes),
  ],
})
export class RegisterModule {}
