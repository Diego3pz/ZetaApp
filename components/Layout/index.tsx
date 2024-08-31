
import AsideMenu from '../AsideMenu'
import Player from '../Player'
import { Quicksand } from 'next/font/google'
import Template from '../Template'
import { useState } from 'react'
export const quicksand = Quicksand({ subsets: ['latin'], weight: ['400', '700'] })


export default function Layout({
  children,
  title
}: {
  children: React.ReactNode,
  title: string
}) {

  const [click, setClick] = useState(false)

  const handleClick = () => {
    setClick(!click)
  }

  if (click === false) {
    return (
      <>

        <title>{`${title}`}</title>
        <div className={quicksand.className}>
          <div id='app' className={`${quicksand.className} antialiased relative max-h-screen h-screen p-2 gap-2`}>

            <aside className='[grid-area:aside] flex-col flex overflow-y-auto '>
              <AsideMenu handleClick={handleClick} click={click} />
            </aside>

            <main className='[grid-area:main] rounded-lg bg-zinc-900 overflow-y-auto'>
              {children}
            </main>

            <footer className='[grid-area:player]'>
              <Player />
            </footer>


          </div>

        </div>


      </>
    )
  } else {
    return (
      <>

        <title>{`${title}`}</title>
        <div className={quicksand.className}>
          <div id='app2' className={`${quicksand.className} antialiased relative h-screen p-2 gap-2`}>

            <aside className='[grid-area:aside] flex-col flex overflow-y-auto '>
              <AsideMenu handleClick={handleClick} click={click} />
            </aside>

            <main className='[grid-area:main] rounded-lg bg-zinc-900 overflow-y-auto'>
              <Template>
                {children}
              </Template>
            </main>

            <footer className='[grid-area:player]'>
              <Player />
            </footer>


          </div>

        </div>


      </>
    )
  }

}