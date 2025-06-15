
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, User, Stethoscope, GraduationCap, Phone, Mail } from 'lucide-react';
import { useState } from 'react';
import AppointmentForm from './AppoinmentForm';

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  hospital: string;
  city: string;
  status: string;
  timing: string;
  qualifications: string;
  experience: string;
  lastUpdated: string;
  phone?: string;
  email?: string;
  photo?: string;
}

interface DoctorProfileModalProps {
  doctor: Doctor | null;
  isOpen: boolean;
  onClose: () => void;
}

const DoctorProfileModal = ({ doctor, isOpen, onClose }: DoctorProfileModalProps) => {
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);

  if (!doctor) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'unavailable':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'on-leave':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'available':
        return '🟢';
      case 'unavailable':
        return '🔴';
      case 'on-leave':
        return '🟡';
      default:
        return '⚪';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available':
        return 'Available';
      case 'unavailable':
        return 'Unavailable';
      case 'on-leave':
        return 'On Leave';
      default:
        return 'Unknown';
    }
  };

  const handleAppointmentSuccess = () => {
    setShowAppointmentForm(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-blue-600">
            Doctor Profile
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Doctor Header */}
          <div className="flex items-start space-x-4">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
              {doctor.photo ? (
                <img src={doctor.photo} alt={doctor.name} className="w-20 h-20 rounded-full object-cover" />
              ) : (
                <User className="w-10 h-10 text-blue-600" />
              )}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900">{doctor.name}</h2>
              <div className="flex items-center space-x-2 mt-1">
                <Stethoscope className="w-4 h-4 text-gray-400" />
                <span className="text-lg text-gray-600">{doctor.specialty}</span>
              </div>
              <Badge className={`${getStatusColor(doctor.status)} border mt-2`}>
                {getStatusIcon(doctor.status)} {getStatusText(doctor.status)}
              </Badge>
            </div>
          </div>

          {/* Doctor Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Professional Details</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <GraduationCap className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{doctor.qualifications}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{doctor.experience} experience</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Working Hours</h3>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{doctor.timing}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Hospital Details</h3>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{doctor.hospital}, {doctor.city}</span>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Contact Information</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{doctor.phone || '+91 98765 43210'}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{doctor.email || `${doctor.name.toLowerCase().replace(' ', '.')}@${doctor.hospital.toLowerCase().replace(' ', '')}.com`}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Status Update */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">
              Last updated: {doctor.lastUpdated}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4 border-t">
            {doctor.status === 'available' ? (
              <Button 
                onClick={() => setShowAppointmentForm(true)}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                Make Appointment
              </Button>
            ) : (
              <Button 
                disabled
                className="flex-1"
                variant="outline"
              >
                {doctor.status === 'on-leave' ? 'Doctor on Leave' : 'Currently Unavailable'}
              </Button>
            )}
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>

        {/* Appointment Form */}
        {showAppointmentForm && (
          <AppointmentForm 
            doctor={doctor} 
            onClose={() => setShowAppointmentForm(false)}
            onSuccess={handleAppointmentSuccess}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DoctorProfileModal;
