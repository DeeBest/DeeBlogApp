import Featured from '../../components/Featured';
import Hero from '../../components/Hero';
import './home.css';

const Home = () => {
  return (
    <section className="flex-1 flex flex-col items-center justify-center p-2 gap-8">
      <Hero />
      <Featured />
    </section>
  );
};
export default Home;
