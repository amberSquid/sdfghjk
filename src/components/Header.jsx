import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

export default function Header() {

    return(
        <div className='relative'>
            <Splide options={{
                type: 'fade',
                perPage: 1,
                perMove: 1,
                // autoplay: true,
                autoplayTimeout: 5000,
                pauseOnHover: false,
                // height: "40rem",
                arrows: false,
                pagination: false,
                rewind: true,
                
            }}>
                <SplideSlide>
                <video src="/video1.mp4"></video>
                </SplideSlide>
                <SplideSlide>
                <video src="/video2.mp4" autoplay></video>

                </SplideSlide>
                <SplideSlide>
                <video src="/video3.mp4" autoplay></video>
                </SplideSlide>
            </Splide>

            <div className="absolute top-0 w-full h-full flex items-center justify-center bg-slate-600/60">
                <div>
                    <h1 className='text-white text-center text-5xl font-bold w-full'>Book your <span className="text-orange-500">DREAM</span> Stay</h1>
                    <p className='text-2xl text-white text-center max-w-xl'>Book your Dream Stay today with Qatar Stay! With the best hotels with great views in Qatar and close proximity to stadiums... we guarantee the best experince for you in Qatar.</p>

                    <a href="/login">
                    <button class="uppercase text-white font-semibold bg-orange-500 px-4 py-2 rounded-lg hover:bg-orange-700 hover:text-black transition block mx-auto mt-4">
                        Get Started
                    </button>
                    </a>
                </div>
            </div>

        </div>
        
    )
}