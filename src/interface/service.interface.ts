export interface IService <T> {
    findAll(): Promise<T[]>
    findOne(id: number): Promise<T>;
    save(user:T): Promise<T>;
    delete(id: number): Promise<Boolean>
    update(id: number, user: T): Promise<T>
}