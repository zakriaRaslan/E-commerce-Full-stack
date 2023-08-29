import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
private loadingSubject = new Subject<boolean>();
LoadingActin$=this.loadingSubject.asObservable();
  constructor() { }

 ShowLoader(){
  this.loadingSubject.next(true);
 }
 HideLoader(){
 this.loadingSubject.next(false)
}
}
