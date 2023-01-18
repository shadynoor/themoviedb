import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'slice'
})
export class SlicePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    return value.slice(0,50) + "... see more"
  }

}
