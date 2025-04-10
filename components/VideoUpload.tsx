import React, { useState, useCallback } from 'react';
import { Upload, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function VideoUpload() {
  const navigate = useNavigate();
  const [videos, setVideos] = useState<File[]>([]);
  const [isTraining, setIsTraining] = useState(false);
  const [isModelTrained, setIsModelTrained] = useState(false);
  const [submittedVideos, setSubmittedVideos] = useState<string[]>([]);
  const [selectedExercise, setSelectedExercise] = useState('');
  const [showTrainingComplete, setShowTrainingComplete] = useState(false);

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const videoFiles = files.filter(file => file.type.startsWith('video/'));
    setVideos(prev => [...prev, ...videoFiles]);
    setIsModelTrained(false);
  }, []);

  const handleTraining = useCallback(async () => {
    if (videos.length === 0 || !selectedExercise) return;
    
    setIsTraining(true);
    // Simulate training process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setSubmittedVideos(prev => [...prev, ...videos.map(v => `${v.name} (${selectedExercise})`)]);
    setVideos([]);
    setIsModelTrained(true);
    setIsTraining(false);
    setShowTrainingComplete(true);
  }, [videos, selectedExercise]);

  const handleTrainingComplete = () => {
    setShowTrainingComplete(false);
    navigate('/compare');
  };

  const removeVideo = useCallback((index: number) => {
    setVideos(prev => prev.filter((_, i) => i !== index));
  }, []);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Video Upload Training</h1>
        <p className="mt-2 text-gray-600">Upload your videos to train the model</p>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">Select Exercise</label>
        <select
          value={selectedExercise}
          onChange={(e) => setSelectedExercise(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="">-- Select Exercise --</option>
          <option value="Pushup">Push-up</option>
          <option value="Squat">Squat</option>
          <option value="Planks">Planks</option>
          <option value="Crunches">Crunches</option>
          <option value="Bicep Curls">Bicep Curls</option>
          <option value="Jumping Jacks">Jumping Jacks</option>
        </select>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <label 
          htmlFor="video-upload"
          className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer"
        >
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <span className="mt-2 block text-sm font-semibold text-gray-900">
            Click to upload videos
          </span>
          <span className="mt-2 block text-sm text-gray-500">
            MP4, WebM, or OGG files accepted
          </span>
          <input
            id="video-upload"
            type="file"
            className="hidden"
            accept="video/*"
            multiple
            onChange={handleFileChange}
          />
        </label>
      </div>

      {submittedVideos.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Submitted Videos</h2>
          <ul className="divide-y divide-gray-200">
            {submittedVideos.map((videoName, index) => (
              <li key={index} className="py-3 flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-sm text-gray-900">{videoName}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {videos.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Selected Videos</h2>
          <ul className="divide-y divide-gray-200">
            {videos.map((video, index) => (
              <li key={index} className="py-3 flex justify-between items-center">
                <span className="text-sm text-gray-900">{video.name}</span>
                <button
                  onClick={() => removeVideo(index)}
                  className="text-red-600 hover:text-red-800 text-sm font-medium"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex justify-center">
        <button
          onClick={handleTraining}
          disabled={videos.length === 0 || isTraining || !selectedExercise}
          className={`px-6 py-3 rounded-md text-white font-medium flex items-center gap-2
            ${videos.length === 0 || isTraining || !selectedExercise
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
        >
          {isTraining ? 'Training Model...' : 'Train Model'}
        </button>
      </div>

      {showTrainingComplete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <div className="text-center">
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Model Training Complete
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Your model has been successfully trained with the uploaded videos for {selectedExercise}.
              </p>
              <button
                onClick={handleTrainingComplete}
                className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default VideoUpload;