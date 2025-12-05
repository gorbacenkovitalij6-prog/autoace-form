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



        <div className="max-w-7xl mx-auto relative z-10 py-12 px-4">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center mb-6">
              <div className="relative w-56 h-56 rounded-full overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 border-4 border-yellow-400 glow-effect shadow-2xl">
                <Image
                  src="/logo.png"
                  alt="AutoEuropeTop - Cars From Europe"
                  width={224}
                  height={224}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>

            <div className="relative w-full flex flex-col items-center">
              <h1 className="text-6xl font-bold text-white tracking-wide drop-shadow-2xl text-center mb-3" style={{
                textShadow: '0 0 20px rgba(255,215,0,1), 0 0 40px rgba(255,215,0,0.7), 3px 3px 6px rgba(0,0,0,0.8)'
              }}>
                Автомобили из Европы!
              </h1>
              <p className="text-3xl font-bold text-yellow-300 drop-shadow-xl text-center mb-4" style={{
                textShadow: '0 0 15px rgba(255,215,0,1), 3px 3px 6px rgba(0,0,0,0.8)'
              }}>
                С Новым Годом!
              </p>
              <div className="w-full flex justify-center">
                <p className="text-white text-xl font-semibold bg-gradient-to-r from-red-600/90 to-green-700/90 backdrop-blur-md rounded-2xl px-8 py-4 border-3 border-yellow-400/70 shadow-2xl text-center">
                  Подарите себе автомобиль мечты к празднику!
                </p>
              </div>
            </div>
          </div>

          {/* Countdown Timer */}
          <Countdown />

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Left Column - Form */}
            <div className="relative">
              <AutoSurveyForm />
            </div>

            {/* Right Column - Contest and Contacts */}
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-green-800/80 to-green-900/80 backdrop-blur-md rounded-2xl px-8 py-6 border-3 border-yellow-400/70 shadow-2xl">
                <p className="text-3xl font-bold text-yellow-300 mb-4 drop-shadow-lg text-center" style={{
                  textShadow: '0 0 15px rgba(255,215,0,1), 0 0 25px rgba(255,215,0,0.5)'
                }}>
                  Новогодний конкурс!
                </p>
              <div className="bg-white/10 rounded-xl p-5 mb-4 border-2 border-yellow-400/40">
                <p className="text-2xl font-bold text-white mb-3">
                  Розыгрыш комплекта зимней резины
                </p>
                <p className="text-lg text-yellow-200 font-semibold mb-2">
                  Премиальные шины стоимостью до 80,000 руб!
                </p>
                <div className="text-left text-white/90 space-y-2 max-w-xl mx-auto">
                  <p className="flex items-start gap-2">
                    <span className="text-yellow-400 font-bold min-w-[20px]">•</span>
                    <span>Участвуют все заявки, оставленные в декабре 2024</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-yellow-400 font-bold min-w-[20px]">•</span>
                    <span>Розыгрыш проводится 31 декабря в прямом эфире</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-yellow-400 font-bold min-w-[20px]">•</span>
                    <span>Победитель получает сертификат на любой комплект зимних шин</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-yellow-400 font-bold min-w-[20px]">•</span>
                    <span>Чем раньше оставите заявку — тем больше шансов!</span>
                  </p>
                </div>
              </div>
                <p className="text-base text-white/95 font-medium text-center">
                  Все заявки обрабатываются в течение 24 часов
                </p>
              </div>
            </div>
          </div>

        </div>
      </main>
    </>
  );
}
