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
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzListModule } from 'ng-zorro-antd/list';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';

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
    NzCollapseModule,
    MatButtonModule,
    NzUploadModule,
    NzMessageModule,
    NzSwitchModule,
    NzCheckboxModule,
    NzCardModule,
    MatExpansionModule,
    MatTabsModule,
    MatIconModule,  
    NzListModule,  
    NzGridModule,
    NzButtonModule,
    NzSelectModule, 
    FormsModule,
    NzFormModule,
    CommonModule,
    MatCardModule,
    NzDividerModule,
    NzInputModule,
    MatTableModule,
    NzIconModule,
    RouterModule.forChild(routes),
  ],
})
export class ProjectModule {}
