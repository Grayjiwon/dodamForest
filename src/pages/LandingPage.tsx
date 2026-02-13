import { Link } from 'react-router-dom';
import landingMain from '../assets/landing_main.png';
import characterGreen from '../assets/character_green.png';
import footerDecoration from '../assets/footer_decoration.png';
import sectionDivider from '../assets/section_divider.png';

export default function LandingPage() {
    return (
        <div className="pt-10">
            {/* Hero Section with Overlay Content */}
            <section className="relative w-full">
                {/* Background Image */}
                <img
                    src={landingMain}
                    alt="Main Visual"
                    className="w-full h-auto block min-h-[600px] object-cover md:object-contain md:min-h-0"
                />

                {/* Overlay Content Container */}
                <div className="absolute inset-0 flex flex-col items-center justify-start pt-24 md:pt-32 text-center px-4">
                    <div className="max-w-4xl mx-auto space-y-2 md:space-y-4">
                        <p className="text-3xl md:text-5xl font-black text-gray-900 leading-tight">2026년 상반기</p>

                        <h1 className="text-3xl md:text-5xl font-black mb-2 leading-tight text-gray-900">
                            도담이를<br />
                            기다리고 있어요!
                        </h1>

                        <div className="space-y-1 mb-6">
                            <h2 className="text-lg md:text-xl font-bold text-gray-900">숲 체험 교육<br />어린이 모집 안내</h2>
                            <p className="text-xs md:text-sm font-medium text-gray-800">(유치부 5-7세 / 초등부 8-12세)</p>
                        </div>

                        <div className="text-xs md:text-sm leading-relaxed space-y-1 font-medium text-gray-800 hidden sm:block">
                            <p>&lt;숲 도담&gt;에서는 학부모님께서 팀을 구성하시면,</p>
                            <p>선생님과 상담 후 일정을 조율하고 있어요.</p>
                            <p>(개별 수업 신청은 별도 문의 부탁드려요.)</p>
                        </div>

                        <p className="text-[10px] md:text-xs text-gray-700 mt-2 font-medium">* 문의는 하단 &lt;자주 묻는 질문&gt; 확인 후 연락주세요!</p>

                        <div className="mt-4 md:mt-8">
                            <a href="tel:010-8395-1256" className="inline-block px-6 py-2 md:px-8 md:py-3 border-2 border-black rounded-full font-bold text-sm md:text-lg hover:bg-black hover:text-[#FFE142] transition bg-white/50 backdrop-blur-sm">
                                문의 : 초록이 선생님 010-8395-1256
                            </a>
                        </div>

                        {/* New Character Image */}
                        <div className="mt-4 flex justify-center">
                            <img src={characterGreen} alt="Green Teacher" className="w-[30rem] md:w-[45rem] h-auto object-contain" />
                        </div>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className="bg-[#aac652] pt-20 pb-0 text-center text-white relative">
                <div className="max-w-2xl mx-auto px-6 mb-16">
                    <h2 className="text-3xl md:text-4xl font-black mb-8">숲도담이란?</h2>

                    <p className="text-lg leading-relaxed mb-8 font-medium opacity-90">
                        숲도담은 아이들이 즐겁게 뛰놀며<br />
                        별 탈없이 자라나는 모습을 뜻하는<br />
                        순 우리말 '도담도담'과 '숲'의 합성어로<br />
                        숲 안에서 즐겁게 뛰며 자연을 닮아가는<br />
                        숲 체험 교육을 운영합니다.
                    </p>

                    <div className="mt-8">
                        <Link to="/booking" className="inline-block px-8 py-3 border-2 border-white rounded-full text-lg font-bold hover:bg-white hover:text-[#aac652] transition">
                            숲 체험 학교 신청하기
                        </Link>
                    </div>
                </div>

                {/* Divider Image */}
                <div className="w-full leading-none translate-y-1"> {/* Adjust for pixel gap */}
                    <img src={sectionDivider} alt="Grass Divider" className="w-full h-auto block" />
                </div>
            </section>

            {/* Benefits Section */}
            <section className="bg-[#719435] pt-20 pb-16 text-center text-white">
                <div className="max-w-3xl mx-auto space-y-8">
                    <h2 className="text-3xl md:text-4xl font-black leading-tight mb-4">
                        숲 체험 교육<br />
                        어떤 장점이 있나요?
                    </h2>

                    <p className="text-lg leading-relaxed font-medium opacity-90">
                        숲 체험 교육은 아이들이 숲 또는 나무가 있는<br />
                        자연 환경에서의 체험 학습 활동을 통해<br />
                        자신감을 얻고 자존감을 기를 수 있는<br />
                        기회를 제공하는 고무적인 과정입니다.
                    </p>

                    <p className="text-base font-bold pt-8">
                        숲 체험 교육의 주요 방향성을 확인해보세요!
                    </p>
                </div>
            </section>

            {/* Annual Plan 2026 Section */}
            <section className="relative overflow-hidden">

                {/* ===== 상단 초록 배경 ===== */}
                <div className="bg-[#719435] h-40 md:h-56 w-full relative">
                    {/* Wave SVG */}
                    <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
                        <svg
                            viewBox="0 0 1440 320"
                            className="w-full h-24 md:h-32"
                            preserveAspectRatio="none"
                        >
                            <path
                                fill="#ffda31"
                                d="M0,192 C360,260 720,120 1080,192 C1260,230 1350,180 1440,160 L1440,320 L0,320 Z"
                            />
                        </svg>
                    </div>
                </div>

                {/* ===== 노란 섹션 ===== */}
                <div className="bg-[#ffda31] pt-12 pb-0 relative">

                    <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-16 relative z-10 mb-20">

                        {/* Left Column */}
                        <div className="md:w-1/3 text-left px-6">
                            <div className="mb-6">
                                <img
                                    src="https://cdn.imweb.me/thumbnail/20250228/6bbc2cd65e06e.png"
                                    alt="Leaf Decoration"
                                    className="w-16 h-16 object-contain"
                                />
                            </div>

                            <h2 className="text-5xl md:text-6xl font-black text-gray-900 leading-tight mb-4">
                                숲도담 2026<br />
                                연간계획표
                            </h2>

                            <p className="text-xl font-bold text-gray-800 mb-8">
                                &lt;숲도담&gt;의 연간 일정을 확인해보세요!
                            </p>

                            <Link
                                to="/booking"
                                className="inline-block bg-white text-black px-10 py-4 rounded-full font-black text-lg shadow-xl hover:bg-gray-100 transition-all hover:scale-105 active:scale-95"
                            >
                                신청하기
                            </Link>

                            <div className="mt-16 hidden md:block">
                                <img
                                    src="https://cdn.imweb.me/thumbnail/20250515/b2719d223e80b.png"
                                    alt="Dodam Character"
                                    className="w-64 h-auto drop-shadow-xl animate-bounce-slow"
                                />
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10 px-6">
                            {[
                                { month: '1월', title: '새들의 겨울나기', desc: '새들은 겨울에 어디에서 살고 무엇을 먹을까?' },
                                { month: '2월', title: '봄을 준비하는 식물', desc: '나무들은 겨울을 어떻게 날까?' },
                                { month: '3월', title: '숲속 봄 마중', desc: '겨울잠에서 깨어난 숲의 생명들' },
                                { month: '4월', title: '꽃들의 잔치', desc: '다양한 봄꽃과 벌레들의 만남' },
                                { month: '5월', title: '초록빛 숲의 요정', desc: '싱그러운 잎사귀와 나비 탐구' },
                                { month: '6월', title: '여름 숲 소리 여행', desc: '시원한 계곡과 곤충 음악대' },
                                { month: '7월', title: '열매가 익어가는 숲', desc: '여름 열매와 씨앗의 비밀' },
                                { month: '8월', title: '숲속 물놀이 탐험', desc: '수생 생물과 함께하는 시원한 체험' },
                                { month: '9월', title: '가을을 알리는 소식', desc: '가을 벌레와 풀꽃 이야기' },
                                { month: '10월', title: '알록달록 숲의 변신', desc: '단풍잎과 함께하는 예술 활동' },
                                { month: '11월', title: '낙엽과 흙의 숨바꼭질', desc: '흙 속 생물과 겨울 준비' },
                                { month: '12월', title: '숲속 친구들의 겨울잠', desc: '추운 겨울을 견디는 소중한 생명들' },
                            ].map((plan, idx) => (
                                <div key={idx} className="border-b border-gray-900/10 pb-4 group">
                                    <div className="text-gray-900 font-black text-xl mb-1">{plan.month}</div>
                                    <h3 className="text-gray-900 font-bold text-lg leading-tight group-hover:text-green-800 transition-colors">
                                        {plan.title}
                                    </h3>
                                    <p className="text-gray-700 text-sm mt-1 font-medium leading-relaxed">
                                        {plan.desc}
                                    </p>
                                </div>
                            ))}
                        </div>

                    </div>

                    {/* Grass Footer */}
                    <div className="w-full h-auto mt-auto">
                        <img
                            src="https://cdn.imweb.me/thumbnail/20250228/65712d3e59245.png"
                            alt="Grass Footer"
                            className="w-full h-auto block"
                        />
                    </div>

                </div>

            </section>

            {/* FAQ Section */}
            <section className="bg-[#5D9603] pt-20 pb-0 px-6 text-white">
                <div className="max-w-4xl mx-auto space-y-16 mb-20">
                    {/* Part 1: Class Info */}
                    <div className="space-y-8">
                        <div className="inline-block px-6 py-2 border-2 border-white rounded-full text-lg font-bold mb-4">
                            수업 진행 안내
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-xl font-bold">Q. 수업은 어떻게 진행되나요?</h3>
                            <p className="opacity-90 leading-relaxed">
                                숲 체험 하루 전날 오전에 카카오톡 메시지로 안내사항을 전달드려요.<br />
                                체험 후에는 당일 수업 내용과 활동 사진을 함께 보내드려요.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-xl font-bold">Q. 비가 오면 수업이 취소 되나요?</h3>
                            <p className="opacity-90 leading-relaxed">
                                태풍이나 큰 비, 폭설이 내리면 쉬어요.<br />
                                작은 비나 눈이 내릴 때는 숲 체험을 할 수 있어요.<br />
                                (날씨 상황을 보고 수업 1시간 전에 수업 여부를 문자로 알려드려요.)
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-xl font-bold">Q. 공휴일에도 수업을 하나요? / 개인 사정으로 수업 조정이 가능한가요?</h3>
                            <p className="opacity-90 leading-relaxed">
                                수업은 공휴일에도 쉬지 않아요.<br />
                                개인사정으로 참여하지 못해도 다른 친구들이 원한다면 수업은 진행돼요.<br />
                                (만약 수업 날짜를 바꾸고 싶다면 팀원들과 상의 후 선생님과 상담해주세요.)
                            </p>
                        </div>
                    </div>

                    {/* Part 2: Participation Caution */}
                    <div className="space-y-8">
                        <div className="inline-block px-6 py-2 border-2 border-white rounded-full text-lg font-bold mb-4">
                            수업 참여 주의사항
                        </div>

                        <div className="space-y-6">
                            <h3 className="text-xl font-bold mb-4">Q. 준비물이 따로 필요한가요?</h3>

                            <div className="space-y-6 opacity-90 leading-relaxed">
                                <div>
                                    <p className="font-bold mb-1">1. 작은 비가 오는 날엔 모자와 긴 소매 옷을 입혀주세요.</p>
                                    <p className="pl-4 text-sm">*맨살에 우의가 닿으면 아이들이 촉감을 낯설게 느껴 벗어버리는 경우가 많아요.</p>
                                    <p className="pl-4 text-sm">여름이라도 우의 안에 꼭 얇은 긴 소매 옷을 입어야 해요.</p>
                                </div>

                                <div>
                                    <p className="font-bold mb-1">2. 끝이 뭉툭한 우산으로 챙겨주세요.</p>
                                    <p className="pl-4 text-sm">(친구들이 찔릴 위험이 있어요.)</p>
                                </div>

                                <div>
                                    <p className="font-bold">3. 운동화에 양말을 꼭 신겨 보내주세요.</p>
                                </div>

                                <div>
                                    <p className="font-bold mb-1">4. 아이가 마실 물을 챙겨주세요.</p>
                                    <p className="pl-4 text-sm">* 음료수는 안돼요! 달달한 음료수 때문에 벌에 쏘일 위험이 있어요.</p>
                                    <p className="pl-4 text-sm">* 더운 여름엔 아이들이 시원하게 마실 수 있도록 반만 얼려 챙겨주세요.</p>
                                    <p className="pl-4 text-sm">(꽝꽝 얼린 물을 가져오면 수업 내내 녹지 않아 마시기 어려워요.)</p>
                                </div>

                                <div>
                                    <p className="font-bold mb-1">5. 흙에 뒹굴어도 되는 옷으로 입혀주세요.</p>
                                    <p className="pl-4 text-sm">*아이들이 맘껏 뛰어놀 수 있도록 옷이 더러워져도 야단치지 마시고</p>
                                    <p className="pl-4 text-sm">세탁하면 된다고 이야기 해 주세요. (너무 작은 옷은 활동할 때 불편해요.)</p>
                                </div>

                                <div>
                                    <p className="font-bold mb-1">6. 가방은 두 손이 자유로운 크로스백이나 배낭으로 챙겨주세요.</p>
                                    <p className="pl-4 text-sm">*손에 드는 가방은 활동할 때 불편하고 위험해요.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Decoration Image */}
                <div className="w-full flex justify-center">
                    <img src={footerDecoration} alt="Forest Friends" className="w-full max-w-6xl h-auto object-contain" />
                </div>
            </section>
        </div>
    );
}
