
import Footer from "@/components/Footer"
import { MainNav } from "@/components/Nav"

const AboutPage = () => {
  return (
    <>
        <MainNav />
        <div className="flex flex-grow w-full h-screen">
        <h1 className="text-2xl">About</h1>
        </div>
        <Footer />
    </>
  )
}

export default AboutPage