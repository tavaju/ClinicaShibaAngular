import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ChatbotToggleService {
  private toggleSubject = new Subject<void>();
  toggle$ = this.toggleSubject.asObservable();

  openChatbot() {
    this.toggleSubject.next();
  }
}
