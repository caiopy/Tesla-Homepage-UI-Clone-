import { useTransform } from 'framer-motion'
import { useState } from 'react'
import { useCallback } from 'react'
import { useLayoutEffect } from 'react'
import { ReactNode } from 'react'
import { useWrapperScroll } from '../useWrapperScroll'
import { ModelOverlayContainer } from './styles'


interface CarModel {
  modelName: string
  overlayNode: ReactNode
  sectionRef: React.RefObject<HTMLElement>
}


interface ModelOverlayProps {
  children: ReactNode
  model: CarModel
}

type SectionDimensions = Pick<HTMLDivElement, 'offsetTop' | 'offsetHeight'>

export function ModelOverlay({ model, children }: ModelOverlayProps) {
  const { scrollY } = useWrapperScroll()
  const getSectionDimensions = useCallback(() => {
    return {
      offsetTop: model.sectionRef.current?.offsetTop,
      offsetHeight: model.sectionRef.current?.offsetHeight
    } as SectionDimensions
  }, [model.sectionRef])

  const [dimensions, setDimensions] = useState<SectionDimensions>(getSectionDimensions)

  useLayoutEffect(() => {
    function onResize() {
      window.requestAnimationFrame(() => setDimensions(getSectionDimensions()))
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)

  }, [getSectionDimensions, model.sectionRef])
  // a quantidade que o usuário "scrollou" menos o tanto que falta para chegar ao topo da div dividido pelo tamanho total da div
  const sectionScrollProgress = useTransform(scrollY, y => (y - dimensions.offsetTop) / dimensions.offsetHeight)

  const opacity = useTransform(sectionScrollProgress, [-0.42, -0.05, 0.05, 0.42], [0, 1, 1, 0])

  const pointerEvents = useTransform(opacity, value => value > 0 ? 'auto' : 'none')

  return (
    <ModelOverlayContainer style={{ opacity, pointerEvents }}>
      {children}
    </ModelOverlayContainer>


  )
}