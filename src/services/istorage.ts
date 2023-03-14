export interface IStorageService {
    uploadFile(fileName: string, file: Buffer): Promise<string>;
}
