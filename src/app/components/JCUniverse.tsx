/* eslint-disable react/no-unescaped-entities */


'use client'

import { useEffect, useState, useMemo, useRef } from 'react'
import Image from 'next/image'
import { Pacifico } from 'next/font/google'
import { ChevronDown, Menu, X, Mail, Send } from 'lucide-react'

const pacifico = Pacifico({ weight: '400', subsets: ['latin'] })

const IMAGES = [
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/13403387_716772501797319_9208051174120352095_o-R4chZw3v0quuhZaZbIIAZ34ll5Vd1N.jpg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_6553-yYFBS4ahtJa86TY6NwBhZx4LifmJpl.jpg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1900197_10154139815590397_4902156546784256721_o-w3vatZD5LsGnhBS3CJ1dFxIFOZ6zMo.jpg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Capture%20d'%C3%A9cran%202024-08-23%20165535-A3OCaMzXPSzmgdo7O04QHCzP5xWkp2.png",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Capture%20d'%C3%A9cran%202024-07-27%20022015-yAckLkZwr93alSTlobUzGBtsjf5eXV.png"
]

const TITLES = [
  "Le guitariste",
  "Le pizzaiolo",
  "Le motard",
  "Le créateur de vêtements",
  "Le WEBDESIGNER"
]

const TITLE_COLORS = [
  "text-yellow-300",
  "text-red-500",
  "text-blue-300",
  "text-white",
  "text-blue-400"
]

const IMAGE_COUNT = IMAGES.length

const PROJECTS = [
  { title: "Site web e-commerce", description: "Création d'un site de vente en ligne pour une boutique locale" },
  { title: "Application mobile de livraison", description: "Développement d'une app pour un service de livraison de repas" },
  { title: "Portfolio d'artiste", description: "Conception d'un site vitrine pour un photographe professionnel" },
]

export default function JCUniverse() {
  const [scroll, setScroll] = useState(0)
  const [currentImage, setCurrentImage] = useState(0)
  const [isNavFixed, setIsNavFixed] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const welcomeRef = useRef<HTMLHeadingElement>(null)
  const navRef = useRef<HTMLElement>(null)

  const headerProgress = useMemo(() => Math.min(scroll / 95, 1), [scroll])

  const imageScale = useMemo(() => 50 + Math.min(scroll, 25), [scroll])
  const imageTranslate = useMemo(() => Math.max(0, 25 - scroll / 2), [scroll])

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const scrollPercentage = (scrollTop / totalHeight) * 100
      setScroll(scrollPercentage)
      setCurrentImage(Math.min(Math.floor(scrollPercentage / (100 / IMAGE_COUNT)), IMAGE_COUNT - 1))

      if (welcomeRef.current && navRef.current) {
        const welcomeRect = welcomeRef.current.getBoundingClientRect()
        const navHeight = navRef.current.offsetHeight
        setIsNavFixed(welcomeRect.top <= navHeight)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element && navRef.current) {
      const navHeight = navRef.current.offsetHeight
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - navHeight

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      })
    }
    setIsDropdownOpen(false)
    setIsMobileMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header 
        ref={navRef}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isNavFixed ? 'bg-gray-900' : ''}`}
        style={{
          backdropFilter: isNavFixed ? 'none' : 'blur(10px)',
          backgroundColor: isNavFixed ? 'rgba(17, 24, 39, 1)' : `rgba(17, 24, 39, ${headerProgress * 0.8})`,
        }}
      >
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <h1 
            className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold ${pacifico.className} transition-all duration-500 whitespace-nowrap overflow-hidden ${TITLE_COLORS[currentImage]}`}
            style={{
              transform: isNavFixed ? 'scale(0.8)' : 'scale(1)',
              transformOrigin: 'left center',
              maxWidth: isNavFixed ? '40%' : '100%',
            }}
          >
            <span className="inline-block truncate max-w-full">
              L'UNIVERS DE JC
            </span>
          </h1>
          <nav className={`hidden md:flex space-x-4 transition-opacity duration-500 ${isNavFixed ? 'opacity-100' : 'opacity-0'}`}>
            <button onClick={() => scrollToSection('welcome')} className="px-3 py-2 rounded-md bg-gray-800 hover:bg-gray-700 transition-colors duration-300">Home</button>
            <div className="relative">
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)} 
                className="px-3 py-2 rounded-md bg-gray-800 hover:bg-gray-700 transition-colors duration-300 flex items-center"
              >
                JC <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5">
                  <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    {TITLES.map((title, index) => (
                      <button
                        key={title}
                        onClick={() => scrollToSection(`section-${index}`)}
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white w-full text-left"
                        role="menuitem"
                      >
                        {title}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <button onClick={() => scrollToSection('projects')} className="px-3 py-2 rounded-md bg-gray-800 hover:bg-gray-700 transition-colors duration-300">Projets</button>
            <button onClick={() => scrollToSection('contact')} className="px-3 py-2 rounded-md bg-gray-800 hover:bg-gray-700 transition-colors duration-300">Contact</button>
          </nav>
          <button 
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {isMobileMenuOpen && (
          <div className="md:hidden bg-gray-900 py-2">
            <button onClick={() => scrollToSection('welcome')} className="block w-full text-left px-4 py-2 text-white hover:bg-gray-800">Home</button>
            <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="block w-full text-left px-4 py-2 text-white hover:bg-gray-800">JC</button>
            {isDropdownOpen && (
              <div className="pl-8">
                {TITLES.map((title, index) => (
                  <button
                    key={title}
                    onClick={() => scrollToSection(`section-${index}`)}
                    className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-800"
                  >
                    {title}
                  </button>
                ))}
              </div>
            )}
            <button onClick={() => scrollToSection('projects')} className="block w-full text-left px-4 py-2 text-white hover:bg-gray-800">Projets</button>
            <button onClick={() => scrollToSection('contact')} className="block w-full text-left px-4 py-2 text-white hover:bg-gray-800">Contact</button>
          </div>
        )}
      </header>

      <div className="relative">
        <div className="fixed inset-0 z-0">
          {IMAGES.map((src, index) => (
            <div
              key={`bg-${src}`}
              className="absolute inset-0 transition-opacity duration-500 ease-in-out"
              style={{
                opacity: currentImage === index ? 1 : 0,
                backgroundImage: `url(${src})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'blur(10px)',
                transform: 'scale(1.1)',
              }}
            />
          ))}
        </div>
        <div className="fixed inset-0 z-10 flex items-center justify-center">
          {IMAGES.map((src, index) => (
            <div
              key={src}
              className="absolute transition-all duration-500 ease-in-out"
              style={{
                width: `${imageScale}vw`,
                opacity: currentImage === index ? 1 : 0,
                transform: `translateY(${imageTranslate}%) scale(${currentImage === index ? 1 : 0.8})`,
              }}
            >
              <Image
                src={src}
                alt={`Image ${index + 1}`}
                width={1200}
                height={800}
                className="rounded-lg shadow-lg"
                priority={index === 0}
              />
              <h2 className={`absolute top-4 left-4 text-3xl font-bold ${TITLE_COLORS[index]} shadow-text ${pacifico.className}`}>
                {TITLES[index]}
              </h2>
            </div>
          ))}
        </div>

        {IMAGES.map((_, index) => (
          <section key={index} className="h-screen" aria-hidden="true" />
        ))}
      </div>

      <div 
        className="relative z-20 bg-white text-gray-800"
        style={{
          marginTop: `${IMAGE_COUNT * 100}vh`,
        }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-purple-300 opacity-30 blur-3xl transform rotate-12"></div>
          <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-purple-300 opacity-30 blur-3xl transform -rotate-12"></div>
        </div>
        <main className="container mx-auto px-6 py-32 relative">
          <h2 id="welcome" ref={welcomeRef} className={`text-4xl md:text-5xl font-bold mb-8 ${pacifico.className} bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-yellow-500`}>Bienvenue dans l'Univers de JC</h2>
          <p className="text-xl mb-8">Explorez le monde multifacette de JC - de la musique à la cuisine, du design à la technologie.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TITLES.map((title, index) => (
              <div id={`section-${index}`} key={title} className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className={`text-2xl font-bold mb-4 ${TITLE_COLORS[index]}`}>{title}</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              </div>
            ))}
          </div>

          <div id="projects" className="mt-16">
            <h2 className={`text-4xl font-bold mb-8 ${pacifico.className} bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-yellow-500`}>Projets Réalisés</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {PROJECTS.map((project, index) => (
                <div key={index} className="bg-white bg-opacity-50 backdrop-blur-lg p-6 rounded-lg shadow-lg">
                  <h3 className="text-2xl font-bold mb-4 text-purple-400">{project.title}</h3>
                  <p>{project.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div id="newsletter" className="mt-16 bg-white bg-opacity-50 backdrop-blur-lg p-8 rounded-lg shadow-lg">
            <h2 className={`text-3xl font-bold mb-4 ${pacifico.className} bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-yellow-500`}>Abonnez-vous à la newsletter</h2>
            <p className="mb-4">Restez informé des dernières nouvelles et projets de JC !</p>
            <form className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Votre adresse e-mail"
                className="flex-grow px-4 py-2 rounded-md border border-gray-600 bg-white bg-opacity-50 backdrop-blur-lg bg-opacity-50 backdrop-blur-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button type="submit" className="px-6 py-2 bg-gradient-to-r from-purple-600 to-yellow-500 text-white rounded-md hover:from-purple-700 hover:to-yellow-600 transition-colors duration-300 flex items-center justify-center">
                <Mail className="mr-2" size={20} />
                S'abonner
              </button>
            </form>
          </div>

          <div id="contact" className="mt-16 shadow-lg p-8" >
            <h2 className={`text-4xl font-bold mb-8 ${pacifico.className} bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-yellow-500`}>Contact</h2>
            <p className="text-xl mb-8">Contactez JC pour des collaborations, des réservations ou simplement pour dire bonjour !</p>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Votre nom"
                className="w-full px-4 py-2 rounded-md border border-gray-600 bg-white bg-opacity-50 backdrop-blur-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <input
                type="email"
                placeholder="Votre adresse e-mail"
                className="w-full px-4 py-2 rounded-md border border-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <textarea
                placeholder="Votre message"
                rows={4}
                className="w-full px-4 py-2 rounded-md border border-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              ></textarea>
              <button type="submit" className="px-6 py-2 bg-gradient-to-r from-purple-600 to-yellow-500 text-white rounded-md hover:from-purple-700 hover:to-yellow-600 transition-colors duration-300 flex items-center justify-center">
                <Send className="mr-2" size={20} />
                Envoyer
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  )
}