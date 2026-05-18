import type { FileUploadProps } from './fileUpload.types';

export const FileUploadMockData: FileUploadProps = {
  onFileSelect: () => {},
  onSubmit: () => {},
  isLoading: false,
  selectedFile: null,
  uploadError: undefined,
};

export const FileUploadWithSelectedFileMockData: FileUploadProps = {
  ...FileUploadMockData,
  selectedFile: new File(['test'], 'test.csv', { type: 'text/csv' }),
};

export const FileUploadWithErrorMockData: FileUploadProps = {
  ...FileUploadMockData,
  uploadError: 'File size too large',
};
