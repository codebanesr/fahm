import { FileMeta } from "@/interfaces/file.interface";

export const fetchFiles = async (email: string): Promise<FileMeta[]> => {
  try {
    const url = `${process.env.API_URL}/document-ingestion/uploads/${email}`;
    console.log({url});
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error(`Error fetching files: ${response.status}`);
    }
  } catch (error: unknown) {
    console.error(error)
    if (error instanceof Error) {
      throw new Error(`Error fetching files: ${error.message}`);
    } else {
      throw new Error(`Error fetching files: ${String(error)}`);
    }
  }
};
