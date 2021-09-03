import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { mlAmenityMaster, mlDistrictMaster, mlNearByPlace, mlProjectMaster, mlPropertyMaster, mlSlideImageMaster, mlStateMaster } from '../../models/ml-project';
import { ProjectService } from '../../services/project.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-project-entry',
  templateUrl: './project-entry.component.html',
  styleUrls: ['./project-entry.component.css'],
})
export class ProjectEntryComponent implements OnInit {
  @ViewChild('FrmProject', { static: false }) FrmProject?: NgForm;
  @ViewChild(MatAccordion) accordion?: MatAccordion;

  objProjectMaster: mlProjectMaster; 
  objStateMaster: mlStateMaster;
  objDistrictMaster: mlDistrictMaster;
  objPropertyMaster:mlPropertyMaster;

  lstAmenityMaster:mlAmenityMaster[];
  lstNearByPlaceMaster:mlNearByPlace[];

   public NearByPlaceColumns: string[] = ['#', 'NearByPlace','Action']; 
   dataSourceNearByPlaceMaster: MatTableDataSource<mlNearByPlace>;
   
   public AmenityMasterColumns: string[] = ['#', 'Amenities','Action']; 
   dataSourceAmenityMaster: MatTableDataSource<mlAmenityMaster>; 
    

  selectedValue = null;
  checked = false;  

  constructor(private _cd: ChangeDetectorRef, private srvProject: ProjectService, private msg: NzMessageService) {
      this.objProjectMaster=new mlProjectMaster();
      this.objStateMaster = new mlStateMaster();
      this.objDistrictMaster = new mlDistrictMaster();
      this.objPropertyMaster =new mlPropertyMaster(); 
      this.lstAmenityMaster = [];
      this.lstNearByPlaceMaster=[];

      this.dataSourceNearByPlaceMaster = new MatTableDataSource(); 
      this.dataSourceAmenityMaster = new MatTableDataSource();  
      
  }

  ngOnInit(): void {
    this.LoadPropertyType();
  }


  LoadState(CountrySysID: number){
      this.srvProject.GetState(CountrySysID).subscribe(res=>{
      console.log(res);
      });
  }
  LoadDistrict(StateSysID: number){
      this.srvProject.GetDistrict(StateSysID).subscribe(res=>{
      console.log(res);
      });
  }
  LoadPropertyType(){
      this.srvProject.GetPropertyType().subscribe(res=>{
      console.log(res);
      });
  }

  CreateProject(){      
     
    if (this.FrmProject?.valid) {         
    console.log(this.objProjectMaster);  
      this.srvProject.CreateProject(this.objProjectMaster).subscribe(res=>{
        console.log(res);      
      }); 
    }    
  }

   private getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result!.toString()));
    reader.readAsDataURL(img);
  }

  loading: boolean = false;
  avatarUrl: string='';
  handleChange(info: { file: NzUploadFile }): void {
    switch (info.file.status) {
      case 'uploading':
        this.loading = true;
        break;
      case 'done':
        // Get this url from response in real world.
        this.getBase64(info.file!.originFileObj!, (img: string) => {
          this.loading = false;
          this.avatarUrl = img;
        });
        break;
      case 'error':
        this.msg.error('Network error');
        this.loading = false;
        break;
    }
}
DeleteNearByPlace(value?: string){
   this.lstNearByPlaceMaster = this.lstNearByPlaceMaster?.filter(data=> data.NearByPlace !== value);
   this.dataSourceNearByPlaceMaster = new MatTableDataSource(this.lstNearByPlaceMaster);
}
DeleteAmenities(value?: string){
  this.lstAmenityMaster = this.lstAmenityMaster?.filter(data=> data.Amenity !== value);
  this.dataSourceAmenityMaster = new MatTableDataSource(this.lstAmenityMaster);  
}

NearByPlace: string = '';
AddNearByPlace(){
 let objNearByPlace = new mlNearByPlace();
 objNearByPlace.NearByPlace = this.NearByPlace;
  this.lstNearByPlaceMaster?.push(objNearByPlace)
  this.dataSourceNearByPlaceMaster = new MatTableDataSource(this.lstNearByPlaceMaster);
  this.NearByPlace = '';
  this._cd.detectChanges();
  
}

Amenities: string = '';
AddAmenities(){
  let objAmenities = new mlAmenityMaster();
  objAmenities.Amenity = this.Amenities;
  this.lstAmenityMaster?.push(objAmenities);  
  this.dataSourceAmenityMaster = new MatTableDataSource(this.lstAmenityMaster);
  this.Amenities = '';
  this._cd.markForCheck();
}
}
