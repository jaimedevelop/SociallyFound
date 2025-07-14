import React from 'react';
import { User, Building } from 'lucide-react';

interface UserTypeSelectorProps {
  selectedType: 'influencer' | 'brand';
  onTypeChange: (type: 'influencer' | 'brand') => void;
  className?: string;
}

export const UserTypeSelector: React.FC<UserTypeSelectorProps> = ({
  selectedType,
  onTypeChange,
  className = ''
}) => {
  return (
    <div className={`space-y-4 ${className}`}>
      <p className="text-sm md:text-base font-medium text-gray-700 text-center">
        I am a:
      </p>
      <div className="grid grid-cols-2 gap-3 md:gap-4">
        <label 
          className={`flex flex-col items-center justify-center p-4 md:p-6 border-2 rounded-xl cursor-pointer transition-all min-h-[80px] md:min-h-[100px] ${
            selectedType === 'influencer' 
              ? 'border-indigo-600 bg-indigo-50 shadow-lg' 
              : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
          }`}
        >
          <input
            type="radio"
            name="userType"
            value="influencer"
            checked={selectedType === 'influencer'}
            onChange={(e) => onTypeChange(e.target.value as 'influencer' | 'brand')}
            className="sr-only"
          />
          <User className={`w-6 h-6 md:w-8 md:h-8 mb-2 ${
            selectedType === 'influencer' ? 'text-indigo-600' : 'text-gray-400'
          }`} />
          <span className={`text-sm md:text-base font-medium ${
            selectedType === 'influencer' ? 'text-indigo-900' : 'text-gray-700'
          }`}>
            Creator
          </span>
          <span className={`text-xs text-center mt-1 ${
            selectedType === 'influencer' ? 'text-indigo-700' : 'text-gray-500'
          }`}>
            Content creator, influencer
          </span>
        </label>
        
        <label 
          className={`flex flex-col items-center justify-center p-4 md:p-6 border-2 rounded-xl cursor-pointer transition-all min-h-[80px] md:min-h-[100px] ${
            selectedType === 'brand' 
              ? 'border-indigo-600 bg-indigo-50 shadow-lg' 
              : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
          }`}
        >
          <input
            type="radio"
            name="userType"
            value="brand"
            checked={selectedType === 'brand'}
            onChange={(e) => onTypeChange(e.target.value as 'influencer' | 'brand')}
            className="sr-only"
          />
          <Building className={`w-6 h-6 md:w-8 md:h-8 mb-2 ${
            selectedType === 'brand' ? 'text-indigo-600' : 'text-gray-400'
          }`} />
          <span className={`text-sm md:text-base font-medium ${
            selectedType === 'brand' ? 'text-indigo-900' : 'text-gray-700'
          }`}>
            Brand
          </span>
          <span className={`text-xs text-center mt-1 ${
            selectedType === 'brand' ? 'text-indigo-700' : 'text-gray-500'
          }`}>
            Business, agency
          </span>
        </label>
      </div>
    </div>
  );
};