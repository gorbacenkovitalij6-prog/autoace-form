import AutoSurveyForm from '@/components/AutoSurveyForm';
import Snowfall from '@/components/Snowfall';
import Stars from '@/components/Stars';
import Countdown from '@/components/Countdown';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <Snowfall />
      <Stars />
      <main className="min-h-screen relative overflow-hidden">
        {/* Beautiful Winter Background */}
        <div
          className="fixed inset-0 z-0"
          style={{
            backgroundImage: 'url(/winter-bg.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
          }}
        >
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/70 via-purple-900/60 to-red-900/70"></div>
        </div>

        {/* Christmas Lights Border */}
        <div className="fixed top-0 left-0 right-0 h-3 bg-gradient-to-r from-red-500 via-green-500 via-yellow-500 via-blue-500 to-red-500 christmas-lights opacity-90 z-40 shadow-lg"></div>

        <div className="max-w-7xl mx-auto relative z-10 py-4 px-4">
          {/* Compact Header */}
          <div className="text-center mb-4">
            <div className="inline-flex items-center justify-center mb-2">
              <div className="relative w-32 h-32 rounded-full overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 border-4 border-yellow-400 glow-effect shadow-2xl">
                <Image
                  src="/logo.png"
                  alt="AutoEuropeTop - Cars From Europe"
                  width={128}
                  height={128}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>

            <h1 className="text-4xl font-bold text-white tracking-wide drop-shadow-2xl text-center mb-2" style={{
              textShadow: '0 0 20px rgba(255,215,0,1), 0 0 40px rgba(255,215,0,0.7), 3px 3px 6px rgba(0,0,0,0.8)'
            }}>
              Автомобили из Европы!
            </h1>
            <p className="text-2xl font-bold text-yellow-300 drop-shadow-xl text-center mb-2" style={{
              textShadow: '0 0 15px rgba(255,215,0,1), 3px 3px 6px rgba(0,0,0,0.8)'
            }}>
              С Новым Годом!
            </p>
          </div>

          {/* Contest Block at Top */}
          <div className="bg-gradient-to-r from-green-800/80 to-green-900/80 backdrop-blur-md rounded-2xl px-6 py-4 border-3 border-yellow-400/70 shadow-2xl mb-4">
            <div className="flex items-center justify-between gap-6">
              <div className="flex-1">
                <p className="text-2xl font-bold text-yellow-300 mb-2 drop-shadow-lg" style={{
                  textShadow: '0 0 15px rgba(255,215,0,1), 0 0 25px rgba(255,215,0,0.5)'
                }}>
                  🎁 Новогодний конкурс!
                </p>
                <p className="text-lg font-bold text-white mb-1">
                  Розыгрыш комплекта зимней резины
                </p>
                <p className="text-sm text-yellow-200 font-semibold">
                  Премиальные шины до 80,000 руб! Розыгрыш 31 декабря в прямом эфире
                </p>
              </div>
              <div className="flex-shrink-0">
                <Countdown />
              </div>
            </div>
          </div>

          {/* Form Section */}
          <AutoSurveyForm />
        </div>
      </main>
    </>
  );
}
