export const validateUploadedImage = (
  file: File,
): { isValid: boolean; error?: string } => {
  if (!file.type.startsWith('image/')) {
    return {
      isValid: false,
      error: 'Пожалуйста, выберите изображение',
    };
  }

  if (file.size > 1024 * 1024) {
    return {
      isValid: false,
      error: 'Файл слишком большой. Максимальный размер 5MB',
    };
  }

  return { isValid: true };
};
