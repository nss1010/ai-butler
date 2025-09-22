import React, { useState } from 'react';
import { FamilyMember, FamilyAvatar } from '../types';
import { PlusIcon, XCircleIcon, ManIcon, WomanIcon, ChildIcon, GrandfatherIcon, GrandmotherIcon, PencilIcon } from './icons';
import { useLanguage } from '../LanguageProvider';

interface FamilyProfileProps {
    members: FamilyMember[];
    onAddMember: (member: Omit<FamilyMember, 'id'>) => void;
    onUpdateMember: (member: FamilyMember) => void;
    onRemoveMember: (id: string) => void;
}

const AvatarPicker: React.FC<{ onSelect: (avatar: FamilyAvatar) => void }> = ({ onSelect }) => {
    const { t } = useLanguage();
    const avatars: { type: FamilyAvatar; icon: React.FC<React.SVGProps<SVGSVGElement>>; label: string }[] = [
        { type: 'man', icon: ManIcon, label: t('familyProfile.defaultDad') },
        { type: 'woman', icon: WomanIcon, label: t('familyProfile.defaultMom') },
        { type: 'child', icon: ChildIcon, label: t('familyProfile.defaultChild') },
        { type: 'grandfather', icon: GrandfatherIcon, label: t('familyProfile.defaultGrandfather') },
        { type: 'grandmother', icon: GrandmotherIcon, label: t('familyProfile.defaultGrandmother') },
    ];

    return (
        <div className="grid grid-cols-3 gap-4">
            {avatars.map(({ type, icon: Icon, label }) => (
                <div key={type} onClick={() => onSelect(type)} className="cursor-pointer flex flex-col items-center p-3 rounded-lg hover:bg-indigo-100 dark:hover:bg-gray-700 border-2 border-transparent hover:border-indigo-300 dark:hover:border-brand-primary transition-colors">
                    <Icon className="w-16 h-16 text-brand-primary" />
                    <span className="mt-2 text-sm font-semibold text-gray-700 dark:text-gray-300">{label}</span>
                </div>
            ))}
        </div>
    );
};

const TagSelector: React.FC<{ title: string; options: string[]; value: string; onValueChange: (value: string) => void }> = ({ title, options, value, onValueChange }) => {
    const handleTagClick = (tag: string) => {
        const values = value ? value.split(',').map(s => s.trim()) : [];
        if (!values.some(v => v.toLowerCase() === tag.toLowerCase())) {
            onValueChange(value ? `${value}, ${tag}` : tag);
        }
    };

    return (
        <div className="mt-2 mb-3">
            <h4 className="font-semibold text-xs text-gray-600 dark:text-gray-400 mb-2">{title}</h4>
            <div className="flex flex-wrap gap-1.5">
                {options.map(option => (
                    <button
                        key={option}
                        onClick={() => handleTagClick(option)}
                        className="px-2.5 py-1 bg-indigo-100 text-indigo-800 text-xs font-medium rounded-full hover:bg-indigo-200 dark:bg-indigo-900/50 dark:text-indigo-200 dark:hover:bg-indigo-800/50 transition-colors"
                    >
                        + {option}
                    </button>
                ))}
            </div>
        </div>
    );
};

const FamilyProfile: React.FC<FamilyProfileProps> = ({ members, onAddMember, onUpdateMember, onRemoveMember }) => {
    const { t, t_raw } = useLanguage();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalStep, setModalStep] = useState<'pick' | 'form'>('pick');
    const [currentMember, setCurrentMember] = useState<Omit<FamilyMember, 'id'> | FamilyMember | null>(null);

    const cuisineOptions = (t_raw('familyProfile.tagOptions.cuisine') || []) as string[];
    const allergiesOptions = (t_raw('familyProfile.tagOptions.allergies') || []) as string[];
    const restrictionsOptions = (t_raw('familyProfile.tagOptions.restrictions') || []) as string[];

    const handleOpenAddModal = () => {
        setCurrentMember(null);
        setModalStep('pick');
        setIsModalOpen(true);
    };
    
    const handleOpenEditModal = (member: FamilyMember) => {
        setCurrentMember(member);
        setModalStep('form');
        setIsModalOpen(true);
    };

    const handleSelectAvatar = (avatar: FamilyAvatar) => {
        setCurrentMember({
            name: '',
            avatar,
            ethnicity: '',
            allergies: '',
            restrictions: '',
        });
        setModalStep('form');
    };

    const handleSave = () => {
        if (!currentMember || !currentMember.name) return;
        
        if ('id' in currentMember) {
            onUpdateMember(currentMember);
        } else {
            onAddMember(currentMember);
        }
        setIsModalOpen(false);
        setCurrentMember(null);
    };
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (currentMember) {
            setCurrentMember({ ...currentMember, [e.target.name]: e.target.value });
        }
    };

    const handleTagValueChange = (fieldName: 'ethnicity' | 'allergies' | 'restrictions', newValue: string) => {
        if (currentMember) {
            setCurrentMember({ ...currentMember, [fieldName]: newValue });
        }
    };

    const renderAvatar = (avatar: FamilyAvatar, props: React.SVGProps<SVGSVGElement>) => {
        const icons: { [key in FamilyAvatar]: React.FC<React.SVGProps<SVGSVGElement>> } = {
            man: ManIcon,
            woman: WomanIcon,
            child: ChildIcon,
            grandfather: GrandfatherIcon,
            grandmother: GrandmotherIcon,
        };
        const Icon = icons[avatar];
        return <Icon {...props} />;
    }

    return (
        <div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {members.map(member => (
                    <div key={member.id} className="relative group flex flex-col items-center p-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
                        <div className="absolute top-1 right-1 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => handleOpenEditModal(member)} className="p-1 rounded-full bg-gray-200 dark:bg-gray-600 hover:bg-blue-200 dark:hover:bg-blue-900/50 text-blue-600 dark:text-blue-400">
                                <PencilIcon className="w-4 h-4" />
                            </button>
                            <button onClick={() => onRemoveMember(member.id)} className="p-1 rounded-full bg-gray-200 dark:bg-gray-600 hover:bg-red-200 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400">
                                <XCircleIcon className="w-4 h-4" />
                            </button>
                        </div>
                        {renderAvatar(member.avatar, { className: "w-20 h-20 text-brand-primary"})}
                        <p className="mt-2 font-bold text-center truncate w-full">{member.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 text-center truncate w-full">{member.allergies || 'No allergies'}</p>
                    </div>
                ))}
                <button 
                    onClick={handleOpenAddModal} 
                    className="flex flex-col items-center justify-center p-3 rounded-lg border-2 border-dashed border-gray-400 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:border-brand-primary hover:text-brand-primary transition-colors shadow-sm"
                >
                    <PlusIcon className="w-12 h-12"/>
                    <span className="mt-2 font-semibold">{t('familyProfile.addButton')}</span>
                </button>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setIsModalOpen(false)}>
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md" onClick={e => e.stopPropagation()}>
                        <div className="p-6">
                             <h3 className="font-bold text-xl mb-4 text-center text-gray-900 dark:text-gray-100">
                                {modalStep === 'pick' ? t('familyProfile.selectAvatarTitle') : (currentMember && 'id' in currentMember ? t('familyProfile.editMemberTitle') : t('familyProfile.addMemberTitle'))}
                            </h3>

                            {modalStep === 'pick' ? (
                                <AvatarPicker onSelect={handleSelectAvatar} />
                            ) : currentMember && (
                                <div className="space-y-4">
                                     <div className="flex justify-center mb-4">
                                        {renderAvatar(currentMember.avatar, { className: "w-24 h-24 text-brand-primary p-2 bg-brand-light dark:bg-gray-700 rounded-full border-2 border-brand-primary"})}
                                     </div>
                                    <input type="text" name="name" value={currentMember.name} onChange={handleChange} placeholder={t('familyProfile.namePlaceholder')} className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-brand-primary focus:border-brand-primary" />
                                    
                                    <input type="text" name="ethnicity" value={currentMember.ethnicity} onChange={handleChange} placeholder={t('familyProfile.ethnicityPlaceholder')} className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-brand-primary focus:border-brand-primary" />
                                    <TagSelector title={t('familyProfile.tagOptions.cuisineTitle')} options={cuisineOptions} value={currentMember.ethnicity} onValueChange={(v) => handleTagValueChange('ethnicity', v)} />

                                    <textarea name="allergies" value={currentMember.allergies} onChange={handleChange} placeholder={t('familyProfile.allergiesPlaceholder')} className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-brand-primary focus:border-brand-primary" rows={2}></textarea>
                                    <TagSelector title={t('familyProfile.tagOptions.allergiesTitle')} options={allergiesOptions} value={currentMember.allergies} onValueChange={(v) => handleTagValueChange('allergies', v)} />

                                    <textarea name="restrictions" value={currentMember.restrictions} onChange={handleChange} placeholder={t('familyProfile.restrictionsPlaceholder')} className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-brand-primary focus:border-brand-primary" rows={2}></textarea>
                                    <TagSelector title={t('familyProfile.tagOptions.restrictionsTitle')} options={restrictionsOptions} value={currentMember.restrictions} onValueChange={(v) => handleTagValueChange('restrictions', v)} />

                                </div>
                            )}
                        </div>
                         <div className="bg-gray-100 dark:bg-gray-900 p-4 flex justify-end gap-2 rounded-b-lg">
                            <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500">Cancel</button>
                            {modalStep === 'form' && <button onClick={handleSave} disabled={!currentMember?.name} className="px-4 py-2 bg-brand-primary text-white rounded-lg hover:bg-brand-dark disabled:bg-indigo-300">{t('familyProfile.saveButton')}</button>}
                         </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FamilyProfile;