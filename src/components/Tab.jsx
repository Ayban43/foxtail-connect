import React, { useState } from 'react';
import supabase from '../config/supabaseClient';

const Tab = ({ tabTitle }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [swiftAnalysis, setSwiftAnalysis] = useState('');

  const handleFileInput = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSwiftAnalysisChange = (event) => {
    setSwiftAnalysis(event.target.value);
  };

  const handleUpload = async () => {
    if (selectedFile) {
      const { data, error } = await supabase.storage.from('uploads').upload(selectedFile.name, selectedFile);

      if (error) {
        console.error(error);
        return;
      }

      console.log('File uploaded successfully:', data.Key);
    }
  };

  return (
    <div className="p-4">
      <h3 className="text-lg font-medium">{tabTitle}</h3>
      <div className="mt-4">
        <label htmlFor="file-upload" className="block mb-2 font-medium text-gray-700">
          Upload file:
        </label>
        <input id="file-upload" type="file" onChange={handleFileInput} />
        <button onClick={handleUpload} className="px-4 py-2 mt-4 text-white bg-indigo-500 rounded hover:bg-indigo-600">
          Upload
        </button>
      </div>
      <div className="mt-4">
        <label htmlFor="swift-analysis" className="block mb-2 font-medium text-gray-700">
          Swift analysis:
        </label>
        <textarea
          id="swift-analysis"
          value={swiftAnalysis}
          onChange={handleSwiftAnalysisChange}
          className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-indigo-500"
        ></textarea>
      </div>
    </div>
  );
};

export default Tab;
