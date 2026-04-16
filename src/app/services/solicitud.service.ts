import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {

  private url = 'http://localhost:7282/Solicitudes';
  private urlReportes = 'http://localhost:7282/Reportes';

  constructor(private http: HttpClient) {}



  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.url);
  }

  add(solicitud: any): Observable<any> {
    return this.http.post<any>(this.url, solicitud);
  }

  update(solicitud: any): Observable<any> {
    return this.http.put<any>(`${this.url}/${solicitud.sol_Id}`, solicitud);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/${id}`);
  }



  getReportes(): Observable<any[]> {
    return this.http.get<any[]>(this.urlReportes);
  }

  addReporte(reporte: any): Observable<any> {
    return this.http.post<any>(this.urlReportes, reporte);
  }


  crearConReporte(solicitud: any): Observable<any> {
    return new Observable(observer => {

      this.add(solicitud).subscribe({
        next: (res) => {

          const reporte = {
            rep_Estudiante: solicitud.sol_CorreoEst,
            rep_Estado: 'Pendiente',
            rep_Fecha: new Date()
          };

          this.addReporte(reporte).subscribe({
            next: () => {
              observer.next(res);
              observer.complete();
            },
            error: err => observer.error(err)
          });

        },
        error: err => observer.error(err)
      });

    });
  }
}