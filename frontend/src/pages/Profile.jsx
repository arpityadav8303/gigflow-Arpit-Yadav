import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../hooks/useAuth';
import { updateProfile } from '../store/slices/authSlice';
import { User, Mail, Calendar, Save } from 'lucide-react';
import Card from '../components/Common/Card';
import Button from '../components/Common/Button';
import Input from '../components/Common/Input';
import toast from 'react-hot-toast';
import { formatters } from '../utils/formatters';

const Profile = () => {
    const { user, loading } = useAuth();
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        bio: '',
        skills: '',
        hourlyRate: ''
    });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                bio: user.bio || '',
                skills: user.skills ? user.skills.join(', ') : '',
                hourlyRate: user.hourlyRate || ''
            });
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const skillsArray = formData.skills.split(',').map(skill => skill.trim()).filter(Boolean);
            await dispatch(updateProfile({
                ...formData,
                skills: skillsArray
            })).unwrap();
            setIsEditing(false);
            toast.success('Profile updated successfully');
        } catch (error) {
            toast.error(error.message || 'Failed to update profile');
        }
    };

    if (loading) {
        return <div className="text-center py-12">Loading...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
                    <p className="text-gray-600">Manage your account information and preferences</p>
                </div>
                {!isEditing && (
                    <Button onClick={() => setIsEditing(true)}>
                        Edit Profile
                    </Button>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* User Card */}
                <div className="md:col-span-1">
                    <Card>
                        <div className="text-center">
                            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-3xl font-bold text-blue-600">
                                    {user?.name?.charAt(0).toUpperCase()}
                                </span>
                            </div>
                            <h2 className="text-xl font-bold text-gray-900">{user?.name}</h2>
                            <p className="text-gray-500">{user?.roles?.join(', ')}</p>

                            <div className="mt-6 border-t pt-6 text-left space-y-3">
                                <div className="flex items-center text-gray-600">
                                    <User size={18} className="mr-3" />
                                    <span>Member since {formatters.date(user?.createdAt)}</span>
                                </div>
                                <div className="flex items-center text-gray-600">
                                    <Mail size={18} className="mr-3" />
                                    <span>{user?.email}</span>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Profile Form */}
                <div className="md:col-span-2">
                    <Card>
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Input
                                        label="Full Name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        icon={User}
                                    />
                                    <Input
                                        label="Email Address"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        disabled={true}
                                        icon={Mail}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">
                                        Bio
                                    </label>
                                    <textarea
                                        id="bio"
                                        name="bio"
                                        rows={4}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                                        placeholder="Tell us about yourself..."
                                        value={formData.bio}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Input
                                        label="Skills (comma separated)"
                                        name="skills"
                                        value={formData.skills}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        placeholder="React, Node.js, Design..."
                                    />
                                    <Input
                                        label="Hourly Rate ($)"
                                        name="hourlyRate"
                                        type="number"
                                        value={formData.hourlyRate}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        min="0"
                                    />
                                </div>

                                {isEditing && (
                                    <div className="flex justify-end space-x-4 pt-4 border-t">
                                        <Button
                                            variant="ghost"
                                            type="button"
                                            onClick={() => setIsEditing(false)}
                                        >
                                            Cancel
                                        </Button>
                                        <Button type="submit" icon={Save}>
                                            Save Changes
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </form>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Profile;