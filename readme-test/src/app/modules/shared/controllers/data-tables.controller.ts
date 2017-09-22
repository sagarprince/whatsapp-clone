declare var $;

export class DataTablesController {

    _dtInstance: any;

    defaultDToptions = {
        aoColumnDefs: [
            { 
                bSortable: false,                     
                aTargets: [5]
            }
        ],
        order: [],
        dom: '<<"dataTable-toolbar">f<t>ipl<"clearfix">>',
        pagingType: 'simple_numbers',
        pageLength: 10,
        lengthChange: true,
        language: {
            sLengthMenu: "_MENU_",
            sSearchPlaceholder: 'Search',
            "info": "Displaying item :  _START_ - _END_ of _TOTAL_ ",
            search: "",
            emptyTable: "No data available "
        }        
    };

    dataTableOptions = {};

    constructor(options?: any) {
        this.dataTableOptions = Object.assign(this.defaultDToptions, options);
    }

    dataTableInstanceInit(dtElement: any, callback?: Function) {               
        setTimeout(() => {           
            dtElement.dtInstance.then((dtInstance: DataTables.Api) => {   
                this._dtInstance = dtInstance;

                $('.data-table-section').show();
                
                $('.toolbar-button').prependTo($('.dataTable-toolbar'));

                $('.data-table-section table thead th').off('click');   

                $('.data-table-section table thead th.sortable').each(function(colIndex, col) {
                    let _el = $(col).find('span');
                    dtInstance.order.listener(_el, colIndex, ()=>{});
                });

                let inputEl = $('.data-table-section table thead th input');

                callback(dtInstance, inputEl);
            });
        }, 1);
    }

    commonDTInit(dtElement: any) {
        this.dataTableInstanceInit(dtElement, (dtInstance, inputEl) => {                
            inputEl.on( 'keyup change', function () {
                let that = $(this);
                let index = that.attr('data-index');                
                dtInstance.columns(index).search(this.value).draw();
            });
        });
    }

    reinit() {
        $('.data-table-section').hide();
        $('.toolbar-button').prependTo($('.toolbar-button-inner'));
        this._dtInstance.destroy();
    }

    destroy() {
        $('.data-table-section table thead th input').off('keyup change');
    }
}