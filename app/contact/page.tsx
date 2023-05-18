import Footer from "@/components/Footer"
import  { MainNav } from "@/components/Nav"

const ContactPage = () => {
  return (
    <>
        <MainNav />
        <div className="flex flex-grow w-full h-screen">
        <h1 className="text-2xl">Contact Us</h1>
        </div>
        <Footer />
    </>
  )
}

export default ContactPage