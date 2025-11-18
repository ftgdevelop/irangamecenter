/* eslint-disable  @typescript-eslint/no-explicit-any */

import { ServerAddress } from '@/enum/url'
import { useEffect, useState } from 'react'
import HightlightItemLink from './HightlightItemLink'
import { HighlightItemType } from '@/types/highlight'
import ModalPortal from '@/components/shared/layout/ModalPortal'
import Image from 'next/image'
import HightlightItemSlider from './HightlightItemSlider'
import CloseSimple from '@/components/icons/CloseSimple'

type Props = {
  highlights: HighlightItemType[];
  direction: "ltr" | "rtl";
}

const Highlights: React.FC<Props> = (props) => {

  const { highlights } = props

  const [activeHighlightId, setActiveHighlightId] = useState<number>()

  const [slideIn, setSlideIn] = useState(false);

  useEffect(() => {
    if (activeHighlightId) {
      setTimeout(() => { setSlideIn(true); }, 200)
    }
}, [activeHighlightId]);

useEffect(() => {
    if (!slideIn) {
        setTimeout(() => { setActiveHighlightId(undefined) }, 300)
    }
}, [slideIn]);

  // useEffect(() => {
  //   if (activeHighlightId) {
  //     dispatch(setBodyScrollable(false));
  //     dispatch(setBodiScrollPosition(0));
  //   } else {
  //     dispatch(setBodyScrollable(true));
  //   }
  // }, [activeHighlightId])

  if (highlights.length) {
    return (
      <section className="max-lg:hidden-scrollbar lg:styled-scrollbar lg:pb-2 overflow-x-auto overflow-y-clip py-3">
        <div className="flex items-start gap-3 px-3" dir={props.direction}>
          {highlights.map((highlight) => (
            <HightlightItemLink
              open={() => {
                setActiveHighlightId(highlight.id)
              }}
              Image={
                highlight.Item?.Image?.url
                  ? `${ServerAddress.Type}${ServerAddress.Strapi}${highlight.Item.Image.url}`
                  : '/images/default-game.png'
              }
              Title={highlight.Item?.Title || ''}
              key={highlight.id}
            />
          ))}
        </div>

        <ModalPortal
          show={!!activeHighlightId}
          selector="modal_portal"
        >
          <div className="fixed top-0 left-0 right-0 bottom-0 h-screen w-screen">
            <div className={`relative w-full md:max-w-lg md:mx-auto h-[100svh] overflow-hidden transition-all duration-300 ease-in-out ${slideIn?"scale-100 opacity-100 mt-0":"scale-0 opacity-0 mt-12"}`}>
              
              <div
                className="bg-black/50 backdrop-blur-sm absolute top-0 left-0 right-0 bottom-0"
                onClick={() => {setSlideIn(false)}}
              />
              
              {highlights.map((highlight, index) => {
                const activeHighlightIndex = highlights.findIndex(
                  (h) => h.id === activeHighlightId,
                )

                let position: 'left' | 'right' | 'center' = 'left'

                if (index > activeHighlightIndex) {
                  position = props.direction === 'rtl' ? 'left' : 'right'
                }
                if (index < activeHighlightIndex) {
                  position = props.direction === 'rtl' ? 'right' : 'left'
                }
                if (index === activeHighlightIndex) {
                  position = 'center'
                }

                return (
                  <div
                    key={highlight.id}
                    className={`py-5 px-3 rounded-2xl absolute flex items-stretch transition-all left-0 right-0 top-0 h-[100svh] transition-all duration-300 ease-out ${
                      position === 'left'
                        ? '-translate-x-full'
                        : position === 'right'
                        ? 'translate-x-full'
                        : ''
                    }`}
                  >
                    <div className="bg-white w-full rounded-2xl relative">
                      
                      <button
                        type='button'
                        onClick={()=>{setSlideIn(false)}}
                        className={`absolute top-0 z-10 ${props.direction=== 'ltr'?"right-0":"left-0"}`}
                      >
                        <CloseSimple className='w-8 h-8 fill-white' />
                      </button>

                      <HightlightItemSlider
                        direction={props.direction}
                        keyword={highlight.Keyword}
                        isActive={activeHighlightId === highlight.id}
                        goToNextHighlight={() => {
                          setActiveHighlightId((prevId) => {
                            const prevActiveIndex = highlights.findIndex(
                              (h) => h.id === prevId,
                            )
                            if (prevActiveIndex < highlights.length - 1) {
                              return highlights[prevActiveIndex + 1].id
                            }
                            setSlideIn(false);
                            return prevId
                          })
                        }}
                        goToPreviousHighlight={() => {
                          setActiveHighlightId((prevId) => {
                            const prevActiveIndex = highlights.findIndex(
                              (h) => h.id === prevId,
                            )
                            if (prevActiveIndex > 0) {
                              return highlights[prevActiveIndex - 1].id
                            }
                            return undefined
                          })
                        }}
                      />

                      <div className="absolute bottom-1.5 right-3 flex gap-1 text-2xs items-center">
                        <Image
                          src={
                            highlight?.Item?.Image.url
                              ? `${ServerAddress.Type}${ServerAddress.Strapi}${highlight.Item.Image.url}`
                              : '/images/default-game.png'
                          }
                          alt={highlight?.Item?.Title || ''}
                          width={64}
                          height={64}
                          className="block w-10 h-10"
                          quality={50}
                        />
                        <span className='text-neutral-800 font-semibold'>
                        {highlight?.Item?.Title}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </ModalPortal>
      </section>
    )
  }

  return null
}

export default Highlights
