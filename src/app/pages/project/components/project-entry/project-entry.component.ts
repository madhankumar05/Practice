import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { mlAmenityMaster, mlDistrictMaster, mlNearByPlace, mlProjectMaster, mlPropertyMaster, mlSlideImageMaster, mlStateMaster, mlVideoLink } from '../../models/ml-project';
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
  lstVideoLink: mlVideoLink[];

   public NearByPlaceColumns: string[] = ['#', 'NearByPlace','Action']; 
   dataSourceNearByPlaceMaster: MatTableDataSource<mlNearByPlace>;
   
   public AmenityMasterColumns: string[] = ['#', 'Amenities','Action']; 
   dataSourceAmenityMaster: MatTableDataSource<mlAmenityMaster>; 

   public VideoLinkColumns: string[] = ['#', 'Link','Action']; 
   dataSourceVideoLink: MatTableDataSource<mlVideoLink>; 
    
   ProfileImageUrl?: string;
  selectedValue = null;
  checked = false;  

  /**
   * Contact profile
   */
  fileUploadAPIUrl: string;
  saveFileList: any = [];

  constructor(private _cd: ChangeDetectorRef, private srvProject: ProjectService, private msg: NzMessageService) {
      this.objProjectMaster=new mlProjectMaster();
      this.objStateMaster = new mlStateMaster();
      this.objDistrictMaster = new mlDistrictMaster();
      this.objPropertyMaster =new mlPropertyMaster(); 

      this.lstAmenityMaster = [];
      this.lstNearByPlaceMaster=[];
      this.lstVideoLink = [];

      this.dataSourceNearByPlaceMaster = new MatTableDataSource(); 
      this.dataSourceAmenityMaster = new MatTableDataSource();  
      this.dataSourceVideoLink = new MatTableDataSource();
      
    this.fileUploadAPIUrl = "https://localhost:5001/items/upload";
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
      this.objProjectMaster.lstAmenityMaster = this.lstAmenityMaster;
      this.objProjectMaster.lstNearByPlaceMaster = this.lstNearByPlaceMaster;
      // this.objProjectMaster.lstSlideImageMaster = this. 
      this.objProjectMaster.lstVideoLink = this.lstVideoLink;        
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

/**
 * Contact image handler
 */

 handleContactImgChange(info: { file: NzUploadFile }): void {
   debugger;
  const status = info.file.status;

  if (status !== "uploading") {
  }
  if (status === "done") {
      let index = this.saveFileList.findIndex((x: { uid: string; }) => x.uid === info.file.uid);
      let path = info.file.response.data;
      let name = path.substr(path.indexOf("/") + 1);
      this.saveFileList[index]["db_url"] = path;
      this.saveFileList[index]["name"] = name;
      this.saveFileList[index]["isdeleted"] = false;
      this.saveFileList[index]["isPrimaryImg"] = true;
      this.saveFileList[index]["url"] = this.saveFileList[index][
          "thumbUrl"
      ] =  path;

      // this.prodPackData.lstImg.push(this.saveFileList[index]);
      this.msg.success(`File uploaded successfully...!`);
  } else if (status === "error") {
      this.msg.error(`File upload failed...!`);
  }
}

deleteImg = (info: { file: NzUploadFile }) => {
  console.log(info.file);
  const status = info.file.status;
  console.log(status);
  // if (status === "removed") {
  //     let delindex = this.prodPackData.lstImg.findIndex(
  //         x => x.uid === file.uid
  //     );
  //     this.prodPackData.lstImg[delindex]["isdeleted"] = true;
  //     this.saveFileList = this.prodPackData.lstImg.filter(
  //         x => x.isdeleted === false
  //     );
  //     this._cd.markForCheck();
  // }
  // console.log(this.prodPackData.lstImg);
  console.log(this.saveFileList);
};

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

DeleteVideoLink(value?: string):void{
  this.lstVideoLink = this.lstVideoLink?.filter(data=> data.VideoLink !== value);
  this.dataSourceVideoLink = new MatTableDataSource(this.lstVideoLink);  
}

NearByPlace: string = '';
AddNearByPlace(){
 let objNearByPlace = new mlNearByPlace();
 objNearByPlace.NearByPlace = this.NearByPlace;
  this.lstNearByPlaceMaster.push(objNearByPlace)
  this.dataSourceNearByPlaceMaster = new MatTableDataSource(this.lstNearByPlaceMaster);
  this.NearByPlace = '';
  this._cd.detectChanges();
  
}

Amenities: string = '';
AddAmenities(){
  let objAmenities = new mlAmenityMaster();
  objAmenities.Amenity = this.Amenities;
  this.lstAmenityMaster.push(objAmenities);  
  this.dataSourceAmenityMaster = new MatTableDataSource(this.lstAmenityMaster);
  this.Amenities = '';
  this._cd.markForCheck();
}

VideoLink = '';
AddVideoLink(){
  let objAmenities = new mlVideoLink();
  objAmenities.VideoLink = this.VideoLink;
  this.lstVideoLink.push(objAmenities);
  this.dataSourceVideoLink = new MatTableDataSource(this.lstVideoLink);  
  this.VideoLink='';
  this._cd.markForCheck();
}

numberOnly(event: any): boolean {
  const charCode = (event.which) ? event.which : event.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    return false;
  }
  return true;
}

keyPressAlpha(event: any) {

  var inp = String.fromCharCode(event.keyCode);

  if (/[a-zA-Z ]/.test(inp)) {
    return true;
  } else {
    event.preventDefault();
    return false;
  }
}

// Only AlphaNumeric
keyPressAlphanumeric(event: any) {

  var inp = String.fromCharCode(event.keyCode);

  if (/[a-zA-Z0-9. /-]/.test(inp)) {
    return true;
  } else {
    event.preventDefault();
    return false;
  }
}
// Only AlphaNumeric
AlphanumericAmenities(event: any) {

  var inp = String.fromCharCode(event.keyCode);

  if (/[a-zA-Z0-9 ]/.test(inp)) {
    return true;
  } else {
    event.preventDefault();
    return false;
  }
}
}
