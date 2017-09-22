import { Injectable} from '@angular/core';

declare var window;

@Injectable()
export class FileUploadController {    

    readFile(input: any, callback? :(e: any) => void) {
        if (input.files && input.files[0]) {
            let reader = new FileReader();
            reader.onload = (e: any) => {                           
                callback(e.target.result);
            }
            reader.readAsDataURL(input.files[0]);
        }
    }

    readImageFile(input: any, imageSize: any, callback?: (e: any) => void) {
        if (input.files && input.files[0]) {
            let _URL = window.URL || window.webkitURL;
            let img = new Image();
            img.src = _URL.createObjectURL(input.files[0]);
            
            // Check image width & height
            img.onload = () => {
                if (img.width !== imageSize.width && img.width !== imageSize.height) {
                    console.log('Image size should be ' + imageSize.width + 'x' + imageSize.height);
                }
            };

            this.readFile(input, (result) => {
                callback(result);
            });
        }
    }
}