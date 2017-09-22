import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MdDialog } from '@angular/material';

import { DataTableDirective } from 'angular-datatables';

import { DataTablesController } from '../../../shared/controllers/data-tables.controller';

import { SweetAlertController } from '../../../shared/controllers/sweet-alert.controller';

import { AddEditUserSetupComponent } from './add-edit-user-setup/add-edit-user-setup.component';


declare var $;

@Component({
  selector: 'app-user-setup',
  templateUrl: './user-setup.component.html',
  styleUrls: ['./user-setup.component.scss']
})

export class UserSetupComponent implements OnInit, OnDestroy {

    @ViewChild(DataTableDirective)
    dtElement: DataTableDirective;

    dtOptions: any = {};

    records: Array<any> = [];    

    dtCtrl: any = null;

    dialogOptions: any = {
        width: '800px',
        height: '440px',
        panelClass: 'appModalPopup'          
    };

    constructor(public dialog: MdDialog, private _router: Router) {        
        this.records = [
            {
                "user_name": "Leia Michael",
                "login_name": "lemichael3473",
                "client_name": "BOA5",
                "email": "Lei.MICHAEL9507@yahoo.com"
            },
                {
                "user_name": "Kaylyn Cline",
                "login_name": "kayclin4871",
                "client_name": "BOA4",
                "email": "Kaylyn.CLINE4348@live.com"
            },
                {
                "user_name": "Aisha Kline",
                "login_name": "aishakli7550",
                "client_name": "BOA7",
                "email": "Aisha.KL7162@live.com"
            },
                {
                "user_name": "Beckham Mcgee",
                "login_name": "beckhamcge7021",
                "client_name": "BOA3",
                "email": "Beck.MCGE5487@mail2web.com"
            },
                {
                "user_name": "Major Dominguez",
                "login_name": "madominguez1025",
                "client_name": "BOA6",
                "email": "Major.DOMINGU7208@hushmail.com"
            },
                {
                "user_name": "Angeline Bernard",
                "login_name": "angelbernar8289",
                "client_name": "BOA4",
                "email": "Ange.BERN8750@mail2web.com"
            },
                {
                "user_name": "Esperanza Lang",
                "login_name": "esperanzlan2019",
                "client_name": "BOA2",
                "email": "Espera.LA5893@hushmail.com"
            },
                {
                "user_name": "Jaidyn Duran",
                "login_name": "jaidydura5002",
                "client_name": "BOA7",
                "email": "Jai.DUR5464@hushmail.com"
            },
                {
                "user_name": "Gracelyn Gray",
                "login_name": "gracelgray5439",
                "client_name": "BOA2",
                "email": "Gracely.GRAY7531@yahoo.com"
            },
                {
                "user_name": "Jaiden Casey",
                "login_name": "jaidca2196",
                "client_name": "BOA3",
                "email": "Jaide.CAS4375@mail2web.com"
            },
                {
                "user_name": "Leandro Romero",
                "login_name": "learomer5868",
                "client_name": "BOA7",
                "email": "Leandr.ROME3175@live.com"
            },
                {
                "user_name": "Kali Conway",
                "login_name": "kacon7440",
                "client_name": "BOA1",
                "email": "Ka.CONWAY3625@mail2web.com"
            },
                {
                "user_name": "Regan Bean",
                "login_name": "reganbean8873",
                "client_name": "BOA1",
                "email": "Rega.BE1871@gmail.com"
            },
                {
                "user_name": "Rosemary Massey",
                "login_name": "rosemmass2314",
                "client_name": "BOA2",
                "email": "Rosema.MAS5095@live.com"
            },
                {
                "user_name": "Keon Gallagher",
                "login_name": "keogallagher4432",
                "client_name": "BOA1",
                "email": "Keon.GALLA1191@gmail.com"
            },
                {
                "user_name": "Duncan Ruiz",
                "login_name": "duncanru8394",
                "client_name": "BOA6",
                "email": "Dunca.RUIZ9621@gmail.com"
            },
                {
                "user_name": "Amani Morton",
                "login_name": "amanmor3709",
                "client_name": "BOA4",
                "email": "Amani.MORTO4266@mail2web.com"
            },
                {
                "user_name": "Nathan Marsh",
                "login_name": "nathamar4024",
                "client_name": "BOA3",
                "email": "Natha.MAR8104@yahoo.com"
            },
                {
                "user_name": "Gia Powell",
                "login_name": "giapow5216",
                "client_name": "BOA6",
                "email": "Gi.POWELL7948@live.com"
            },
                {
                "user_name": "Vaughn Vega",
                "login_name": "vaughnve3827",
                "client_name": "BOA7",
                "email": "Vaug.VE8622@mail2web.com"
            },
                {
                "user_name": "Jagger Hensley",
                "login_name": "jaggehens5126",
                "client_name": "BOA7",
                "email": "Jagger.HENSLE5708@live.com"
            },
                {
                "user_name": "Alena Zamora",
                "login_name": "alenzamor9773",
                "client_name": "BOA3",
                "email": "Ale.ZAMORA7408@mail2web.com"
            },
                {
                "user_name": "Waylon Allison",
                "login_name": "waylonallison1934",
                "client_name": "BOA6",
                "email": "Wayl.ALLISO2426@mail2web.com"
            },
                {
                "user_name": "Siena Bender",
                "login_name": "siebende4632",
                "client_name": "BOA3",
                "email": "Si.BEND1319@mail2web.com"
            },
                {
                "user_name": "Matthias Cooke",
                "login_name": "mattco6053",
                "client_name": "BOA2",
                "email": "Matthi.COO8182@mail2web.com"
            },
                {
                "user_name": "Osvaldo Fernandez",
                "login_name": "osvaldofernandez6271",
                "client_name": "BOA3",
                "email": "Osvald.FERNAN7223@yahoo.com"
            },
                {
                "user_name": "Marlene Kelley",
                "login_name": "marlenekell3810",
                "client_name": "BOA6",
                "email": "Marlen.KELL2835@mail2web.com"
            },
                {
                "user_name": "Asa Mills",
                "login_name": "asamil7836",
                "client_name": "BOA3",
                "email": "As.MIL1875@hushmail.com"
            },
                {
                "user_name": "Annalise Tate",
                "login_name": "annalisetat8425",
                "client_name": "BOA1",
                "email": "Annali.TATE2160@hushmail.com"
            },
                {
                "user_name": "Alejandro Glenn",
                "login_name": "alejandrogl2137",
                "client_name": "BOA6",
                "email": "Alejand.GL1888@mail2web.com"
            },
                {
                "user_name": "Jamison Middleton",
                "login_name": "jamimiddle9245",
                "client_name": "BOA2",
                "email": "Jamiso.MIDDLETON2007@gmail.com"
            },
                {
                "user_name": "Lacey Gardner",
                "login_name": "lagard4220",
                "client_name": "BOA4",
                "email": "Lacey.GARD5223@mail2web.com"
            },
                {
                "user_name": "Jaron Franco",
                "login_name": "jafra7060",
                "client_name": "BOA7",
                "email": "Ja.FRANC4478@gmail.com"
            },
                {
                "user_name": "Christopher Montoya",
                "login_name": "christomontoy1830",
                "client_name": "BOA5",
                "email": "Christo.MONTOY6771@hushmail.com"
            },
                {
                "user_name": "Delaney Reese",
                "login_name": "delaneyree2791",
                "client_name": "BOA2",
                "email": "Delaney.REES6533@live.com"
            },
                {
                "user_name": "Ariella Knight",
                "login_name": "arieknigh1367",
                "client_name": "BOA6",
                "email": "Ari.KNIGHT1895@mail2web.com"
            },
                {
                "user_name": "Callum Ferrell",
                "login_name": "callumferr8012",
                "client_name": "BOA4",
                "email": "Call.FERREL4144@mail2web.com"
            },
                {
                "user_name": "Rylen Golden",
                "login_name": "rylgolde5336",
                "client_name": "BOA1",
                "email": "Ry.GOLDE1600@yahoo.com"
            },
                {
                "user_name": "Deven Carroll",
                "login_name": "devcarrol2747",
                "client_name": "BOA6",
                "email": "Dev.CAR3484@gmail.com"
            },
                {
                "user_name": "Elian Cunningham",
                "login_name": "eliancunni4531",
                "client_name": "BOA6",
                "email": "El.CUNNIN1430@gmail.com"
            },
                {
                "user_name": "Triston Clements",
                "login_name": "tristoclements3313",
                "client_name": "BOA4",
                "email": "Trist.CLEMEN6781@hushmail.com"
            },
                {
                "user_name": "Jolene Marshall",
                "login_name": "jolemarsha5900",
                "client_name": "BOA6",
                "email": "Jolene.MARSHALL7658@yahoo.com"
            },
                {
                "user_name": "Blaine Howard",
                "login_name": "blahowar1691",
                "client_name": "BOA6",
                "email": "Blai.HOWA5051@mail2web.com"
            },
                {
                "user_name": "Miguel Hoffman",
                "login_name": "miguhoff1065",
                "client_name": "BOA2",
                "email": "Miguel.HOFF5982@hushmail.com"
            },
                {
                "user_name": "Reed Odom",
                "login_name": "reodom4094",
                "client_name": "BOA5",
                "email": "Ree.ODOM6534@gmail.com"
            }
        ];
    }

    ngOnInit() {
        this.dtCtrl = new DataTablesController({
            aoColumnDefs: [
                { 
                    bSortable: false,                     
                    aTargets: [4]
                }
            ]
        });
        this.dtOptions = this.dtCtrl.dataTableOptions;
        this.dtCtrl.dataTableInstanceInit(this.dtElement, (dtInstance, inputEl) => {                
            inputEl.on( 'keyup change', function () {
                let that = $(this);
                let index = that.attr('data-index');                
                dtInstance.columns(index).search(this.value).draw();
            });
        });
    }

    addUserPopup() {
        let addUserDialogRef = this.dialog.open(AddEditUserSetupComponent, this.dialogOptions);
        addUserDialogRef.componentInstance.heading = 'Add User';
        addUserDialogRef.componentInstance.saveBtnTitle = 'Add';
    }

    editUserPopup() {
        let editUserDialogRef = this.dialog.open(AddEditUserSetupComponent, this.dialogOptions);
        editUserDialogRef.componentInstance.heading = 'Edit User';
        editUserDialogRef.componentInstance.saveBtnTitle = 'Save';
        editUserDialogRef.componentInstance.setEditFormValues({
            userName: 'Aisha Kline',
            loginName: 'aishakli7550',
            userType: 'test-1',
            skillType: 'test-2',
            email: 'test@mail.co',
            phoneNumber: '(123)-5555-2222',
            client: 'test-3',
            loginAttempts: '3',
            passwordExpired: '15',
            mustChangePassword: true,
            resetPassword: true,
            isAdmin: false,
            allowEmail: true,
            assignQueue: ['test-1', 'test-3']
        });
    }

    deleteUser() {
        let deleteUserSetupAlert = new SweetAlertController();
        deleteUserSetupAlert.deleteConfirm({}, ()=> {
            console.log('yes');
        });
    }

    ngOnDestroy() {
        this.dtCtrl.destroy();
    }  

}