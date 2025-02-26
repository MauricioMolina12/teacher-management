import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'localTime',
})
export class LocalTimePipe implements PipeTransform {

  transform(value: string | Date): string {
    if (!value) return 'Hora inválida';

    const date = new Date(value);
    return new Intl.DateTimeFormat('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).format(date);
  }
}
