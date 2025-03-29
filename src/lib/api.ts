const API_URL = '/api';  // Use relative path for proxy

export const analyzeHandwriting = async (file: File, metadata: {
  age: string;
  learning_style: string;
  challenges: string[];
  goals: string[];
}) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('age', metadata.age);
    formData.append('learning_style', metadata.learning_style);
    formData.append('challenges', JSON.stringify(metadata.challenges));
    formData.append('goals', JSON.stringify(metadata.goals));

    const response = await fetch(`${API_URL}/analyze/handwriting`, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json',
      },
    });

    const data = await response.json();
    console.log('Server response:', data);

    if (!response.ok) {
      throw new Error(data.error || 'Failed to analyze handwriting');
    }

    return data;
  } catch (error) {
    console.error('Handwriting analysis error:', error);
    throw error;
  }
};
