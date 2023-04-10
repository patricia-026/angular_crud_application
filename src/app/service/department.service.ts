import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(
    private _http: HttpClient
  ) { }

  selectedDepartmentId!: number;

  setSelectedDepartmentId(id: number){
    this.selectedDepartmentId = id;
  }

  getDepartments(): Observable<any>{
    return this._http.get('http://localhost:3000/api/department');
  }

  getSelectedDepartment(selectedDepartmentId: number): Observable<any>{
    let param = new HttpParams().set('id', selectedDepartmentId);
    return this._http.get('http://localhost:3000/api/department/'+selectedDepartmentId, {params: param});
  }
}
