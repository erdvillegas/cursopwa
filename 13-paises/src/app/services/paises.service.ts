import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PaisInterface } from '../interfaces/paises.interface';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  /**
   * Contiene los paises a consultar
   */
  private paises: PaisInterface[] = [];

  constructor(private http: HttpClient) { }

  getPaises(): Promise<PaisInterface[]> {

    if (this.paises.length > 0) {
      return Promise.resolve(this.paises);
    }

    return new Promise(resolve => {
      this.http.get('https://restcountries.eu/rest/v2/lang/es')
        .subscribe((paises: PaisInterface[]) => {
          console.log(paises);
          this.paises = paises;
          resolve(paises);
        });
    });
  }

  /**
   * Obtiene un pais por el Id  de codigo
   * @param Id Identificador del pais a consultar
   */
  getPaisPorId(Id: string) {
    if (this.paises.length > 0) {
      const pais = this.paises.find(p => p.alpha3Code === Id);
      return Promise.resolve(pais);
    }

    return this.getPaises().then(paises => {
      const pais = this.paises.find(p => p.alpha3Code === Id);
      return Promise.resolve(pais);
    });
  }
}
