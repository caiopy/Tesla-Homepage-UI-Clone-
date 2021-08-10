import { useMotionValue } from "framer-motion";
import { useContext, useEffect } from "react";
import ModelsContext from "./ModelsContext";


export function useWrapperScroll() {
  const { wrapperRef } = useContext(ModelsContext)
  const scrollY = useMotionValue(0) //from frame-motion
  const scrollYProgress = useMotionValue(0)

  useEffect(() => {
    const element = wrapperRef.current
    if (element) {
      const updateScrollValue = () => {

        const { scrollTop, scrollHeight, offsetHeight } = element

        const fullScroll = scrollHeight - offsetHeight

        scrollY.set(scrollTop)//number (quantidade de pixel "scrollada")
        scrollYProgress.set(scrollTop / fullScroll)//0 - 1 (%)

      }

      element.addEventListener('scroll', updateScrollValue)

      return () => element?.removeEventListener('scroll', updateScrollValue)
    }
  }, [])

  return { scrollY, scrollYProgress }
}