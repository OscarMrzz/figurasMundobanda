import { useEffect, useState } from "react";
import CajaIntegrante from "./Compoents/cajaIntegrante";
import escuadras from "./Data/escuadras.json";

import { useRef } from "react";

import html2pdf from "html2pdf.js";
import JuecesIcono from "./Compoents/Iconos/JuecesIcono";
import FlechaizquierdaIcono from "./Compoents/Iconos/FlechaIzquierdaIcono";
import FlechaDerecgaIcono from "./Compoents/Iconos/FlechaDerecgaIcono";

const arregloInicial = Array(400 + 13 + 9 + 10+18).fill(null);
/* const filas = Array(17 + 2).fill(null);
const columnas = Array(19 + 5).fill(null);
 */
export default function App() {
  const hojaReferencia = useRef<HTMLDivElement>(null);
  const [mausePresionado, setMausePresionado] = useState(false);

  const [escuadraSeleccionada, setEscuadraSeleccionada] = useState<
    string | null
  >("");
  const [celdas, setCeldas] = useState<string[]>(arregloInicial);
  const [contadorIntegrantes, setContadorIntegrantes] = useState<{
    [key: string]: number;
  }>({
  
    R: 0,
    T: 0,
    L: 0,
    B: 0,
    P: 0,
    G: 0,
    C: 0,
    M: 0,
  });
  const [totalIntegrantes, setTotalIntegrantes] = useState<number>(0);

  const hacerrecuentoDeIntegrantes = () => {
    const datosDeControl = { ...contadorIntegrantes };
    for (const clave in datosDeControl) {
      const nuevoConteo = celdas.filter((cel) => cel === clave).length;
      if (nuevoConteo !== datosDeControl[clave]) {
        datosDeControl[clave] = nuevoConteo;
      }
    }
    setContadorIntegrantes(datosDeControl);
    const total = Object.values(datosDeControl).reduce(
      (acc, curr) => acc + curr,
      0
    );
    setTotalIntegrantes(total);
  };
  useEffect(() => {
    hacerrecuentoDeIntegrantes();
  }, [celdas]);

  const marcarCuadro = (index: number) => {
    if (escuadraSeleccionada === null || escuadraSeleccionada === "") return;
    if (
      escuadraSeleccionada !== null &&
      celdas[index] !== escuadraSeleccionada
    ) {
      const nuevoArreglo = [...celdas];
      nuevoArreglo[index] = escuadraSeleccionada;
      setCeldas(nuevoArreglo);
      if (escuadraSeleccionada !== "X") {
        setTotalIntegrantes(totalIntegrantes + 1);
      }
    }
  };
  const desmarcarCuadro = (index: number) => {
    if (celdas[index] !== "") {
      const nuevoArreglo = [...celdas];
      nuevoArreglo[index] = "";
      setCeldas(nuevoArreglo);
      if (escuadraSeleccionada !== "X") {
        setTotalIntegrantes(totalIntegrantes - 1);
      }
    }
  };

  const eleccionEscuadra = (letra: string) => {
    setEscuadraSeleccionada(letra);
  };

  const generarPDF = async () => {
    if (hojaReferencia.current) {
      const element = hojaReferencia.current;

      const opt = {
        margin: 0,
        filename: "Figura.pdf",
        image: { type: "jpeg", quality: 1 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          backgroundColor: null, // 🔥 evita que ponga todo negro
        },
        jsPDF: { unit: "mm", format: "letter", orientation: "portrait" },
      };

      html2pdf().set(opt).from(element).save();
    }
  };
  const limiarHoja = () => {
    setCeldas(arregloInicial);
    setContadorIntegrantes({
    
      R: 0,
      T: 0,
      L: 0,
      B: 0,
      P: 0,
      G: 0,
      C: 0,
      M: 0,
    });
    setTotalIntegrantes(0);
  };

  const handleMausePresionado = (index: number) => {
    setMausePresionado(true);
    marcarCuadro(index);
  };
  const handleMauseEntrado = (index: number) => {
    if (mausePresionado) {
      marcarCuadro(index);
    }
  };
  return (
    <div
      onMouseUp={() => setMausePresionado(false)}
      className=" min-h-screen grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] h-full p-2 lg:p-10 "
    >
      <div className=" flex flex-col ">
        <p className="text-2xl text-gray-300 font-bold ">FIGURAS MUNDO BANDA</p>
        <p className="text-xl text-gray-400 font-bold ">VERSION: 1.4</p>
        <p className="text-xl text-gray-400  ">30 de septiembre 2025</p>
        <p></p>
      </div>
      <div ref={hojaReferencia} className="hoja">
        <div className="hoja__header">
          <input type="text" maxLength={50} className="hoja__titulo" />
          <input type="text" maxLength={55} className="hoja__subtitulo" />

          <div className="hoja__stats">
            <p className="hoja__stat">
              <span className="hoja__stat-span"></span>Redoblantes:{" "}
              <span> {contadorIntegrantes.R}</span>{" "}
            </p>
            <p className="hoja__stat">
              <span className="hoja__stat-span"></span>Tarolas:{" "}
              <span> {contadorIntegrantes.T}</span>
            </p>
            <p className="hoja__stat">
              <span className="hoja__stat-span"></span>Liras:{" "}
              <span> {contadorIntegrantes.L}</span>
            </p>
            <p className="hoja__stat">
              <span className="hoja__stat-span"></span>Bombos:{" "}
              <span> {contadorIntegrantes.B}</span>
            </p>
            <p className="hoja__stat">
              <span className="hoja__stat-span"></span>Platillos:{" "}
              <span> {contadorIntegrantes.P}</span>
            </p>
            <p className="hoja__stat">
              <span className="hoja__stat-span"></span>Guiros:{" "}
              <span> {contadorIntegrantes.G}</span>
            </p>
            <p className="hoja__stat">
              <span className="hoja__stat-span"></span>Conga:{" "}
              <span> {contadorIntegrantes.C}</span>
            </p>
            <p className="hoja__stat">
              <span className="hoja__stat-span"></span>Merengueras:{" "}
              <span> {contadorIntegrantes.M}</span>
            </p>
          </div>
          <p className="hoja__total">
            Total: <span> {totalIntegrantes}</span>
          </p>
        </div>
        <div>
          <div className="hoja__cuerpo-grid">
            <div className="contenedorindexGrid-row">
              {/*     <span className="mb-1.75 "></span>
              {filas
                .slice(1)
                .map((_, rowIndex) => filas.length - 1 - rowIndex)
                .map((reverseIndex) => (
                  <span key={reverseIndex} className="indexGrid">
                    {reverseIndex < 10 ? `0${reverseIndex}` : reverseIndex}
                  </span>
                ))} */}
            </div>
            <div className="hoja__grid">
              {celdas.map((celda, index) => {
                return (
                  <CajaIntegrante
                    key={index}
                    escuadra={celda}
                    seleccionarCuadro={() => marcarCuadro(index)}
                    deseleccionarCuadro={() => desmarcarCuadro(index)}
                    mausePresionado={() => {
                      handleMausePresionado(index);
                    }}
                    mauseEntrado={() => {
                      handleMauseEntrado(index);
                    }}
                  />
                );
              })}
            </div>
          </div>
          <div>
            <div className="hoja__contenedor-index">
              {/*     <span className="ml-4.5"></span>
              {columnas.map((_, colIndex) => (
                <span key={colIndex} className="indexGrid">
                  {colIndex < 9 ? `0${colIndex + 1}` : colIndex + 1}
                </span>
              ))} */}
            </div>
            <div className="hoja__Orientacion">
              <span className="hoja__origientacion-item">
                <FlechaizquierdaIcono /> IZQUIERDA
              </span>
              <span className="hoja__origientacion-item">
                <JuecesIcono /> JURADO
              </span>
              <span className="hoja__origientacion-item">
                DERECHA <FlechaDerecgaIcono />
              </span>
            </div>

            <div className="mt-6">
              <div className="flex flex-col gap-2">
                <div className="flex gap-4 h-6">

              <p className="hoja__nota">Canciones: </p><input type="text" className="hoja__inputFooter" />
                </div>
                <div className="flex gap-4 h-6">
                    <p className="hoja__nota">Cierre: </p><input type="text" className="hoja__inputFooter" />

                </div>

                 <p className=" hoja__nota">Detalles:  </p>
              </div>
              <textarea
                rows={3}
                maxLength={150}
                className="hoja__cuerpo-nota"
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement;
                  if (target.value.split("\n").length > 2) {
                    target.value = target.value
                      .split("\n")
                      .slice(0, 2)
                      .join("\n");
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className=" flex flex-col  p-10 ">
        <h1 className="text-2xl text-gray-400 font-bold">ESCUADRAS</h1>
        <div className="flex flex-col gap-2 bg-gray-800 w-60 p-10 text-white">
          <label className="cursor-pointer flex gap-2 border-b-2">
            <input
              className="cursor-pointer"
              id={escuadras.bases.letra}
              type="radio"
              name="eleccionEscuadra"
              value={escuadras.bases.letra}
              onChange={() => eleccionEscuadra(escuadras.bases.letra)}
            />
            {escuadras.bases.nombre}
          </label>
          <label className="cursor-pointer flex gap-2">
            <input
              className="cursor-pointer"
              id={escuadras.redoblantes.letra}
              type="radio"
              name="eleccionEscuadra"
              value={escuadras.redoblantes.letra}
              onChange={() => eleccionEscuadra(escuadras.redoblantes.letra)}
            />
            {escuadras.redoblantes.nombre}
          </label>
          <label className="cursor-pointer flex gap-2">
            <input
              className="cursor-pointer"
              id={escuadras.tarolas.letra}
              type="radio"
              name="eleccionEscuadra"
              value={escuadras.tarolas.letra}
              onChange={() => eleccionEscuadra(escuadras.tarolas.letra)}
            />
            {escuadras.tarolas.nombre}
          </label>
          <label className="cursor-pointer flex gap-2">
            <input
              className="cursor-pointer"
              id={escuadras.liras.letra}
              type="radio"
              name="eleccionEscuadra"
              value={escuadras.liras.letra}
              onChange={() => eleccionEscuadra(escuadras.liras.letra)}
            />
            {escuadras.liras.nombre}
          </label>
          <label className="cursor-pointer flex gap-2">
            <input
              className="cursor-pointer"
              id={escuadras.bombos.letra}
              type="radio"
              name="eleccionEscuadra"
              value={escuadras.bombos.letra}
              onChange={() => eleccionEscuadra(escuadras.bombos.letra)}
            />
            {escuadras.bombos.nombre}
          </label>
          <label className="cursor-pointer flex gap-2">
            <input
              className="cursor-pointer"
              id={escuadras.platillos.letra}
              type="radio"
              name="eleccionEscuadra"
              value={escuadras.platillos.letra}
              onChange={() => eleccionEscuadra(escuadras.platillos.letra)}
            />
            {escuadras.platillos.nombre}
          </label>
          <label className="cursor-pointer flex gap-2">
            <input
              className="cursor-pointer"
              id={escuadras.guiros.letra}
              type="radio"
              name="eleccionEscuadra"
              value={escuadras.guiros.letra}
              onChange={() => eleccionEscuadra(escuadras.guiros.letra)}
            />
            {escuadras.guiros.nombre}
          </label>
          <label className="cursor-pointer flex gap-2">
            <input
              className="cursor-pointer"
              id={escuadras.congas.letra}
              type="radio"
              name="eleccionEscuadra"
              value={escuadras.congas.letra}
              onChange={() => eleccionEscuadra(escuadras.congas.letra)}
            />
            {escuadras.congas.nombre}
          </label>
          <label className="cursor-pointer flex gap-2">
            <input
              className="cursor-pointer"
              id={escuadras.merengueras.letra}
              type="radio"
              name="eleccionEscuadra"
              value={escuadras.merengueras.letra}
              onChange={() => eleccionEscuadra(escuadras.merengueras.letra)}
            />
            {escuadras.merengueras.nombre}
          </label>
        </div>
        <button
          className="w-60 cursor-pointer bg-gray-800 text-white mt-10 h-10"
          onClick={() => generarPDF()}
        >
          Generar PDF
        </button>

        <button
          className="w-60 cursor-pointer bg-gray-800 text-white mt-2 h-10"
          onClick={() => {
            limiarHoja();
          }}
        >
          Limpiar
        </button>
      </div>
    </div>
  );
}
