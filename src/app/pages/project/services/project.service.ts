import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { mlDistrictMaster, mlProjectMaster, mlPropertyMaster, mlStateMaster } from '../models/ml-project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  GetState(CountrySysID: number): Observable<mlStateMaster[]>{
    return this.http.get<mlStateMaster[]>(``);
}

GetDistrict(StateSysID: number): Observable<mlDistrictMaster[]>{
  return this.http.get<mlDistrictMaster[]>(``);
}
GetPropertyType(): Observable<mlPropertyMaster[]>{
  return this.http.get<mlPropertyMaster[]>(``);
}

CreateProject(ProjectData: mlProjectMaster): Observable<string>{
  return this.http.post<string>(``, ProjectData);
}
}
