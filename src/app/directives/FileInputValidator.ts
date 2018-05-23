import {Directive} from "@angular/core";
import {NG_VALIDATORS, Validator, FormControl} from "@angular/forms";

@Directive({
    selector: "[requireFile]",
    providers: [
        { provide: NG_VALIDATORS, useExisting: FileValidator, multi: true },
    ]
})
export class FileValidator implements Validator {
    static validate(c: FormControl): { [key: string]: any } {
        let FileExtension;
        if (c.value != "" && c.value.length != 0) {
            FileExtension = c.value.split('.');
        }
      
      if(c.value == null || c.value.length == 0){
          return { "required" : true }
      }
      else if (FileExtension[1] != "csv" && FileExtension[1] != "xlsx"){
          return { "invalid" : true}
      }
      else{
         return null;
      }
        
    }

    validate(c: FormControl): {[key: string]: any} {
      return FileValidator.validate(c);
    }
}