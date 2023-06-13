import { useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';

export default function FileUploader() {
  const [files, setFiles] = useState<File[]>([]);

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
      const result = await fetch(`${process.env.API_URL}/document-ingestion/pdf`, {
        method: 'POST',
        body: formData,
      });
  
      setFiles((prevFiles) => [...prevFiles, ...uploadedFiles]);
      console.log(result);
    }catch(e) {
      console.error(e);
    }

  };

  return (
    <div className="flex flex-col items-center">
      <label className="p-4 border-2 border-dashed w-64 cursor-pointer hover:border-blue-500">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-20 w-20"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          <p className="pt-2 text-gray-400 text-xs">Upload Files</p>
        </div>
        <input
          type="file"
          multiple
          onChange={handleUpload}
          className="hidden"
        />
      </label>

      <div className="flex flex-wrap w-64">
        {files.map((file) => (
          <div key={file.name} className="m-2 p-2 border-2 border-dashed">
            {file.name}
          </div>
        ))}
      </div>
    </div>
  );
}
