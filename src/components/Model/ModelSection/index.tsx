import { useEffect, useRef } from "react"
import { ReactNode } from "react"
import useModel from "../useModel"
import { Container } from "./styles"

interface ModelSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  modelName: string
  overlayNode: ReactNode
  children: ReactNode
}


export default function ModelsWrapper({ modelName, overlayNode, children, ...props }: ModelSectionProps) {

  const { registerModel } = useModel(modelName)

  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (sectionRef.current) {
      registerModel({
        modelName,
        overlayNode,
        sectionRef
      })
    }
  }, [])

  return (
    <Container ref={sectionRef} {...props}>
      {children}
    </Container>
  )
}