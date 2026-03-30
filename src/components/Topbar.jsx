import { FaPhoneAlt, FaPaperPlane } from 'react-icons/fa';

const Topbar = () => {
    return (
        <div className="bg-black text-gray-300 text-xs py-2 md:py-3 transition-all duration-300 border-b border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-3 md:gap-0">
                <div className="flex items-center space-x-6 sm:space-x-8">
                    <div className="flex items-center gap-2.5 cursor-pointer group">
                        <FaPhoneAlt className="text-primary group-hover:scale-110 transition-transform duration-300" />
                        <span className="font-medium tracking-wide group-hover:text-primary transition-colors duration-300">+ 1235 2355 98</span>
                    </div>
                    <div className="flex items-center gap-2.5 cursor-pointer group">
                        <FaPaperPlane className="text-primary group-hover:scale-110 transition-transform duration-300" />
                        <span className="font-medium tracking-wide group-hover:text-primary transition-colors duration-300">youremail@email.com</span>
                    </div>
                </div>
                <div className="font-bold tracking-[0.15em] text-white text-[10px] md:text-xs text-center border-t border-gray-800 md:border-t-0 pt-2 md:pt-0 w-full md:w-auto">
                    3-5 BUSINESS DAYS DELIVERY & FREE RETURNS
                </div>
            </div>
        </div>
    );
};

export default Topbar;
