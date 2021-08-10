import { DefaultOverlayContent } from '../DefaultOverlayContent'
import { Container, Spacer } from './styles'
import { ModelsWrapper, ModelSection } from '../Model'
import { UniqueOverlay } from '../UniqueOverlay'


export function Page() {
  return (
    <Container>
      <ModelsWrapper>
        <div>
          {[
            'Model One',
            'Model Two',
            'Model Three',
            'Model Four',
            'Model Five',
            'Model Six',
            'Model Seven',
          ].map(modelName =>
          (
            <ModelSection
              key={modelName}
              modelName={modelName}
              overlayNode={<DefaultOverlayContent label={modelName} description="Order Online for Delivery" />}
              children
              className="colored"
            />
          )
          )}


        </div>
        <Spacer />

        <UniqueOverlay />
      </ModelsWrapper>
    </Container>
  )
}



//os titulo etc na Page são fixos, so fazem desaparecer e aparecer
//ModelsWrapper => contém todos os titulos e imagens
//ModelSection=> representa a section de cada modelo de carro(o modelName é apenas um identificador pra section, overlayNode é o que sera apresentado(no caso o componente criado))
