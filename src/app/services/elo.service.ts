import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EloService {
  getElo$: Observable<any>;
  private getEloSubject = new Subject<any>();
  constructor() { 
    this.getElo$ = this.getEloSubject.asObservable();
  }

  getElo(data: any) {
    this.getEloSubject.next(data);
  }
}
