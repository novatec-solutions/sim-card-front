import { LogType } from "src/app/modules/migration/enums/log-type.enum";

export function SimpleLog(logType: LogType){
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor){
    const originalMethod = descriptor.value;

    descriptor.value = function(...args: any[]){
      console.warn(`${propertyKey} was called with ${JSON.stringify(args)}`);
      return originalMethod.apply(this, args);
    };

    return descriptor;
  }
}
