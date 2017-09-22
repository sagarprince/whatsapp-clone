import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'statusPipe'})
export class StatusPipe implements PipeTransform {
  transform(value: string): string {
    let status = value;
    return status.toLowerCase().replace(/\s/g,'_');
  }
}