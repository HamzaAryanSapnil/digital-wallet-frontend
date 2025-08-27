import ContactForm from '@/components/ContactUsForm'

export default function Contact() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center w-full max-w-7xl container mx-auto" >
        <h1 className="text-3xl font-bold" >Contact Us</h1>
        <ContactForm/>
    </div>
  )
}
