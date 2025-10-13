import { writeFileSync } from 'fs';
import * as dotenv from 'dotenv';

// Cargar las variables del archivo .env
dotenv.config();

const prodPath = './src/environments/environment.ts';
const devPath = './src/environments/environment.development.ts';

// Contenido del archivo environment.ts
const envConfig = `
export const environment = {
    firebaseConfig:{
        apiKey: '${process.env['APIKEY']}',
        authDomain: '${process.env['AUTHDOMAIN']}',
        projectId: '${process.env['PROJECTID']}',
        storageBucket: '${process.env['STORAGEBUCKET']}',
        messagingSenderId: '${process.env['MESSAGINGSENDERID']}',
        appId: '${process.env['APPID']}',
        measurementId: '${process.env['MEASUREMENTID']}'
    }
};
`;

writeFileSync(devPath, envConfig);
writeFileSync(prodPath, envConfig);

console.log('✅ environment.ts file successfully generated with environment variables');