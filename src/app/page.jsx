import './globals.css';

export default function Home() {
  return (
    <section className='flex flex-col items-center justify-center h-full'>
      <div className='flex flex-row w-full relative'>
        <img className='w-1/2 h-auto' src="/images/landing1.jpg" alt="" />
        <img className='w-1/2 h-auto' src="/images/landing2.jpg" alt="" />
        <div className='absolute flex inset-0 w-full items-center justify-center'>
          <div className='text-center text-black'>
            <h1 className='md:text-8xl md:m-10 max-sm:text-2xl font-bold max-sm:p-10 lg:m-20 sm:m-5 sm:p-4'>
              <span className='lg:m-6 lg:p-6 bg-purple-800 rounded-3xl text-white bg-opacity-75 max-sm:text-4xl max-sm:m-4'>ARITMOS</span>
            </h1>
            <a href="/auth/register" className='max-md:text-sm bg-violet-500 text-3xl font-medium text-center rounded-lg m-4 p-2 shadow-lg items-center justify-center w-3/5 hover:shadow-inner hover:shadow-black hover:bg-violet-700 hover:text-gray-900 text-white transition-all duration-500'>
              Regístrate ahora
            </a>
          </div>
        </div>
      </div>
      <div className='w-full flex flex-row bg-slate-800'>
        <div className='max-md:hidden w-1/2 flex items-center justify-center'>
          <img className='w-3/4' src="/images/logo-xl.png" alt="" />
        </div>
        <div className='flex flex-row max-md:w-full w-1/2 text-center items-center text-white'>
          <div className='mx-6'>
            <h1 className='text-2xl my-1'>¿Quién es el equipo Aritmos?</h1>
            <p className='text-xl mb-6'>Somos un equipo apasionado por la educación y las matemáticas. En Aritmos, creemos que aprender matemáticas puede ser divertido y emocionante para los niños. Nuestro equipo está compuesto por educadores, diseñadores y desarrolladores comprometidos con hacer que el aprendizaje sea accesible y atractivo.</p>
            <h1 className='max-md:hidden text-2xl my-1'>Nuestra Misión 🎯</h1>
            <p className='max-md:hidden text-xl mb-2'>Queremos ayudar a los niños de primaria (7-8 años) a desarrollar una sólida comprensión de las matemáticas básicas a través de recursos educativos interactivos, juegos divertidos y lecciones envolventes.</p>
          </div>
        </div>
      </div>
      <h1 className='mt-5 text-4xl text-white font-semibold'>EQUIPO ARITMOS</h1>
      <div className='flex flex-row w-full justify-between text-center m-8'>
        <div className='shadow-black shadow-lg m-2 w-1/4 rounded-lg p-2 mx-2 flex flex-col items-center justify-center'>
          <img className='rounded-full mx-auto' src="/images/chavapic.jpeg" alt="" />
          <h2>Salvador Orozco González</h2>               
        </div>
        <div className='shadow-black shadow-lg m-2 w-1/4 rounded-lg p-2 mx-2 flex flex-col items-center justify-center'>
          <h1></h1>
          <img className='rounded-full mx-auto' src="/images/josepic.jpg" alt="" />
          <h2>Jose Salvador Sanchez Alarcon</h2>
        </div>
        <div className='shadow-black shadow-lg m-2 w-1/4 rounded-lg p-2 mx-2 flex flex-col items-center justify-center'>
          <h1></h1>
          <img className='rounded-full mx-auto' src="/images/raulpic.jpeg" alt="" />
          <h2>Raul Alejandro Muñiz</h2>
        </div>
        <div className='shadow-black shadow-lg m-2 w-1/4 rounded-lg p-2 mx-2 flex flex-col items-center justify-center'>
          <h1></h1>
          <img className='rounded-full w-11/12 mx-auto' src="/images/ernestopic.jpg" alt="" />
          <h2>Jesús Ernesto Fierro Sandoval</h2>
        </div>
      </div>
    </section>
  );
}
