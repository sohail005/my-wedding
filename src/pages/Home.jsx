import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import Hero from "@/components/Hero";
import GuestLayout from "@/components/Layouts/GuestLayout";
import Location from "@/components/Location";
import Couple from "@/components/Couple";
import EventDate from "@/components/Date";
import Words from "@/components/Words";

/**
 * Home page
 *
 * @returns React.ReactElement
 */
const Home = () => {
  return (
    <GuestLayout>
      <section id="hero">
        <Hero />
      </section>

      <section id="words">
        <Words />
      </section>

      <section id="couple">
        <Couple />
      </section>

      <section id="date">
        <EventDate />
      </section>

      <section id="location">
        <Location />
      </section>

      <section id="gallery">
        <Gallery />
      </section>

      <footer id="footer">
        <Footer />
      </footer>
    </GuestLayout>
  );
};

export default Home;
