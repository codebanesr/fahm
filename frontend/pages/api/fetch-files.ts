import { FileMeta } from "@/interfaces/file.interface";

export const fetchFiles = async (email: string): Promise<FileMeta[]> => {
  try {
    const response = await fetch(`${process.env.API_URL}/document-ingestion/uploads/${email}`);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error(`Error fetching files: ${response.status}`);
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error fetching files: ${error.message}`);
    } else {
      throw new Error(`Error fetching files: ${String(error)}`);
    }
  }
};
