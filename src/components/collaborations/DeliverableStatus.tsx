// components/collaborations/DeliverableStatus.tsx
import React from 'react';
import { 
  CheckCircle, 
  Clock, 
  Upload, 
  AlertTriangle 
} from 'lucide-react';

interface Deliverable {
  type: string;
  status: string;
  dueDate?: string;
  submittedAt?: string;
  approved?: boolean;
}

interface DeliverableStatusProps {
  deliverables: Deliverable[];
  isInfluencer: boolean;
  onAction?: (deliverable: Deliverable, action: string) => void;
}

export const DeliverableStatus: React.FC<DeliverableStatusProps> = ({
  deliverables,
  isInfluencer,
  onAction
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'in_progress': return 'text-blue-600 bg-blue-100';
      case 'submitted': return 'text-orange-600 bg-orange-100';
      case 'pending': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'submitted':
        return <Upload className="w-4 h-4 text-orange-600" />;
      case 'in_progress':
        return <Clock className="w-4 h-4 text-blue-600" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-gray-600" />;
    }
  };

  if (isInfluencer) {
    return (
      <div className="space-y-3">
        {deliverables.map((deliverable, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-full ${
                deliverable.status === 'completed' ? 'bg-green-100' :
                deliverable.status === 'submitted' ? 'bg-orange-100' :
                deliverable.status === 'in_progress' ? 'bg-blue-100' : 'bg-gray-100'
              }`}>
                {getStatusIcon(deliverable.status)}
              </div>
              <div>
                <div className="font-medium text-gray-900">{deliverable.type}</div>
                <div className="text-sm text-gray-500">
                  {deliverable.dueDate && `Due: ${new Date(deliverable.dueDate).toLocaleDateString()}`}
                </div>
              </div>
            </div>
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(deliverable.status)}`}>
              {deliverable.status.replace('_', ' ')}
            </span>
          </div>
        ))}
      </div>
    );
  }

  // Brand view
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {deliverables.map((deliverable, index) => (
        <div key={index} className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <h5 className="font-medium text-gray-900">{deliverable.type}</h5>
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(deliverable.status)}`}>
              {deliverable.status}
            </span>
          </div>
          {deliverable.submittedAt && (
            <p className="text-sm text-gray-500 mb-2">
              Submitted: {new Date(deliverable.submittedAt).toLocaleDateString()}
            </p>
          )}
          {deliverable.dueDate && (
            <p className="text-sm text-gray-500 mb-2">
              Due: {new Date(deliverable.dueDate).toLocaleDateString()}
            </p>
          )}
          
          {deliverable.status === 'submitted' && (
            <div className="flex space-x-2 mt-3">
              <button 
                className="flex-1 bg-green-600 text-white py-1 px-3 rounded text-sm hover:bg-green-700 transition-colors"
                onClick={() => onAction?.(deliverable, 'approve')}
              >
                Approve
              </button>
              <button 
                className="flex-1 bg-red-600 text-white py-1 px-3 rounded text-sm hover:bg-red-700 transition-colors"
                onClick={() => onAction?.(deliverable, 'request_changes')}
              >
                Request Changes
              </button>
            </div>
          )}
          
          {deliverable.status === 'completed' && deliverable.approved && (
            <div className="flex items-center mt-2">
              <CheckCircle className="w-4 h-4 text-green-600 mr-1" />
              <span className="text-sm text-green-600">Approved</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};