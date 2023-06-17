import { useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import Chip from './upload-chip';

export default function FileUploader() {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const { user } = useUser();
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles =
      e.target.files != null ? Array.from(e.target.files) : [];

    // Get user's email from Auth0
    const email = user?.email || 'x-random@email.com';

    const formData = new FormData();
    formData.append('file', uploadedFiles[0]);
    formData.append('email', email);

    try {
      setUploading(true);
      const result = await fetch(
        `${process.env.API_URL}/document-ingestion/pdf`,
        {
          method: 'POST',
          body: formData,
        },
      );

      setFiles((prevFiles) => [...prevFiles, ...uploadedFiles]);
      setUploading(false);
    } catch (e) {
      setUploading(false);
      setError("Error uploading file");
      console.error(e);
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <label className="p-4 border-2 border-dashed w-48 cursor-pointer hover:border-blue-500">
        <Chip />
        <input
          type="file"
          multiple
          onChange={handleUpload}
          className="hidden"
        />
      </label>

      {uploading ? (
        <div className="mt-4 flex items-center text-gray-500">
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-700"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span>Uploading...</span>
        </div>
      ) : null}

      {error && <div className="mt-4 text-red-500">{error}</div>}
      <div className="flex flex-wrap w-48 mt-4">
        {files.map((file) => (
          <div key={file.name} className="m-2 p-2 border-2 border-dashed">
            {file.name}
          </div>
        ))}
      </div>
    </div>
  );
}
