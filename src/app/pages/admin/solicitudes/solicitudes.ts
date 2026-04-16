import { Component, OnInit } from '@angular/core';
import { SolicitudService } from '../../../services/solicitud.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-solicitudes',
  imports: [CommonModule, FormsModule], 
  templateUrl: './solicitudes.html',
  styleUrls: ['./solicitudes.css']
})
export class SolicitudesComponent implements OnInit {

  lista: any[] = [];

  nuevo: any = {
    sol_CorreoEst: '',
    sol_Estado: 'Pendiente'
  };

  constructor(private service: SolicitudService) {}

  ngOnInit() {
    this.cargar();
  }

  cargar() {
    this.service.getAll().subscribe(res => {
      this.lista = res;
    });
  }


  guardar() {

    if (!this.nuevo.sol_CorreoEst) {
      alert('Ingresa el correo');
      return;
    }

    this.service.add(this.nuevo).subscribe((res: any) => {

      this.lista.unshift(res);

      this.nuevo = {
        sol_CorreoEst: '',
        sol_Estado: 'Pendiente'
      };

    });
  }


  aprobar(s: any) {
    s.sol_Estado = 'Aprobada';

    this.service.update(s).subscribe(() => {

      const reporte = {
        Rep_Estudiante: s.sol_CorreoEst,
        Rep_Estado: 'Aprobada',
        Rep_Fecha: new Date().toISOString()
      };

      this.service.addReporte(reporte).subscribe(() => {
        this.cargar();
      });

    });
  }

  
  rechazar(s: any) {
    s.sol_Estado = 'Rechazada';

    this.service.update(s).subscribe(() => {

      const reporte = {
        Rep_Estudiante: s.sol_CorreoEst,
        Rep_Estado: 'Rechazada',
        Rep_Fecha: new Date().toISOString()
      };

      this.service.addReporte(reporte).subscribe(() => {
        this.cargar();
      });

    });
  }
}