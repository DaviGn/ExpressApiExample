import { Router } from 'express';
import { savePhoto } from '@controllers/usersPhoto';
import multer from 'multer';
const upload = multer({ dest: 'src/content/uploads/' });

const usersPhotoRoutes = Router();
usersPhotoRoutes.post('/', upload.single('photo'), savePhoto);

export default usersPhotoRoutes;
