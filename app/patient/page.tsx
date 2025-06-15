'use client';
import { useState, useMemo } from 'react';
import { Search, Filter, MapPin, Clock, User, Stethoscope } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import DoctorProfileModal from '@/components/DoctorProfileModal';
import { doctorsData } from '@/constant/doctors';
const CustomerPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedHospital, setSelectedHospital] = useState('all');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedDoctor, setSelectedDoctor] = useState<typeof doctorsData[0] | null>(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const cities = [...new Set(doctorsData.map(doc => doc.city))];
  const hospitals = [...new Set(doctorsData.map(doc => doc.hospital))];
  const specialties = [...new Set(doctorsData.map(doc => doc.specialty))];

  const filteredDoctors = useMemo(() => {
    return doctorsData.filter(doctor => {
      const matchesSearch = 
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.hospital.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.city.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCity = selectedCity === 'all' || doctor.city === selectedCity;
      const matchesHospital = selectedHospital === 'all' || doctor.hospital === selectedHospital;
      const matchesSpecialty = selectedSpecialty === 'all' || doctor.specialty === selectedSpecialty;
      const matchesStatus = selectedStatus === 'all' || doctor.status === selectedStatus;

      return matchesSearch && matchesCity && matchesHospital && matchesSpecialty && matchesStatus;
    });
  }, [searchTerm, selectedCity, selectedHospital, selectedSpecialty, selectedStatus]);

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

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCity('all');
    setSelectedHospital('all');
    setSelectedSpecialty('all');
    setSelectedStatus('all');
  };

  const handleViewProfile = (doctor: typeof doctorsData[0]) => {
    setSelectedDoctor(doctor);
    setIsProfileModalOpen(true);
  };

  const availableCount = filteredDoctors.filter(d => d.status === 'available').length;
  const totalCount = filteredDoctors.length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-blue-600">DocCheck</h1>
              <p className="text-gray-600 mt-1">Find doctors available right now</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-green-600">{availableCount}</div>
              <div className="text-sm text-gray-500">doctors available</div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search doctors, hospitals, specialties..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* City Filter */}
            <Select value={selectedCity} onValueChange={setSelectedCity}>
              <SelectTrigger>
                <SelectValue placeholder="City" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="all">All Cities</SelectItem>
                {cities.map(city => (
                  <SelectItem key={city} value={city}>{city}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Hospital Filter */}
            <Select value={selectedHospital} onValueChange={setSelectedHospital}>
              <SelectTrigger>
                <SelectValue placeholder="Hospital" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="all">All Hospitals</SelectItem>
                {hospitals.map(hospital => (
                  <SelectItem key={hospital} value={hospital}>{hospital}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Specialty Filter */}
            <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
              <SelectTrigger>
                <SelectValue placeholder="Specialty" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="all">All Specialties</SelectItem>
                {specialties.map(specialty => (
                  <SelectItem key={specialty} value={specialty}>{specialty}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Status Filter */}
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="available">🟢 Available</SelectItem>
                <SelectItem value="unavailable">🔴 Unavailable</SelectItem>
                <SelectItem value="on-leave">🟡 On Leave</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Clear Filters */}
          <div className="flex justify-between items-center mt-4 pt-4 border-t">
            <Button variant="outline" onClick={clearFilters} className="text-sm">
              <Filter className="w-4 h-4 mr-2" />
              Clear Filters
            </Button>
            <p className="text-sm text-gray-500">
              Showing {totalCount} doctors
            </p>
          </div>
        </div>

        {/* Status Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="text-2xl">🟢</div>
                <div>
                  <div className="text-2xl font-bold text-green-700">
                    {doctorsData.filter(d => d.status === 'available').length}
                  </div>
                  <div className="text-sm text-green-600">Available Now</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="text-2xl">🔴</div>
                <div>
                  <div className="text-2xl font-bold text-red-700">
                    {doctorsData.filter(d => d.status === 'unavailable').length}
                  </div>
                  <div className="text-sm text-red-600">Currently Unavailable</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-yellow-200 bg-yellow-50">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="text-2xl">🟡</div>
                <div>
                  <div className="text-2xl font-bold text-yellow-700">
                    {doctorsData.filter(d => d.status === 'on-leave').length}
                  </div>
                  <div className="text-sm text-yellow-600">On Leave</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Doctor Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map(doctor => (
            <Card key={doctor.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{doctor.name}</CardTitle>
                      <p className="text-sm text-gray-500">{doctor.hospital}</p>
                      <p className="text-xs text-gray-600">{doctor.qualifications}</p>
                    </div>
                  </div>
                  <Badge className={`${getStatusColor(doctor.status)} border`}>
                    {getStatusIcon(doctor.status)} {getStatusText(doctor.status)}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2 text-sm">
                  <Stethoscope className="w-4 h-4 text-gray-400" />
                  <span className="font-medium">{doctor.specialty}</span>
                </div>

                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span>{doctor.hospital}, {doctor.city}</span>
                </div>

                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span>{doctor.timing}</span>
                </div>

                <div className="pt-2 border-t">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">
                      {doctor.experience} experience
                    </span>
                    <span className="text-xs text-gray-400">
                      Updated {doctor.lastUpdated}
                    </span>
                  </div>
                </div>

                <Button 
                  className="w-full mt-3" 
                  variant={doctor.status === 'available' ? 'default' : 'outline'}
                  onClick={() => handleViewProfile(doctor)}
                >
                  View Profile
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredDoctors.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No doctors found</h3>
            <p className="text-gray-500 mb-4">
              Try adjusting your search criteria or clearing filters
            </p>
            <Button onClick={clearFilters} variant="outline">
              Clear All Filters
            </Button>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">DocCheck</h3>
            <p className="text-gray-600 text-sm mb-4">
              Real-time doctor availability at your fingertips
            </p>
            <p className="text-xs text-gray-500">
              Data updated in real-time from hospital systems. For emergencies, call 102.
            </p>
          </div>
        </div>
      </footer>

      {/* Doctor Profile Modal */}
      <DoctorProfileModal 
        doctor={selectedDoctor}
        isOpen={isProfileModalOpen}
        onClose={() => {
          setIsProfileModalOpen(false);
          setSelectedDoctor(null);
        }}
      />
    </div>
  );
};

export default CustomerPage;
