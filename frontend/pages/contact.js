import { Parallax } from "react-parallax";
import MainLayout from "../layouts/mainLayout";

export default  function OurProjects(){
    return(
        <MainLayout title={'Our Finished Projects'}>
            <ProjectPage/>
        </MainLayout>
    )
}

const ProjectPage = ()=> {
    return(
           
            <div className="bg-white">
                thsi will contains all the app and web quotation, customer can download the documents here and alsoc they can leave message to the admin from this section
                <Section2/>
                
            </div>
    )
}
{/* <Parallax blur={3} bgImage="/images/home/banner-4.jpeg" bgImageAlt="the cat" strength={200}>
</Parallax> */}

const Section2 = ()=> {
    return(
        <Parallax blur={3} bgImage="/images/home/banner2.jpeg" bgImageAlt="the cat" strength={200}>
        <div className="grid grid-cols-5">
            <div className="col-span-3 relative px-20 justify-center items-center py-5">
            <img className="ml-auto rounded-md w-full mt-10" style={{height: '50vh'}} src="https://bhotahiti.com/_next/image?url=https%3A%2F%2Fbhotahiti-bucket.s3.ap-south-1.amazonaws.com%2Fcms%2Fsliders%2F163592666099796.webp&w=3840&q=75"/>
                <div className="mt-10 p-5 rounded-md bg-white">
                    <h3 className="text-3xl mb-2 font-bold text-gray-600">Bhotahiti.com | Wholesale bazar of nepal</h3>
                    <p className="text-gray-500 text-sm mb-6 mt-5">
                        <span className="mr-5">2012, jan - 2020 Jan</span>
                        <span className="bg-blue-100 px-2 py-1 rounded-md"> Node.js</span>
                        <span className="bg-blue-100 px-2 py-1 rounded-md mx-2">React.js</span>
                        <span className="bg-blue-100 px-2 py-1 rounded-md">Mongodb</span>
                    </p>
                    <button className="bg-white px-10 mr-10 py-3 rounded-md text-brand border-brand border-2 font-bold"> Visit Live Project</button>
                    <p className="mt-5 text-gray-500 text-lg">Short description ot the project with detail introduction</p>
                </div>
            </div>
            <div className="col-span-2 mb-2 rounded-sm bg-white z-30 px-10 pb-10 pt-5">
                 <div className="">
                    <div>
                        <p className="text-left text-2xl text-brand font-bold mb-5">Our Finished Projects</p>
                    </div>
                    <div  style={{maxHeight: '85vh', overflow: 'scroll'}}>
                        {[0,1,2,3,4,5,6].map((item, index)=> {
                            return(
                                <div className="bg-gray-200 my-4 p-4 rounded-sm hover:bg-gray-100 cursor-pointer" key={index}>
                                    <div className="flex space-x-4">
                                    <img className="rounded-sm" style={{height: '70px', width: '70px'}} src="https://bhotahiti.com/_next/image?url=https%3A%2F%2Fbhotahiti-bucket.s3.ap-south-1.amazonaws.com%2Fcms%2Fsliders%2F163592666099796.webp&w=3840&q=75"/>
                                    <div>
                                        <h1 className="text-xl capitalize">bhotahiti.com application</h1>
                                        <p className="mt-1">
                                            <span className="bg-white text-sm px-2 py-1 rounded-md"> Node.js</span>
                                                <span className="bg-white text-sm px-2 py-1 rounded-md mx-2">React.js</span>
                                                <span className="bg-white text-sm px-2 py-1 rounded-md">Mongodb</span>
                                        </p>
                                    </div>
                                    </div>
                                </div>
                            )
                        })

                        }
                    </div>
                 </div>
            </div>
        </div>
        </Parallax>
    )
}
