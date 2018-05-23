import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()

export class ImportService {

     //---------------------------------------------------------------------------------------------
     //---------------------------------------------------------------------------------------------
     constructor() {}
    
    //---------------------------------------------------------------------------------------------
    //---------------------------------------------------------------------------------------------
    // map csv file data
    map_csv_data(a_sCommaSeparatedData) {
        var xJsonResult = [];
        let iRows = a_sCommaSeparatedData.split("\n");

        for (var i = 0; i < iRows.length - 1; i++) {
        
            var sCSVRowData = iRows[i].replace(/"/g, "");
            var xRow = {};
            var xCells = sCSVRowData.split(',');
           
            for(let i = 0; i<= xCells.length-1; i++){
                var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if(regex.test(xCells[i]) == true){
                    xJsonResult.push(xCells[i]);
                }
            }
           
        }
        return xJsonResult;
    }
    //---------------------------------------------------------------------------------------------
    //---------------------------------------------------------------------------------------------
    map_xlsx_data(a_sData) {
        var xJsonResult = [];

        for (var i = 0; i < a_sData.length - 1; i++) {
            let data = a_sData[i];
            for(let j = 0; j <= data.length-1; j++){
                var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if(regex.test(data[j]) == true){
                    xJsonResult.push(data[j]);
                }
            } 
        }
        return xJsonResult;
    }
    //---------------------------------------------------------------------------------------------
    //---------------------------------------------------------------------------------------------
}

