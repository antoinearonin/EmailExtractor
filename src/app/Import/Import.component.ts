﻿import { Component } from '@angular/core';
import { RequestOptions, Headers, } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { FormGroup, FormControl,Validators,FormBuilder } from '@angular/forms';
import { SweetAlertService } from 'angular-sweetalert-service';
import { ImportService } from '../service/Import.service';
import { Angular5Csv } from 'angular5-csv/Angular5-csv';
import * as XLSX from 'xlsx';
import { read, write, utils } from 'xlsx'


@Component({
    selector: 'import',
    templateUrl: './Import.component.html',
    styleUrls: ['./Import.component.css']
})

export class ImportComponent {

     private static xFileList: FileList;
     public xEmailsList: any[];
     public xImportForm: FormGroup;
     private xImportFile:FileList;
     public xShowSpinner:any = false;
     public xShowTable:any = false;
     public xRecordCount:any;
     private xData:any;
     private xEvent:any;
     
     //---------------------------------------------------------------------------------------------
     //---------------------------------------------------------------------------------------------
     constructor(private m_xAlertService: SweetAlertService, private xImportService: ImportService) {
         this.xEmailsList = [];
         this.ValidateFile();
         const { read, utils: { sheet_to_json } } = XLSX;
     }
    //---------------------------------------------------------------------------------------------
    //---------------------------------------------------------------------------------------------
    //  File related validation 
    private ValidateFile() {
    let pattern = {
        import: '.*\.\(xlsx\|csv\)',
    }

    this.xImportForm = new FormGroup({
        Import: new FormControl("", [Validators.required, Validators.pattern(pattern.import)])
    });
   }
    //---------------------------------------------------------------------------------------------
    //---------------------------------------------------------------------------------------------
    onFileChange(event) {
        this.xShowTable = false;
        this.xEvent = event;
        this.xImportFile = event.target.files;
    }
    //---------------------------------------------------------------------------------------------
    //---------------------------------------------------------------------------------------------
    uploadFile() {

        let xFileName = this.xImportFile[0].name;
        let xFileExtension = xFileName.substr(xFileName.lastIndexOf('.')+1);
        if(xFileExtension == 'csv'){
            this.xShowSpinner = true;
            
            ImportComponent.xFileList = this.xImportFile;
            if (this.xImportForm.valid) {
                let xFileReader = new FileReader();
                xFileReader.readAsText(ImportComponent.xFileList[0], "UTF-8");
                xFileReader.onload = () => {
                    //convert comma saperated text to Json Array 
                   
                    this.xEmailsList = this.xImportService.map_csv_data(xFileReader.result);
                    this.xEmailsList = this.xEmailsList.filter((x, i, a) => x && a.indexOf(x) === i);
                    this.xRecordCount = this.xEmailsList.length;
                    this.xShowSpinner = false;
                    this.xShowTable = true;
                };
            }
            else {
                this.xEmailsList = [];
                this.xShowSpinner = false;
                this.xShowTable = true;
            }
        }
        else if(xFileExtension == 'xlsx'){
            this.xShowSpinner = true;
            if (this.xImportForm.valid) {
                const target: DataTransfer = <DataTransfer>(this.xEvent.target);
                if (target.files.length !== 1) throw new Error('Cannot use multiple files');
               
                const xReader: FileReader = new FileReader();
                xReader.onload = (e: any) => {
                  /* read workbook */

                  const xResult: string = e.target.result;
                  const xWorkbook: XLSX.WorkBook = XLSX.read(xResult, {type: 'binary'});
            
                  /* grab first sheet */
            
                  const xWorkbookName: string = xWorkbook.SheetNames[0];
                  const xWorkSheet: XLSX.WorkSheet = xWorkbook.Sheets[xWorkbookName];
            
                  /* save data */
                  this.xData = XLSX.utils.sheet_to_json(xWorkSheet, {header: 1});
                  this.xEmailsList = this.xImportService.map_xlsx_data(this.xData);
                  this.xEmailsList = this.xEmailsList.filter((x, i, a) => x && a.indexOf(x) === i);
                  this.xRecordCount = this.xEmailsList.length;
                  this.xShowSpinner = false;
                  this.xShowTable = true;
                };
                xReader.readAsBinaryString(target.files[0]); 
            }
            else{
                this.xEmailsList = [];
                this.xShowSpinner = false;
                this.xShowTable = true;
            }
        }

    }
    // //---------------------------------------------------------------------------------------------
    //---------------------------------------------------------------------------------------------
    DownloadFile(){
        if(this.xEmailsList.length > 0){
            var xData = []
            for(let i=0;i<=this.xEmailsList.length-1;i++){
                xData.push({'EmailAddress':this.xEmailsList[i]})
            }
            var options = { 
                fieldSeparator: ',',
                headers: ["EmailAddress"]
              };
            new Angular5Csv(xData, 'My Report', options);
        }
   }
}