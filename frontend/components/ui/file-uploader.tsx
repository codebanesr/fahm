import { useEffect, useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import Chip from './upload-chip';
import { fetchFiles } from '@/pages/api/fetch-files';
import { FileMeta } from '@/interfaces/file.interface';

export default function FileUploader() {
  const [files, setFiles] = useState<FileMeta[]>([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const { user } = useUser();
  // Get user's email from Auth0
  const email = user?.email || 'x-random@email.com';

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchFiles(email);
      setFiles(data);
    };

    fetchData();
  }, []);

  const handleDelete = async (file_base64: string) => {
    try {
      // Make the API call to delete the file
      const response = await fetch(`${process.env.API_URL}/document-ingestion/remove/${file_base64}`, {
        method: 'DELETE',
        body: JSON.stringify({ email }),
      });
      

      if (response.ok) {
        // If the API call is successful, update the state
        setFiles((prevFiles) => prevFiles.filter((file) => file.file_base64 !== file_base64));
      } else {
        // Handle error cases if needed
        console.error(
          'Failed to delete file:',
          response.status,
          response.statusText,
        );
      }
    } catch (error) {
      // Handle any network or other errors
      console.error('An error occurred while deleting the file:', error);
    }
  };

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

      const file: FileMeta = await result.json();
      setFiles((prevFiles) => [...prevFiles, file]);
      setUploading(false);
    } catch (e) {
      setUploading(false);
      setError('Error uploading file');
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
          <div
            key={file.file_base64}
            className="m-2 p-2 border-2 border-dashed flex items-center"
          >
            <span>{file.originalName}</span>
            <button
              className="ml-2 text-red-600"
              onClick={() => handleDelete(file.file_base64)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
