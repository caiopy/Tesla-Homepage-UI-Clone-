import { useCallback, useRef, useState } from "react"
import { ReactNode } from "react"
import ModelsContext from "../ModelsContext"
import { Container, OverlaysRoot } from "./styles"
import { ModelOverlay } from '../ModelOverlay'





interface CarModel {
  modelName: string
  overlayNode: ReactNode
  sectionRef: React.RefObject<HTMLElement>
}

interface ModelsWrapperProps {
  children: ReactNode
}

export default function ModelsWrapper({ children }: ModelsWrapperProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)

  const [registeredModels, setRegisteredModels] = useState<CarModel[]>([])

  //add modelo
  const registerModel = useCallback((model: CarModel) => {
    setRegisteredModels(state => [...state, model])
  }, [])

  //remove o modelo que tem o mesmo "modelName" passado no parametro
  const unregisterModel = useCallback((modelName: string) => {
    setRegisteredModels(state => state.filter(model => model.modelName !== modelName))
  }, [])

  //retorna o modelo que possui o mesmo "modelName" passado no parametro
  const getModelByName = useCallback((modelName: string) => {
    return registeredModels.find(item => item.modelName === modelName) || null
  }, [registeredModels])

  return (
    <ModelsContext.Provider value={{
      wrapperRef,
      registeredModels,
      registerModel,
      unregisterModel,
      getModelByName


    }}>
      <Container ref={wrapperRef}>
        <OverlaysRoot>
          {registeredModels.map(item => (
            <ModelOverlay key={item.modelName} model={item}>
              {item.overlayNode}
            </ModelOverlay>
          ))}
        </OverlaysRoot>
        {children}
      </Container>
    </ModelsContext.Provider>
  )
}