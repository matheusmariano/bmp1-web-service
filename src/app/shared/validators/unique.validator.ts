import { Control } from '@angular/common'
import { Observable } from 'rxjs/Observable'

export interface Unique {
  available: boolean
}

export interface UniqueService {
  getUnique(value: any): Observable<Unique>
}

export function validateUnique(service: UniqueService) {
  return (control: Control): Promise<any> => {
    return new Promise((resolve) => {
      service.getUnique(control.value)
        .subscribe((unique) => {
          resolve(unique.available ? null : {
            ctUnique: {
              available: false
            }
          })
        }, (error) => {
          resolve({
            ctAsync: { error }
          })
        })
    })
  }
}
