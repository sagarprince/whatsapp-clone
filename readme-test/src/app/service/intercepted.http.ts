import { Injectable } from "@angular/core";
import { ConnectionBackend, RequestOptions, Request, RequestOptionsArgs, Response, Http, Headers} from "@angular/http";
import { Observable } from "rxjs/Rx";
import { LoaderService } from '../modules/shared/components/loader/loader.service';

@Injectable()
export class InterceptedHttp extends Http {
    loader: any = null;

    constructor(backend: ConnectionBackend, defaultOptions: RequestOptions, loaderService: LoaderService) {        
        super(backend, defaultOptions);
        this.loader = loaderService;
    }

    showLoader() {
        this.loader.show();
    }

    hideLoader() {
        setTimeout(() => {
            this.loader.hide();
        }, 100);
    }

    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {        
        console.log(url);
        console.log(options);

        this.showLoader();

        return super.request(url, options)
        .catch((error) => {
            return Observable.throw(error);
        })        
        .finally(() => {
            this.hideLoader();         
        });
    }
}