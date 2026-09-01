import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LibroModel } from '../../models/libro.model';
import { AbstractLecturasBBDDService } from '../../abstracts/AbstractLecturasBBDDService';
import { AbstractAuthService } from '../../abstracts/AbstractAuthService';


@Component({
  selector: 'app-estado-libro',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './estado-libro.component.html',
  styleUrl: './estado-libro.component.css'
})
export class EstadoLibroComponent {

  libroInfo: any[] = [];
  titulo: string = "";
  portada: string = "";
  descripcion: string = "";
  autores: string[] = [];
  editor: string = "";
  categorias: string = "";
  paginas: any = "";
  fecha: string = "";

  cargando: boolean = false;
  disponibles1: boolean = true;
  disponibles2: boolean = true;
  librosGuardados: any[] = [];
  usuarioID: string = ""
  guardado: boolean = false;

  @Input() libro!: any;
  @Output() libroGuardado = new EventEmitter<string>();

  constructor(
    private _lecturasBBDDService: AbstractLecturasBBDDService,
    private _authService: AbstractAuthService,
    private toastr: ToastrService,
  ) { }

  //Método auxiliar para limpiar el ID de Open Library (quita barras y /works/)
  private getCleanAPIid(rawId: string): string {
    if (!rawId) return '';
    if (rawId.includes('OL') || rawId.startsWith('/')) {
      const parts = rawId.split('/').filter(p => p.length > 0);
      return parts[parts.length - 1] || rawId;
    }
    return rawId;
  }

  //Conviene usar OnInit para obtener el valor de @Input
  ngOnInit() {
    const rawId = this.libro?.APIid || this.libro?.id;
    const apiId = this.getCleanAPIid(rawId);
    if (apiId) {
      this.esGuardado(apiId);
    }
  }

  //Usamos promesa porque la obtención del usuarioID es asíncrona 
  //y si lo queremos recuperar en guardarEstadoLibros dará undefined si no usamos promesas
  async getUsuarioID() {
    const email = localStorage.getItem("email");
    return new Promise((resolve, reject) => {
      this._authService.getIdByEmail(email).subscribe(
        (resp: any) => {
          this.usuarioID = resp;
          console.log('Usuario ID obtenido:', this.usuarioID);
          resolve(this.usuarioID);
          return this.usuarioID;
        },
        (err) => {
          console.error('Error al obtener el usuarioID:', err);
          reject(err);
        }
      );
    });
  }

  async guardarEstadoLibro(estado: string) {
    console.log("Datos del libro recibidos:", this.libro);

    //Await espera a que se ejecute la promesa anterior
    const usuarioID = await this.getUsuarioID();

    // Unificamos la fuente de los datos (volumeInfo o info)
    const info = this.libro.volumeInfo || this.libro.info || {};
    const rawId = this.libro?.APIid || this.libro?.id;
    const cleanAPIid = this.getCleanAPIid(rawId);

    var nuevoLibro = new LibroModel();
    nuevoLibro = {
      _id: cleanAPIid,
      _idUsuario: usuarioID,
      titulo: this.libro.titulo || info.title || "Sin título",
      autores: this.libro.autores || info.authors || ['Autor desconocido'],
      editor: this.libro.editor || info.publisher || "",
      fechaPublicacion: this.libro?.fechaPublicacion || info.publishedDate || "",
      descripcion: this.libro?.descripcion || info.description || "",
      pageCount: Number(this.libro?.pageCount || info.pageCount || 0),
      averageRating: 0,
      ratingsCount: 0,
      contentVersion: "",
      imagen: this.libro?.imagen || info.imageLinks?.thumbnail || "",
      lengua: "",
      previewLink: this.libro?.previewLink || info.previewLink || "",
      estado: estado === 'Leído' ? 'Leído' : 'Pendiente',
      categorias: this.libro?.categorias || (Array.isArray(info.categories) ? info.categories.join(', ') : info.categories) || "Sin categoría",
      APIid: cleanAPIid
    };

    this._lecturasBBDDService.addlibro(nuevoLibro).subscribe((resp: any) => {
      console.log("Libro añadido", resp);
      this.toastr.success('Ha sido añadido!', 'Añadido!');
      this.guardado = true;
      this.libroGuardado.emit(nuevoLibro.APIid);
    });
  }

  //Comprobación de si está guardado para bloquear que se pueda guardar duplicado
  esGuardado(libroId: string) {
    const cleanId = this.getCleanAPIid(libroId);
    this._lecturasBBDDService.getlibroByAPIid(cleanId).subscribe(
      (resp) => {
        console.log("Está guardado en la BBDD", resp);
        this.guardado = true;
      },
      (err) => {
        console.log("No se encuentra", err);
      }
    )
  }

}