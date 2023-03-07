import { container } from 'tsyringe';

import { SaveUserPhotoUseCase } from '@useCases/userPhoto/save';

// UseCases
container.register('SaveUserPhotoUseCase', SaveUserPhotoUseCase);
