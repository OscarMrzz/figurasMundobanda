
const estilosEscuadra = {
  X: "escuadra-X",
  R: "escuadra-R",
  T: "escuadra-T",
  L: "escuadra-L",
  B: "escuadra-B",
  P: "escuadra-P",
  G: "escuadra-G",
  C: "escuadra-C",
  M: "escuadra-M",
};

type Props = {
  escuadra: string;
  seleccionarCuadro: () => void;
  deseleccionarCuadro: () => void;
  mausePresionado: () => void;
  mauseEntrado: () => void;
 
};

export default function Cajaescuadra({ escuadra, seleccionarCuadro,deseleccionarCuadro,mauseEntrado,mausePresionado }: Props) {

  
  const handelClick = () => {
    seleccionarCuadro();
  };
  const handelDoubleClick = () => {
    deseleccionarCuadro();
  };
  const ElmausePresionado = () => {
    mausePresionado();
  }
  const ElmauseEntrado = () => {
    mauseEntrado();
  }
 
    const colorClass = estilosEscuadra[escuadra as keyof typeof estilosEscuadra] ;
  return (
    <div
      onClick={handelClick}
      onDoubleClick={handelDoubleClick}
      onMouseDown={ElmausePresionado}
      onMouseEnter={ElmauseEntrado}
      className={`caja`}
    >
      <div  className={`${colorClass} escuadraGenera `}>
{escuadra !== "X" ? escuadra : null}
      </div>
    </div>
  );
}
