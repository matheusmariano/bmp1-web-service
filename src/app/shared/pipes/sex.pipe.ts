import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'sex'
})
export class SexPipe implements PipeTransform {
  transform(tag: string): string {
    switch (tag) {
      case 'female':
        return 'Feminino'

      case 'male':
        return 'Masculino'
      
      default:
        return 'Não definido'
    }
  }
}
