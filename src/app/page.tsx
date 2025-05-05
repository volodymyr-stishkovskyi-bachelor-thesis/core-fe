import { AboutMe } from "@/components/AboutMe";
import { AskExperience } from "@/components/AskExperience";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";
import { HeaderHero } from "@/components/HeaderHero";
import { Services } from "@/components/Services";

export default function Home () {
  return (
    <>
      <HeaderHero />
      <Services />
      <AboutMe />
      <AskExperience />
      <ContactForm />
      <Footer />
    </>
  );
}
