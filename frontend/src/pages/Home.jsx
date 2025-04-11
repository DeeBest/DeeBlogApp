import Hero from '../components/Hero';
import CallToAction from '../components/CallToAction';
import RecentArticles from '../components/RecentArticles';

const Home = () => {
  return (
    <section className="flex flex-col items-center justify-center flex-1 gap-8 p-2 animate-slideFromLeft">
      <Hero />
      <CallToAction />
      <RecentArticles />
    </section>
  );
};
export default Home;
