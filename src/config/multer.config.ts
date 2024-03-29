import { diskStorage } from 'multer';

export const MulterConfig = {
  dest: './assets/uploads',
  storage: diskStorage({
    destination: './src/assets/uploads',
    filename: (req, file, callback) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      callback(null, `${file.fieldname}-${uniqueSuffix}${file.originalname}`);
    },
  }),
};
