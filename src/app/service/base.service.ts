import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface IBaseEntity {
  id?: number;
}

@Injectable({
  providedIn: 'root'
})
export class BaseService<T extends IBaseEntity> {

  private http: HttpClient = inject(HttpClient);

  private apiUrl: string = environment.apiUrl;

  public list$: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);

  public one$: BehaviorSubject<T | null> = new BehaviorSubject<T | null>(null);

  private actions: {[k: string]: Function} = {
    getAll: () => this.getAll().subscribe( list => this.list$.next(list) ),
    get: (id: number) => this.get(id).subscribe(
      one => this.one$.next(one)
    ),
    create: (entity: T) => this.create(entity).subscribe(
      () => this.actions['getAll']()
    ),
    update: (entity: T) => this.update(entity).subscribe(
      updated => {
        const list = this.list$.getValue();
        const index = list.findIndex( i => i.id === updated.id );
        list.splice(index, 1, updated);
        this.list$.next(list);
      }
    ),
    delete: (entity: T) => this.delete(entity).subscribe(
      () => {
        const list = this.list$.getValue();
        const index = list.findIndex( i => i.id === entity.id );
        list.splice(index, 1);
        this.list$.next(list);
      }
    ),
  };

  constructor(
    @Inject(String) protected entity: string,
  ) {
    // this.http.get(`http://localhost:3000/tickets`).subscribe(
    //   tickets => console.log(tickets),
    // );
  }

  dispatch(actionName: string, ...args: any[]): void {
    this.actions[actionName](...args);
  }

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(`${this.apiUrl}${this.entity}`);
  }

  get(id: number): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}${this.entity}/${id}`);
  }

  create(entity: T): Observable<T> {
    return this.http.post<T>(
      `${this.apiUrl}${this.entity}`,
      entity,
    );
  }

  update(entity: T): Observable<T> {
    return this.http.patch<T>(
      `${this.apiUrl}${this.entity}/${entity.id}`,
      entity,
    );
  }

  delete(entity: T): Observable<T> {
    return this.http.delete<T>(
      `${this.apiUrl}${this.entity}/${entity.id}`,
    );
  }

  query(options: {[k: string]: string}): Observable<T[]> {
    // http://localhost:3000/tickets?flightNumber=ao2778&seat=h5
    const queryArray = [];
    for (let key of Object.keys(options)) {
      queryArray.push(`${key}=${options[key]}`);
    }
    return this.http.get<T[]>(
      `${this.apiUrl}${this.entity}?${queryArray.join('&')}`
    );
  }

}
