import { InjectionToken, container } from 'tsyringe';

export function resolve<T>(useCase: InjectionToken<T>): T {
    const result = container.resolve(useCase);
    return result;
}
