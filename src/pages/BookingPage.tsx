import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import landingMain from '../assets/landing_main.png';

type BookingStep = 'location' | 'age' | 'time' | 'form' | 'success';
type Location = 'Anyang' | 'Gwacheon';
type AgeGroup = 'Kindergarten' | 'Elementary';
type TimeSlot = {
    id: string;
    time: string;
    instructor: string;
    currentParticipants: number;
    maxParticipants: number;
};

export default function BookingPage() {
    const navigate = useNavigate();
    const [step, setStep] = useState<BookingStep>('location');
    const [location, setLocation] = useState<Location | null>(null);
    const [ageGroup, setAgeGroup] = useState<AgeGroup | null>(null);
    const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
    const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);

    const [formData, setFormData] = useState({
        childName: '',
        childAge: '', // Will be a specific age from dropdown
        guardianName: '',
        guardianPhone: '',
        guardianEmail: ''
    });
    const [loading, setLoading] = useState(false);
    const [fetchingSlots, setFetchingSlots] = useState(false);

    // Fetch slots when location and ageGroup are selected
    useEffect(() => {
        if (location && ageGroup) {
            fetchSlots(location, ageGroup);
        } else {
            setAvailableSlots([]);
        }
    }, [location, ageGroup]);

    const fetchSlots = async (loc: string, age: string) => {
        setFetchingSlots(true);
        if (!supabase) return;

        try {
            // 1. Get all classes for this location/age
            const { data: classesData, error: classesError } = await supabase
                .from('classes')
                .select('*')
                .eq('location', loc)
                .eq('class_type', age)
                .order('time', { ascending: true });

            if (classesError) throw classesError;

            if (!classesData || classesData.length === 0) {
                setAvailableSlots([]);
                setFetchingSlots(false);
                return;
            }

            // 2. Get current participant counts for each class
            const slotsWithCounts = await Promise.all(classesData.map(async (cls) => {
                const { count } = await supabase
                    .from('bookings')
                    .select('*', { count: 'exact', head: true })
                    .eq('class_time', cls.time) // Matching by time/location/type for now
                    .eq('class_location', loc)
                    .eq('class_type', age);

                return {
                    id: cls.id,
                    time: cls.time, // This is ISO string from DB
                    instructor: cls.instructor,
                    currentParticipants: count || 0,
                    maxParticipants: cls.max_participants
                };
            }));

            setAvailableSlots(slotsWithCounts);
        } catch (err) {
            console.error("Failed to fetch slots", err);
        } finally {
            setFetchingSlots(false);
        }
    };

    const handleNext = () => {
        if (step === 'location' && location) setStep('age');
        else if (step === 'age' && ageGroup) setStep('time');
        else if (step === 'time' && selectedSlot) {
            if (selectedSlot.currentParticipants >= selectedSlot.maxParticipants) {
                alert('마감된 수업입니다.');
                return;
            }
            setStep('form');
        }
    };

    const handleBack = () => {
        if (step === 'age') setStep('location');
        else if (step === 'time') setStep('age');
        else if (step === 'form') setStep('time');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!location || !ageGroup || !selectedSlot) return;

        setLoading(true);

        // Final check for capacity
        const { count } = await supabase
            .from('bookings')
            .select('*', { count: 'exact', head: true })
            .eq('class_time', selectedSlot.time)
            .eq('class_location', location)
            .eq('class_type', ageGroup);

        if (count !== null && count >= selectedSlot.maxParticipants) {
            alert('죄송합니다. 방금 마감되었습니다.');
            setLoading(false);
            // Refresh slots
            fetchSlots(location, ageGroup);
            return;
        }

        const { error } = await supabase.from('bookings').insert({
            guardian_name: formData.guardianName,
            guardian_phone: formData.guardianPhone,
            guardian_email: formData.guardianEmail,
            child_name: formData.childName,
            child_age: parseInt(formData.childAge),
            class_location: location,
            class_type: ageGroup,
            class_time: selectedSlot.time,
            instructor_name: selectedSlot.instructor
        });

        setLoading(false);

        if (error) {
            alert('신청 중 오류가 발생했습니다: ' + error.message);
        } else {
            setStep('success');
        }
    };

    const formatTime = (isoString: string) => {
        const date = new Date(isoString);
        return `${date.getMonth() + 1}월 ${date.getDate()}일 ${date.getHours()}시`;
    };

    // Age options logic
    const getAgeOptions = () => {
        if (ageGroup === 'Kindergarten') return [5, 6, 7];
        if (ageGroup === 'Elementary') return [8, 9, 10];
        return [];
    };

    return (
        <div className="relative min-h-screen">
            {/* Background (same as LandingPage hero image) */}
            <img
                src={landingMain}
                alt="Booking Background"
                className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Readability overlay */}
            <div className="absolute inset-0 bg-white/70" />

            {/* Centered booking container */}
            <div className="relative min-h-screen flex items-center justify-center pt-24 pb-20 px-6">
                <div className="w-full max-w-2xl mx-auto bg-white/90 backdrop-blur-md rounded-3xl shadow-xl p-6 md:p-10">
                    {step !== 'success' && (
                        <div className="mb-8">
                            <div className="flex justify-between mb-4">
                                {['지역 선택', '연령 선택', '시간 선택', '정보 입력'].map((label, idx) => (
                                    <div key={idx} className={`text-xs font-bold ${['location', 'age', 'time', 'form'].indexOf(step) >= idx ? 'text-green-600' : 'text-gray-300'}`}>
                                        {label}
                                    </div>
                                ))}
                            </div>
                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-green-500 transition-all duration-300"
                                    style={{ width: `${(['location', 'age', 'time', 'form'].indexOf(step) + 1) * 25}%` }}
                                />
                            </div>
                        </div>
                    )}

                    {step === 'location' && (
                        <div>
                            <h2 className="text-2xl font-bold mb-6">어디서 수업을 할까요?</h2>
                            <div className="grid grid-cols-2 gap-4">
                                {(['Anyang', 'Gwacheon'] as Location[]).map(loc => (
                                    <button
                                        key={loc}
                                        onClick={() => setLocation(loc)}
                                        className={`p-6 rounded-xl border-2 transition text-left ${location === loc ? 'border-green-500 bg-green-50 ring-2 ring-green-200' : 'border-gray-200 hover:border-green-300'
                                            }`}
                                    >
                                        <div className="text-lg font-bold mb-1">{loc === 'Anyang' ? '📍 안양' : '📍 과천'}</div>
                                        <div className="text-sm text-gray-500">{loc === 'Anyang' ? '관악산' : '과천대공원 숲길'}</div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {step === 'age' && (
                        <div>
                            <h2 className="text-2xl font-bold mb-6">참여하는 아이의 연령대는?</h2>
                            <div className="grid grid-cols-1 gap-4">
                                {(['Kindergarten', 'Elementary'] as AgeGroup[]).map(age => (
                                    <button
                                        key={age}
                                        onClick={() => setAgeGroup(age)}
                                        className={`p-6 rounded-xl border-2 transition flex items-center gap-4 ${ageGroup === age ? 'border-green-500 bg-green-50 ring-2 ring-green-200' : 'border-gray-200 hover:border-green-300'
                                            }`}
                                    >
                                        <div className="w-32 h-32 flex-shrink-0">
                                            <img
                                                src={age === 'Kindergarten' ? '/images/kindergarden.png' : '/images/elementary.png'}
                                                alt={age}
                                                className="w-full h-full object-contain"
                                                style={{ imageRendering: '-webkit-optimize-contrast' }}
                                            />
                                        </div>
                                        <div className="text-left">
                                            <div className="text-lg font-bold">{age === 'Kindergarten' ? '유치부 (5~7세)' : '초등부 (8~10세)'}</div>
                                            <div className="text-sm text-gray-500">
                                                {age === 'Kindergarten' ? '오감 놀이 중심의 숲 체험' : '탐구와 협동 중심의 숲 활동'}
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {step === 'time' && (
                        <div>
                            <h2 className="text-2xl font-bold mb-6">원하는 시간을 선택해주세요</h2>
                            <div className="space-y-4">
                                {fetchingSlots ? (
                                    <div className="text-center py-10 text-gray-500">
                                        일정을 불러오는 중입니다...
                                    </div>
                                ) : availableSlots.length === 0 ? (
                                    <div className="text-center py-10 text-gray-500 bg-gray-50 rounded-xl">
                                        예정된 수업이 없습니다.
                                    </div>
                                ) : (
                                    availableSlots.map(slot => {
                                        const isFull = slot.currentParticipants >= slot.maxParticipants;
                                        return (
                                            <button
                                                key={slot.id}
                                                disabled={isFull}
                                                onClick={() => setSelectedSlot(slot)}
                                                className={`w-full p-4 rounded-xl border-2 transition relative ${selectedSlot?.id === slot.id
                                                    ? 'border-green-500 bg-green-50 ring-2 ring-green-200'
                                                    : isFull ? 'border-gray-100 bg-gray-50 opacity-60 cursor-not-allowed' : 'border-gray-200 hover:border-green-300'
                                                    }`}
                                            >
                                                <div className="flex justify-between items-center mb-2">
                                                    <span className="font-bold text-lg">{formatTime(slot.time)}</span>
                                                    <span className={`px-2 py-1 rounded text-xs font-bold ${isFull ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-700'
                                                        }`}>
                                                        {isFull ? '마감' : '신청가능'}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between items-center text-sm text-gray-600">
                                                    <span>선생님: {slot.instructor}</span>
                                                    <span className="flex items-center gap-1">
                                                        👥 {slot.currentParticipants}/{slot.maxParticipants} 명
                                                    </span>
                                                </div>
                                            </button>
                                        )
                                    })
                                )}
                            </div>
                        </div>
                    )}

                    {step === 'form' && (
                        <div>
                            <h2 className="text-2xl font-bold mb-6">신청 정보를 입력해주세요</h2>
                            <div className="bg-green-50 p-4 rounded-xl mb-6 text-sm text-green-800">
                                <strong>선택한 수업:</strong><br />
                                {location === 'Anyang' ? '안양' : '과천'} / {ageGroup === 'Kindergarten' ? '유치부' : '초등부'}<br />
                                {selectedSlot && formatTime(selectedSlot.time)} (담당: {selectedSlot?.instructor}) <br />
                                현재 신청 인원: <strong>{selectedSlot?.currentParticipants}명</strong>
                            </div>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">자녀 이름</label>
                                        <input
                                            type="text" required
                                            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 outline-none"
                                            value={formData.childName}
                                            onChange={e => setFormData({ ...formData, childName: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">자녀 나이</label>
                                        <select
                                            required
                                            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 outline-none"
                                            value={formData.childAge}
                                            onChange={e => setFormData({ ...formData, childAge: e.target.value })}
                                        >
                                            <option value="">선택</option>
                                            {getAgeOptions().map(age => (
                                                <option key={age} value={age}>{age}세</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-gray-100">
                                    <h3 className="font-bold mb-3 text-gray-900">보호자 정보</h3>
                                    <div className="grid grid-cols-1 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">보호자 이름</label>
                                            <input
                                                type="text" required
                                                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 outline-none"
                                                value={formData.guardianName}
                                                onChange={e => setFormData({ ...formData, guardianName: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">전화번호</label>
                                            <input
                                                type="tel" required placeholder="010-0000-0000"
                                                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 outline-none"
                                                value={formData.guardianPhone}
                                                onChange={e => setFormData({ ...formData, guardianPhone: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
                                            <input
                                                type="email" required
                                                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 outline-none"
                                                value={formData.guardianEmail}
                                                onChange={e => setFormData({ ...formData, guardianEmail: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-4 mt-6 bg-green-600 text-white font-bold rounded-xl shadow hover:bg-green-700 transition disabled:opacity-50"
                                >
                                    {loading ? '신청 처리 중...' : '신청하기'}
                                </button>
                            </form>
                        </div>
                    )}

                    {step === 'success' && (
                        <div className="text-center py-10">
                            <div className="text-6xl mb-4">🎉</div>
                            <h2 className="text-3xl font-bold mb-4 text-green-700">신청이 완료되었습니다!</h2>
                            <p className="text-gray-600 mb-8">
                                입력하신 연락처로 신청 확인 문자가 발송될 예정입니다.<br />
                                즐거운 숲 체험이 되도록 준비하겠습니다.
                            </p>
                            <button
                                onClick={() => navigate('/')}
                                className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition"
                            >
                                홈으로 돌아가기
                            </button>
                        </div>
                    )}

                    <div className="mt-8 flex justify-between">
                        {step !== 'location' && step !== 'success' && (
                            <button onClick={handleBack} className="text-gray-500 hover:text-gray-900 underline">
                                &larr; 이전 단계
                            </button>
                        )}
                        {step !== 'form' && step !== 'success' && (
                            <button
                                onClick={handleNext}
                                disabled={
                                    (step === 'location' && !location) ||
                                    (step === 'age' && !ageGroup) ||
                                    (step === 'time' && !selectedSlot)
                                }
                                className={`ml-auto px-6 py-3 rounded-lg font-bold transition ${((step === 'location' && location) || (step === 'age' && ageGroup) || (step === 'time' && selectedSlot))
                                    ? 'bg-green-600 text-white hover:bg-green-700 shadow-lg'
                                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                    }`}
                            >
                                다음 단계 &rarr;
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
