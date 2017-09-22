import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Rx';
import { DataTableDirective } from 'angular-datatables';
import { DataTablesController } from '../../../shared/controllers/data-tables.controller';
import { SweetAlertController } from '../../../shared/controllers/sweet-alert.controller';
import { AddEditClientSetupComponent } from './add-edit-client-setup/add-edit-client-setup.component';
import { HttpService } from '../../../../service/http.service';
import { UrlDetails } from '../../../../model/url/url-details.model'
import { ToastController } from '../../../shared/controllers/toast.controller';
declare var $;

@Component({
    selector: 'app-client-setup',
    templateUrl: './client-setup.component.html',
    styleUrls: ['./client-setup.component.scss']
})

export class ClientSetupComponent implements OnInit, OnDestroy {

    @ViewChild(DataTableDirective)
    dtElement: DataTableDirective;

    dtOptions: any = {};

    records: Array<any> = [];

    dtCtrl: any = null;

    dtTrigger: Subject<any> = new Subject();

    constructor(private _router: Router, 
    public httpService: HttpService, 
    public toastController:ToastController) {

    }

    ngOnInit() {
        this.dtCtrl = new DataTablesController({
            aoColumnDefs: [
                {
                    bSortable: false,
                    aTargets: [3]
                }
            ]
        });
        this.dtOptions = this.dtCtrl.dataTableOptions;
        this.getAllClient();
    }   

    getAllClient() {
          this.httpService.getAll(UrlDetails.$getAllClientUrl).subscribe(response => {
            if (response.responseCode == "200") {
                this.records = response.responseData;
            }
            this.dtTrigger.next();
            this.dtCtrl.commonDTInit(this.dtElement);
        }, (error) => {
            this.dtTrigger.next();
            this.dtCtrl.commonDTInit(this.dtElement);
        });
    } 

    deleteClient(clientID:String) {
        let client={clientId:clientID};
        let deleteClientSetupAlert = new SweetAlertController();
        deleteClientSetupAlert.deleteConfirm({}, () => {
              this.httpService.delete(UrlDetails.$deleteClientUrl,client)
            .subscribe(response => {
              if(response.responseData) {                 
                this.toastController.successToast("Record deleted Successfully");
                this.dtCtrl.reinit();
                this.getAllClient();
              } else {
                this.toastController.errorToast("Selected Record is already deleted");
              }               
            }, error => {                
                this.toastController.errorToast("Something went wrong, Please try again.");
                this.dtTrigger.next();
                this.dtCtrl.commonDTInit(this.dtElement);     
              });

        });
    }

    ngOnDestroy() {
        this.dtCtrl.destroy();
    }

}//class