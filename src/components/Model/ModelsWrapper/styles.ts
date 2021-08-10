import styled from 'styled-components'

export const Container = styled.div`
  height: 100vh; //ela que vai "conter" o conteúdo, por isso deve ter o mesmo height q a modelSection
  scroll-snap-type: y mandatory;
  overflow-y: scroll;
`
export const OverlaysRoot = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

`
