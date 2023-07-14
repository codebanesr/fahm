export async function fileUploadHelper(e: Event, uploadEndpoint: string) {
  const files = (e.target as HTMLInputElement).files;
  if (!files || files.length === 0) {
    return;
  }

  const formData = new FormData();
  formData.append('file', files[0]);

  try {
    const response = await fetch(uploadEndpoint, {
      method: 'POST',
      body: formData,
      headers: {
        'fahm-api-key': 'YOUR_API_KEY',
      },
    });

    if (!response.ok) {
      throw new Error('Network error');
    }

    console.log('Upload successful');
  } catch (error) {
    console.error('Upload failed:', error);
  }
}
