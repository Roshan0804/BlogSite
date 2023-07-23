import { Parallax } from "react-parallax";
import { HowWeDevelop, PortFolio } from ".";
import { Title } from "../components/wigets/bannerTitle";
import MainLayout from "../layouts/mainLayout";
import { TechnologyweUsed } from './team';

export default  function OurProjects(){
    return(
        <MainLayout title={'Web Development'}>
            <AppDevelopment/>
        </MainLayout>
    )
}

const AppDevelopment = ()=> {
    return(
       <div>
             <div className="">
                   <img src="/images/home/banner.jpeg" className="" style={{height: '60vh ', width: '100%', objectFit: 'cover'}}/>
               </div>
           <div className="md:px-24">
             
               <section className="my-8">
               <Title title={'Latest Technologies'} mainTitle="We are familiar" mainTitleTag={'with latest technologies'}/>
               </section>
               <div className="grid grid-cols-6 gap-10 border-b pb-8">
                  <TechnologyweUsed/>
               </div>
           </div>
            <Parallax blur={3} bgImage="/images/home/banner2.jpeg" bgImageAlt="the cat" strength={200}>
                <PricingDetails/>
            </Parallax>
            <div className=" bg-brand">
                <HowWeDevelop/>
            </div>
            <div className="md:px-24 pb-16 pt-10">
                <Title title={'Our finished projects'} mainTitle="Our" mainTitleTag={'Finished Projects'}/>
                <PortFolio/>
            </div>
       </div>
    )
}

const pricings = [
    {
        price: '$400 - $500',
        title: 'Web Development'
    },  {
        price: '$100 - $500',
        title: 'App Development'
    },  {
        price: '$30 - $200',
        title: 'Wordpress'
    }
]

const PricingDetails = ()=> {
    return(
        <div className="py-12 md:px-24">
            <section className="mb-8">
              <Title title={'Pricing Details of Development'} mainTitle="" mainTitleTag={'Pricing Details'}/>
            </section>
            <div className="grid grid-cols-3 gap-20">
                {pricings.map((item, index)=> {
                    return(
                        <div className="col-span-1 p-4 rounded-md bg-white" key={index}>
                            <div className="py-10 bg-brand rounded-md text-center">
                                <p className="text-5xl font-mono font-extrabold text-white">{item.price}</p>
                                <div className="mt-8">
                                    <button className="fa fa-send bg-white px-10 text-red-500 py-4 rounded-md text-lg font-bold"><span className="ml-3 text-xl">Request Quote</span></button>
                                </div>
                            </div>
                            <h1 className="text-center font-bold text-3xl mt-6 mb-4">{item.title}</h1>
                            <div className="text-center text-lg leading-9 text-gray-500 font-semibold font-mono">
                                <li>Point number one</li>
                                <li>Point number one</li>
                                <li>Point number one</li>
                            </div>
                            <div className="border rounded-md p-5  mt-5 text-semibold text-gray-400 text-sm text-center">
                                    <p>this is the description about the development service</p>
                            </div>
                        </div>
                   )
                })

                }
            </div>
        </div>
    )
}

const Section2 = ()=> {
    return(
        <div className="grid grid-cols-5 md:px-20 py-10 gap-10">
            <div className="col-span-3 relative px-5  justify-center items-center py-2">
            <img className="ml-auto rounded-md w-full" src="https://bhotahiti.com/_next/image?url=https%3A%2F%2Fbhotahiti-bucket.s3.ap-south-1.amazonaws.com%2Fcms%2Fsliders%2F163592666099796.webp&w=3840&q=75"/>
                <div className="mt-5">
                    <h3 className="text-3xl mb-2 font-bold text-brand">Bhotahiti.com | Wholesale bazar of nepal</h3>
                    <p className="text-gray-500 text-sm mb-10 mt-5">
                        <span className="mr-5">2012, jan - 2020 Jan</span>
                        <span className="bg-blue-100 px-2 py-1 rounded-md"> Node.js</span>
                        <span className="bg-blue-100 px-2 py-1 rounded-md mx-2">React.js</span>
                        <span className="bg-blue-100 px-2 py-1 rounded-md">Mongodb</span>
                    </p>
                    <button className="bg-white px-10 mr-10 py-3 rounded-md text-brand border-brand border-2 font-bold"> Visit Now</button>
                </div>
            </div>
            <div className="col-span-2 rounded-md justify-center pl-5">
               
                 <div className=" sticky top-20 z-30">
                 <h3 className="font-bold text-xl mb-3 text-gray-500 w-full"><span>See more projects </span></h3>
                 {[0,1,2,3,4,5,6].map((item, index)=> {
                     return(
                         <div className="bg-gray-200 my-4 p-4 rounded-sm hover:bg-white cursor-pointer" key={index}>
                            <div className="flex space-x-4">
                              <img className="rounded-sm" style={{height: '30px', width: '30px'}} src="https://bhotahiti.com/_next/image?url=https%3A%2F%2Fbhotahiti-bucket.s3.ap-south-1.amazonaws.com%2Fcms%2Fsliders%2F163592666099796.webp&w=3840&q=75"/>
                               <h1 className="text-xl capitalize">bhotahiti.com application</h1>
                            </div>
                         </div>
                     )
                 })

                 }
                 </div>
            </div>
        </div>
    )
}
