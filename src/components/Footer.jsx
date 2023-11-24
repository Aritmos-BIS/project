import React from "react";

function Footer() {
  return (
    <footer className="bg-purple-950 text-white p-6">
        <div className="flex flex-row justify-between w-full">
            <div className="max-lg:hidden lg:w-1/3 text-sm text-left"> 
                <h1>¡Únete a Nuestra Comunidad! 🌈</h1>
                <p>Foro de Padres y Maestros: Comparte experiencias y obtén consejos para apoyar el aprendizaje en casa y en la escuela.</p>
                <p>Historias de Éxito: Celebra los logros de los niños y comparte sus experiencias en nuestras redes sociales.</p>
            </div>
            <div className="max-md:w-full container mx-auto flex flex-col justify-center items-center text-center lg:w-1/3">
                <div className="text-white">&copy; Aritmos Corporation</div>
            </div>
            <div className="max-lg:hidden text-right text-sm lg:w-1/3">
                <h1>¡Gracias por Ser Parte de Aritmos Educativos! 🌟</h1>
                <p>¡Estamos emocionados de ser parte del viaje educativo de tus hijos! Descubre el mundo fascinante de las matemáticas con nosotros.</p>
                <h2>Síguenos en Redes Sociales:</h2>
                <ul>
                    <li>Facebook: <a className="font-extrabold text-blue-600" href="">@AritmosEducacion</a></li>
                    <li>Instagram: <a className="font-extrabold text-blue-600" href="">@AritmosEducacion</a></li>
                    <li>Twitter: <a className="font-extrabold text-blue-600"href="">@AritmosEducacion</a></li>
                </ul>
            </div>
      </div>
    </footer>
  );
}

export default Footer;
