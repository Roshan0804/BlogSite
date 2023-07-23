import Link from "next/link";
const about = {
    title: 'About us',
    mainTitle: 'Why Only us?',
    description: `We understand that at the very heart of clinical research is the person - you. We honor that commitment, and
       commend that bravery, and we stand by you on your
        journey. Let Lightship be your beacon.`,
    buttons: [
      "Learn more about us"
    ],    
    otherContent: [
      {
        count: '500',
        tag: '+',
        description: 'Clinical Research Studies Executed'
      },{
        count: '377,500',
        tag: '+',
        description: 'Participants Enrolled'
      },{
        count: '61',
        tag: 'years',
        description: 'Clinical Research Site Experience'
      },{
        count: '55',
        tag: 'years',
        description: 'Working at Pharmaceutical Firms'
      }
    ]     
  }
export default function AboutShortcut({}){
    return(
        <div className="grid grid-cols-2 gap-10 items-center">
            <section className="pr-5">
                <div className="flex items-center space-x-3">
                   <span className="px-10 h-1 bg-gray-400 w-16"></span>
                   <h2 className="uppercase text-sm">{about.title}</h2>
                </div>
                <h2 className="text-3xl text-brand font-semibold my-3">{about.mainTitle}</h2>
                <p className="text-sm">{about.description}</p>
                <div className="mt-3">
                   <Link href={'/about-us'}>
                      <button className="text-brand py-3 rounded-md">Learn more about us <span className="ml-3 fa fa-angle-right"/></button>
                   </Link>
                </div>
            </section>
            <section className="pl-4">
                <div className="grid grid-cols-2 gap-10">
                    {about.otherContent.map((item, index)=> {
                        return(
                            <div key={index} className="bg-gray-100 rounded-md p-8">
                                <h2><span className="text-3xl mr-2 font-bold">{item.count}</span><span className="text-sm text-brand">{item.tag}</span></h2>    
                                <p className="text-xs mt-3 text-gray-600">{item.description}</p>
                            </div>
                        )
                    })
                    }
                </div>
            </section>
        </div>
    )
}