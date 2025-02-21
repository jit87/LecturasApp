export class ReviewModel {
  _id?: string; 
  _idUsuario: string;
  libroId: string; 
  texto: string; 
  puntuacion?: number; 
  fecha: Date; 
  comentarios: ComentarioModel[];

  constructor(
    _idUsuario: string,
    libroId: string,
    texto: string,
    puntuacion: number,
    comentarios: ComentarioModel[] = [],
    _id?: string,
    fecha?: Date
  ) {
    this._id = _id;
    this._idUsuario = _idUsuario;
    this.libroId = libroId;
    this.texto = texto;
    this.puntuacion = puntuacion;
    this.fecha = fecha || new Date();
    this.comentarios = comentarios;
  }
}

export class ComentarioModel {
  usuarioId: string; 
  texto: string; 
  fecha: Date; 

  constructor(usuarioId: string, texto: string, fecha?: Date) {
    this.usuarioId = usuarioId;
    this.texto = texto;
    this.fecha = fecha || new Date();
  }
}
