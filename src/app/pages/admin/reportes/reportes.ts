import { Component, OnInit } from '@angular/core';
import { SolicitudService } from '../../../services/solicitud.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reportes',
  imports: [CommonModule, FormsModule], 
  templateUrl: './reportes.html',
  styleUrls: ['./reportes.css']
})
export class ReportesComponent implements OnInit {

  lista: any[] = [];

 
  nuevo: any = {
    rep_Estudiante: '',
    rep_Estado: '',
    rep_Fecha: new Date()
  };

  constructor(private service: SolicitudService) {}

  ngOnInit(): void {
    this.cargar();
  }

 
  cargar() {
    this.service.getReportes().subscribe((res: any) => {
      console.log(res);
      this.lista = res;
    });
  }

 
  guardar() {

    if (!this.nuevo.rep_Estudiante || !this.nuevo.rep_Estado) {
      alert('Completa todos los campos');
      return;
    }

    this.nuevo.rep_Fecha = new Date();

    this.service.addReporte(this.nuevo).subscribe(() => {

  
      this.nuevo = {
        rep_Estudiante: '',
        rep_Estado: '',
        rep_Fecha: new Date()
      };

      // recargar tabla
      this.cargar();
    });
  }
}