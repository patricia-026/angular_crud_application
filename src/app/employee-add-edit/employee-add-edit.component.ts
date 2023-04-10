import { Component, OnInit, Inject } from '@angular/core';
import { EmployeeService } from '../service/employee.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DepartmentService } from '../service/department.service';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-employee-add-edit',
  templateUrl: './employee-add-edit.component.html',
  styleUrls: ['./employee-add-edit.component.scss']
})
export class EmployeeAddEditComponent implements OnInit {
  employeeForm!: FormGroup;

  constructor (
    private _fb: FormBuilder, 
    private _employeeService: EmployeeService,
    private _departmentService: DepartmentService,
    private _dialogRef: MatDialogRef<EmployeeAddEditComponent>,
    private _coreService: CoreService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.employeeForm = this._fb.group({
      name: ['', [Validators.required]],
      birthday: ['', [Validators.required]],
      department: [this._departmentService.selectedDepartmentId, [Validators.required]]
    });
  }


  ngOnInit(): void {
    this.employeeForm.patchValue(this.data);
  }


  onFormSubmit(){
    if(this.employeeForm.valid){
       if(this.data){
        this._employeeService
        .updateEmployee(this.data.id, this.employeeForm.value)
        .subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Employee updated successfully!');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.log(err);
          }
        });
      }
      else{ 

      
      this._employeeService.addEmployee(this.employeeForm.value).subscribe({
        next: (val: any) => {
          this._coreService.openSnackBar('Employee added successfully');
          this._dialogRef.close(true);
        },
        error: (err: any) => {
          console.log(err);
        }
      });
    }
    }
  }
}

