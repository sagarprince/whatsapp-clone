import { XHRBackend, Http, RequestOptions } from "@angular/http";
import { InterceptedHttp } from "../service/intercepted.http";
import { LoaderService } from '../modules/shared/components/loader/loader.service';

export function httpFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions, loaderService: LoaderService): Http {
    return new InterceptedHttp(xhrBackend, requestOptions, loaderService);
}