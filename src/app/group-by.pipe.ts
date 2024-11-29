import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'groupBy'
})
export class GroupByPipe implements PipeTransform {
    transform(array: any[], property: string): any {
        if (!array || !property) return [];

        return array.reduce((acc, item) => {
            const key = item[property];
            if (!acc[key]) {
                acc[key] = [];
            }
            acc[key].push(item);
            return acc;
        }, {});
    }
}
