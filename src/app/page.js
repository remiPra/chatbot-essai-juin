import Link from 'next/link'

export default function Home() {
  return (
    <main  style={{  color: '#c2b396' }} className=" relative flex h-screen flex-col items-center  p-24">
      {/* <img className='w-6' src="https://cdn.discordapp.com/attachments/1064968678640201758/1120828332611743794/remi_limoges_official_tourism_in_the_style_of_minimalist_illust_2dd21802-730b-4601-8b72-cbb824c1f8c0.png"/> */}
  <h1 className="text-3xl font-bold mb-5">
    Bienvenue sur l'IA virtuelle de La loge Gogaille
  </h1>
  <h2 className="text-lg mt-2">Ceci, Seb, est une version naissante. J'ai galéré car mes compétences en Python ont limité le travail.</h2>
  <h2>Fais pas attention au design, je le changerai avec le temps.</h2>
  <h2>C'est trop cool, je vais faire le mien en podo.</h2>
  
  <div className="mt-6">
    <div>
      <Link href="/chatgpt3">
        <button style={{ backgroundColor: '#e03c32', color: '#ffffff' }} className="px-4 py-2 rounded hover:bg-opacity-80 transition duration-300">
          Cliquez ici
        </button>
      </Link>
    </div>
  </div>



    </main >
  )
}
