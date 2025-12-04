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

              <div className="bg-gradient-to-r from-red-800/80 to-red-900/80 backdrop-blur-md rounded-2xl px-8 py-5 border-3 border-yellow-400/70 shadow-2xl">
                <p className="text-white font-bold text-xl mb-4 text-center">
                  Свяжитесь с нами:
                </p>
              <div className="flex items-center justify-center gap-6 text-base flex-wrap">
                <a
                  href="https://t.me/Kostya_managerr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-yellow-300 hover:text-yellow-100 transition-all font-bold bg-green-700/70 px-6 py-3 rounded-full border-2 border-yellow-400/70 hover:scale-110 transform shadow-lg hover:shadow-2xl"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM16.64 8.8C16.49 10.38 15.84 14.22 15.51 15.99C15.37 16.74 15.09 16.99 14.83 17.02C14.25 17.07 13.81 16.64 13.25 16.27C12.37 15.69 11.87 15.33 11.02 14.77C10.03 14.12 10.67 13.76 11.24 13.18C11.39 13.03 13.95 10.7 14 10.49C14.0069 10.4582 14.006 10.4252 13.9973 10.3938C13.9886 10.3624 13.9724 10.3337 13.95 10.31C13.89 10.26 13.81 10.28 13.74 10.29C13.65 10.31 12.25 11.24 9.52 13.08C9.12 13.35 8.76 13.49 8.44 13.48C8.08 13.47 7.4 13.28 6.89 13.11C6.26 12.91 5.77 12.8 5.81 12.45C5.83 12.27 6.08 12.09 6.55 11.9C9.47 10.63 11.41 9.79 12.38 9.39C15.16 8.23 15.73 8.03 16.11 8.03C16.19 8.03 16.38 8.05 16.5 8.15C16.6 8.23 16.63 8.34 16.64 8.42C16.63 8.48 16.65 8.66 16.64 8.8Z"/>
                  </svg>
                  @Kostya_managerr
                </a>
                <a
                  href="https://t.me/Ksenya_auto"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-yellow-300 hover:text-yellow-100 transition-all font-bold bg-green-700/70 px-6 py-3 rounded-full border-2 border-yellow-400/70 hover:scale-110 transform shadow-lg hover:shadow-2xl"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM16.64 8.8C16.49 10.38 15.84 14.22 15.51 15.99C15.37 16.74 15.09 16.99 14.83 17.02C14.25 17.07 13.81 16.64 13.25 16.27C12.37 15.69 11.87 15.33 11.02 14.77C10.03 14.12 10.67 13.76 11.24 13.18C11.39 13.03 13.95 10.7 14 10.49C14.0069 10.4582 14.006 10.4252 13.9973 10.3938C13.9886 10.3624 13.9724 10.3337 13.95 10.31C13.89 10.26 13.81 10.28 13.74 10.29C13.65 10.31 12.25 11.24 9.52 13.08C9.12 13.35 8.76 13.49 8.44 13.48C8.08 13.47 7.4 13.28 6.89 13.11C6.26 12.91 5.77 12.8 5.81 12.45C5.83 12.27 6.08 12.09 6.55 11.9C9.47 10.63 11.41 9.79 12.38 9.39C15.16 8.23 15.73 8.03 16.11 8.03C16.19 8.03 16.38 8.05 16.5 8.15C16.6 8.23 16.63 8.34 16.64 8.42C16.63 8.48 16.65 8.66 16.64 8.8Z"/>
                  </svg>
                  @Ksenya_auto
                </a>
              </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </>
  );
}
