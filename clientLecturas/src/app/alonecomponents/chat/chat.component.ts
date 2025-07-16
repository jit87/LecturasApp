import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {

  @Input() seguido!: any;  
  @Output() chatCerrado = new EventEmitter<boolean>();
  

  constructor() {

  }



  cerrarChat() {
    this.chatCerrado.emit(true); 
  }


}
