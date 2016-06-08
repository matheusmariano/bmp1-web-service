import { Control } from '@angular/common'
import { Observable } from 'rxjs/Observable'

export interface Unique {
  available: boolean
}

export interface UniqueService {
  getUnique(value: any, ignoreId?: string | number): Observable<Unique>
}

export function validateUnique(service: UniqueService, ignoreId?: string | number) {
  return (control: Control): Promise<any> => {
    return new Promise((resolve) => {
      service.getUnique(control.value, ignoreId)
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
