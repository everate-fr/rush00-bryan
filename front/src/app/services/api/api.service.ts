import { HttpClient } from '@angular/common/http';
import { IApiService } from './iapi.service';
import { environment } from 'src/environment/environment';

export class ApiService implements IApiService {

    constructor(
        private readonly _http: HttpClient,
    ) { }

    public async callApi<T>(url: string, method: string, body: any): Promise<T> {
        return new Promise(resolve => this._http.request<T>(method, environment.apiBaseUrl + url, { body })
            .subscribe(x => resolve(x)));
    }
}