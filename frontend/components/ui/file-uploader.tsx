import { useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import Chip from './upload-chip';

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
      const result = await fetch(
        `${process.env.API_URL}/document-ingestion/pdf`,
        {
          method: 'POST',
          body: formData,
        },
      );

      setFiles((prevFiles) => [...prevFiles, ...uploadedFiles]);
      console.log(result);
    } catch (e) {
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

      <div className="flex flex-wrap w-48">
        {files.map((file) => (
          <div key={file.name} className="m-2 p-2 border-2 border-dashed">
            {file.name}
          </div>
        ))}
      </div>
    </div>
  );
}
