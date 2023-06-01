import Header from "../../components/Header"

export default function Home() {

    return(
        <div>
            <Header />

            <div className="bg bg-1 flex items-center">
                <div className="container mx-auto ">
                    <div className="max-w-3xl text-white">
                        <h1 className="">Book your Dream Stay in Qatar</h1>

                        <p className="text-3xl text-white/80">At Qatar Stay we have the best and the most comfortable stay. Everything that you need to enjoy Qatar and the 2022 World Cup all in 1 place.</p>
                    </div>
                </div>
            </div>

            <div className="bg bg-2 flex items-center">
                <div className="container mx-auto ">
                    <div className="max-w-3xl text-white">
                        <h1 className="">Discover the <span className="text-orange-500">best views</span> and <span className="text-orange-500">expericences</span></h1>

                        <p className="text-3xl text-white/80">If you hope to have a relaxing and fun filled stay, make sure that you signup and then we can guarantee you nothing but the best here in Qatar.</p>
                    </div>
                </div>
            </div>
        </div>
    )

}