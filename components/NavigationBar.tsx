import React from 'react';
import { NavLink } from 'react-router-dom';
import { Upload, GitCompare } from 'lucide-react';

function NavigationBar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center h-16">
          <div className="flex space-x-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  isActive
                    ? 'border-indigo-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`
              }
            >
              <Upload className="h-5 w-5 mr-2" />
              Upload Video
            </NavLink>
            
            <NavLink
              to="/compare/pretrained"
              className={({ isActive }) =>
                `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  isActive
                    ? 'border-indigo-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`
              }
            >
              <GitCompare className="h-5 w-5 mr-2" />
              Compare with Pre-trained Model
            </NavLink>

            <NavLink
              to="/compare/reference"
              className={({ isActive }) =>
                `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  isActive
                    ? 'border-indigo-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`
              }
            >
              <GitCompare className="h-5 w-5 mr-2" />
              Compare with Reference
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavigationBar;