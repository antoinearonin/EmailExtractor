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
                var regex = /[a-z0-9!#$%&'*+=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
                var xCellData = xCells[i];
                var m;
                 do {
                      m = regex.exec(xCellData);
                      if (m) {
                      xJsonResult.push(m[0]);
                    }
                } while (m);
            } 
        }
        xJsonResult.sort((a,b) => 0 - (a > b ? -1 : 1));
        return xJsonResult;
    }
    //---------------------------------------------------------------------------------------------
    //---------------------------------------------------------------------------------------------
    map_xlsx_data(a_sData) {

        var xJsonResult = [];
        for (var i = 0; i < a_sData.length; i++) {
            let data = a_sData[i];
            for(let j = 0; j <= data.length-1; j++) {
                var regex = /[a-z0-9!#$%&'*+=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
                var xCellData = data[j];
                var m;
                 do {
                      m = regex.exec(xCellData);
                      if (m) {
                      xJsonResult.push(m[0]);
                    }
                } while (m);
            } 
        }
        xJsonResult.sort((a,b) => 0 - (a > b ? -1 : 1));
        return xJsonResult;
    }
    //---------------------------------------------------------------------------------------------
    //---------------------------------------------------------------------------------------------
}

