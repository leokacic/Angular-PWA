import { Injectable } from '@angular/core';
import { HttpClient,HttpResponse} from '@angular/common/http';
import { Observable ,of} from 'rxjs';
import { map, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  private baseUrl: string ="http://baltazar.izor.hr/plazepub/kakvoca_prikaz_xml9?p_god=2018&p_filter=&p_ciklus=10&p_zup_id=&p_jezik=&p_grad=&pobjs="
  constructor(private http: HttpClient) { }

  public getXml(): Observable<any> {
    console.log("leo");
    return this.http.get(this.baseUrl,{ responseType: 'text' }).pipe(
      map(res =>  res),
      catchError(<T>(error: any, result?: T) => {
        console.log(error);
        return of(result as T);
      })
    );
  }

}
