import s3Sdk from 'aws-sdk';
import { PutObjectRequest } from 'aws-sdk/clients/s3';

export interface IS3Service {
    uploadFile(fileName: string, file: Buffer): Promise<string>;
}

export class S3Service implements IS3Service {
    async uploadFile(fileName: string, file: Buffer) {
        const s3 = new s3Sdk.S3({
            apiVersion: '2006-03-01',
            region: process.env.AWS_REGION
        });

        const params: PutObjectRequest = {
            Bucket: process.env.AWS_S3_BUCKET || '',
            Key: fileName,
            Body: file
        };

        const data = await s3.upload(params).promise();
        return data.Location;
    }
}
