import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectComponent } from './project.component';
import { ProjectEntryComponent, ProjectListComponent } from './components';
import { RouterModule, Routes } from '@angular/router';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzCardModule } from 'ng-zorro-antd/card';
import { FormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { MatCardModule } from '@angular/material/card';
import { NzDividerModule } from 'ng-zorro-antd/divider';

const routes: Routes = [
  {
    path: '',
    component: ProjectEntryComponent,
  },
  { path: 'project-list', component: ProjectListComponent },
];

@NgModule({
  declarations: [ProjectComponent, ProjectListComponent, ProjectEntryComponent],
  imports: [
    NzCardModule,
    NzGridModule,
    NzButtonModule,
    FormsModule,
    NzFormModule,
    CommonModule,
    MatCardModule,
    NzDividerModule,
    NzIconModule,
    RouterModule.forChild(routes),
  ],
})
export class ProjectModule {}
