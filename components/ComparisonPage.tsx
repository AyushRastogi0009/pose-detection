import React, { useState, useCallback, useEffect } from 'react';
import { Upload, FileVideo } from 'lucide-react';

type ComparisonMode = 'pretrained' | 'reference' | null;

interface ComparisonPageProps {
  defaultMode?: ComparisonMode;
}

function ComparisonPage({ defaultMode = null }: ComparisonPageProps) {
  const [mode, setMode] = useState<ComparisonMode>(defaultMode);
  const [video1, setVideo1] = useState<File | null>(null);
  const [video2, setVideo2] = useState<File | null>(null);
  const [similarityScore, setSimilarityScore] = useState<number | null>(null);
  const [isComparing, setIsComparing] = useState(false);

  useEffect(() => {
    setMode(defaultMode);
  }, [defaultMode]);

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>, isSecondVideo: boolean = false) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('video/')) {
      if (isSecondVideo) {
        setVideo2(file);
      } else {
        setVideo1(file);
      }
    }
  }, []);

  const handleComparison = useCallback(async () => {
    setIsComparing(true);
    
    try {
      const formData = new FormData();
      if (mode === 'pretrained' && video1) {
        formData.append('video', video1);
      } else if (mode === 'reference' && video1 && video2) {
        formData.append('reference', video1);
        formData.append('comparison', video2);
      }

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real implementation, this would be the response from your API
      const score = Math.floor(Math.random() * (30) + 70); // Random score between 70-100
      setSimilarityScore(score);
    } catch (error) {
      console.error('Error during comparison:', error);
    } finally {
      setIsComparing(false);
    }
  }, [mode, video1, video2]);

  const renderUploadSection = (label: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, selectedFile: File | null = null) => (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <label className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer">
        {selectedFile ? (
          <>
            <FileVideo className="mx-auto h-12 w-12 text-indigo-500" />
            <span className="mt-2 block text-sm font-semibold text-gray-900">
              {selectedFile.name}
            </span>
            <span className="mt-1 block text-sm text-gray-500">
              Click to change video
            </span>
          </>
        ) : (
          <>
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <span className="mt-2 block text-sm font-semibold text-gray-900">
              {label}
            </span>
            <span className="mt-2 block text-sm text-gray-500">
              MP4, WebM, or OGG files accepted
            </span>
          </>
        )}
        <input
          type="file"
          className="hidden"
          accept="video/*"
          onChange={onChange}
        />
      </label>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto">
      {mode === 'pretrained' && (
        <div>
          <h2 className="text-2xl font-bold text-center mb-8">Compare with Pre-trained Model</h2>
          {renderUploadSection('Upload video to compare', (e) => handleFileChange(e), video1)}
          
          {video1 && (
            <div className="text-center">
              <button
                onClick={handleComparison}
                disabled={isComparing}
                className={`px-6 py-3 rounded-md text-white font-medium
                  ${isComparing ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'}`}
              >
                {isComparing ? 'Comparing...' : 'Compare Video'}
              </button>
            </div>
          )}
        </div>
      )}

      {mode === 'reference' && (
        <div>
          <h2 className="text-2xl font-bold text-center mb-8">Compare with Reference Video</h2>
          {renderUploadSection('Upload reference video', (e) => handleFileChange(e), video1)}
          {video1 && renderUploadSection('Upload video to compare', (e) => handleFileChange(e, true), video2)}
          
          {video1 && video2 && (
            <div className="text-center">
              <button
                onClick={handleComparison}
                disabled={isComparing}
                className={`px-6 py-3 rounded-md text-white font-medium
                  ${isComparing ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'}`}
              >
                {isComparing ? 'Comparing...' : 'Compare Videos'}
              </button>
            </div>
          )}
        </div>
      )}

      {similarityScore !== null && (
        <div className="mt-8 p-6 bg-white rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Comparison Results</h3>
          <div className="flex items-center justify-between">
            <span className="text-gray-700">Similarity Score:</span>
            <span className={`text-2xl font-bold ${
              similarityScore >= 90 ? 'text-green-600' :
              similarityScore >= 80 ? 'text-blue-600' :
              'text-yellow-600'
            }`}>
              {similarityScore}%
            </span>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            {similarityScore >= 90 ? 'Excellent match!' :
             similarityScore >= 80 ? 'Good match with room for improvement' :
             'Fair match - consider reviewing the technique'}
          </div>
        </div>
      )}
    </div>
  );
}

export default ComparisonPage;