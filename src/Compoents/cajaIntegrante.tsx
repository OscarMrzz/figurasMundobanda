
const estilosEscuadra = {
    R:"bg-red-200 text-red-600",
    T:"bg-yellow-200 text-yellow-600",
    L:"bg-green-200 text-green-600",
    B:"bg-blue-200 text-blue-600",
    P:"bg-purple-200 text-purple-600",
    G:"bg-pink-200 text-pink-600",
    C:"bg-teal-300 text-teal-600",


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
 
    const colorClass = estilosEscuadra[escuadra as keyof typeof estilosEscuadra] || " text-gray-400";
  return (
    <div
      onClick={handelClick}
      onDoubleClick={handelDoubleClick}
      onMouseDown={ElmausePresionado}
      onMouseEnter={ElmauseEntrado}
      className={`bg h-7 w-7  flex items-center justify-center cursor-pointer hover:bg-blue-100`}
    >
      <div  className={`${colorClass} h-5 w-5 flex items-center justify-center select-none `}>

      {escuadra}
      </div>
    </div>
  );
}
