import fajar from "../assets/fajar.jpg"; // Gambar pertama
import ilham from "../assets/ilham1.jpg"; // Gambar kedua
import nana from "../assets/nana.jpg"; // Gambar ketiga
import BackgroundAnimation from "../components/backgroundanimation";

const Home = () => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white p-6 overflow-hidden">
      {/* Background Animation */}
      <BackgroundAnimation className="absolute inset-0 z-0" />
      {/* Section untuk Cards */}
      <div className="relative flex gap-6 mb-8">
        <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg shadow-2xl overflow-hidden w-60 hover:scale-105 transition-transform duration-300">
          <img src={fajar} alt="fajar" className="w-60 h-96 object-cover" />
          <p className="text-center  font-semibold py-2">nur Fajar Apriyanyo</p>
        </div>
        <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg shadow-2xl overflow-hidden w-60 hover:scale-105 transition-transform duration-300">
          <img src={ilham} alt="Ilham" className="w-60 h-96 object-cover" />
          <p className="text-center  font-semibold py-2">
            Rizki Ilhamnuddin Muria
          </p>
          <p className="text-center  font-semibold py-2">51422467</p>
        </div>
        <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg shadow-2xl overflow-hidden w-60 hover:scale-105 transition-transform duration-300">
          <img src={nana} alt="Nana" className="w-60 h-96 object-cover" />
          <p className="text-center font-semibold py-2">Natasha Rahima</p>
          <p className="text-center font-semibold py-2">51422212</p>
        </div>
      </div>
      {/* Button Get Started */}
      <button className="relative z-10 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-full text-lg font-bold shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300">
        Get Started
      </button>
    </div>
  );
};

export default Home;
