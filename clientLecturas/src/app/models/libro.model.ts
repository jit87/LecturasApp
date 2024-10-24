


export class LibroModel {
  _id?:                 string; 
  _idUsuario?:          string; 
  titulo:               string;
  autores:              string[];
  editor?:              string;
  fechaPublicacion?:    string;
  descripcion?:         string;
  pageCount?:           number;
  averageRating?:       number;
  ratingsCount?:        number;
  contentVersion?:      string;
  imagen?:              string;
  lengua?:              string;
  previewLink?:         string;
  estado?:              string;
  coleccion?:           string; 

  constructor() {
    this._id = "";
    this._idUsuario = ""; 
    this.titulo = ""; 
    this.autores = []; 
    this.editor = "";
    this.fechaPublicacion = "";
    this.descripcion = "";
    this.pageCount = 0;
    this.averageRating = 0;
    this.ratingsCount = 0;
    this.contentVersion = "";
    this.imagen = ""; 
    this.lengua = "";
    this.previewLink = "";
    this.estado = "Pendiente";
    this.coleccion = "No clasificado"
   }
}
