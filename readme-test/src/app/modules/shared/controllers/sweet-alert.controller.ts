import swal from 'sweetalert2';

export class SweetAlertController {

    constructor() {

    }

    deleteConfirm(options: any, yesCallback: () => void, noCallback?: () => void) {        
        let defaultOptions = {
            title: 'Are you sure ?',
            text: 'You want to delete this',
            type: 'warning',
            width: '370px',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No'
        };

        let alertOptions = Object.assign(defaultOptions, options);

        swal(alertOptions).then(function() {
            if (typeof yesCallback !== 'undefined') {
                yesCallback();
            }            
        }, function(dismiss) {                       
            if (dismiss === 'cancel' && typeof noCallback !== 'undefined') {
                noCallback();
            }
        })
    }

}