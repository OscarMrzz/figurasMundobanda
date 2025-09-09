import  { useState } from "react";
import CajaIntegrante from "./Compoents/cajaIntegrante";
import escuadras from "./data/escuadras.json";

import { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";



const arregloInicial = Array(400 - 1 - 19 - 19 - 19 - 19).fill(null);
const filas = Array(17).fill(null);
const columnas = Array(19).fill(null);

export default function App() {
  const hojaReferencia = useRef<HTMLDivElement>(null);

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
  });

  const marcarCuadro = (index: number) => {
    if (
      escuadraSeleccionada !== null &&
      celdas[index] !== escuadraSeleccionada
    ) {
      const nuevoArreglo = [...celdas];
      nuevoArreglo[index] = escuadraSeleccionada;
      setCeldas(nuevoArreglo);

      setContadorIntegrantes({
        ...contadorIntegrantes,
        [escuadraSeleccionada]: contadorIntegrantes[escuadraSeleccionada] + 1,
      });
    }
  };
  const desmarcarCuadro = (index: number) => {
    if (celdas[index] !== null) {
      const escuadraActual = celdas[index];
      const nuevoArreglo = [...celdas];
      nuevoArreglo[index] = "";
      setCeldas(nuevoArreglo);

      setContadorIntegrantes({
        ...contadorIntegrantes,
        [escuadraActual as string]:
          contadorIntegrantes[escuadraActual as string] - 1,
      });
    }
  };

  const eleccionEscuadra = (letra: string) => {
    setEscuadraSeleccionada(letra);
  };

  const generarPDF = async () => {
    if (hojaReferencia.current) {
      const canvas = await html2canvas(hojaReferencia.current);
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: [612, 792], // Tamaño carta en puntos
      });
      pdf.addImage(imgData, "PNG", 0, 0, 612, 792);
      pdf.save("hoja_de_trabajo.pdf");
    }
  };
  return (
    <div className="bg-gray-200 grid grid-cols-[1fr_auto_1fr]  h-full p-10">
      <div ref={hojaReferencia}></div>
      <div  className=" w-[612px] h-[792px] bg-white shadow-lg  pr-6 pl-6 pb-10 pt-5">
        <div className="h-35 ">
          <input
            type="text"
            maxLength={50}
            className="text-2xl w-full font-bold  border-0 focus:outline-none items-center justify-center"
          />
          <input
            type="text"
            maxLength={55}
            className="w-full font-bold  border-0 focus:outline-none"
          />

          <div className="grid grid-cols-4">
            <p className="flex gap-2 font-light">
              {" "}
              <span className="font-bold text-gray-700">
                R{" "}
              </span>Redoblantes: <span> {contadorIntegrantes.R}</span>{" "}
            </p>
            <p className="flex gap-2 font-light">
              {" "}
              <span className="font-bold text-gray-700">T </span>Tarolas:{" "}
              <span> {contadorIntegrantes.T}</span>
            </p>
            <p className="flex gap-2 font-light">
              {" "}
              <span className="font-bold text-gray-700">L </span>Liras:{" "}
              <span> {contadorIntegrantes.L}</span>
            </p>
            <p className="flex gap-2 font-light">
              {" "}
              <span className="font-bold text-gray-700">B </span>Bombos:{" "}
              <span> {contadorIntegrantes.B}</span>
            </p>
            <p className="flex gap-2 font-light">
              {" "}
              <span className="font-bold text-gray-700">P </span>Platillos:{" "}
              <span> {contadorIntegrantes.P}</span>
            </p>
            <p className="flex gap-2 font-light">
              {" "}
              <span className="font-bold text-gray-700">G </span>Guiros:{" "}
              <span> {contadorIntegrantes.G}</span>
            </p>
            <p className="flex gap-2 font-light">
              {" "}
              <span className="font-bold text-gray-700">C </span>Coristas:{" "}
              <span> {contadorIntegrantes.C}</span>
            </p>
          </div>
    
        </div>
        <div>
          <div className="flex gap-2 text-gray-500 font-light">
            <span className="w-5 h-5 justify-center items-center"></span>
            {columnas.map((_, colIndex) => (
              <span
                key={colIndex}
                className="w-5 h-5 justify-center items-center"
              >
                {colIndex < 9 ? `0${colIndex + 1}` : colIndex + 1}
              </span>
            ))}
          </div>
          <div className="flex">
            <div className="flex flex-col gap-2  text-gray-500 font-light">
              <span className="w-5 h-5 justify-center items-center mt-2">
                01
              </span>
              {filas.slice(1).map((_, rowIndex) => (
                <span
                  key={rowIndex}
                  className="w-5 h-5 justify-center items-center"
                >
                  {rowIndex + 2 < 10 ? `0${rowIndex + 2}` : rowIndex + 2}
                </span>
              ))}
            </div>
            <div className="pl-2 w-full h-full flex flex-wrap  place-content-start border-t-2 border-l-2 pt-2  border-gray-300">
              {celdas.map((celda, index) => {
                return (
                  <CajaIntegrante
                    key={index}
                    escuadra={celda}
                    seleccionarCuadro={() => marcarCuadro(index)}
                    deseleccionarCuadro={() => desmarcarCuadro(index)}
                  />
                );
              })}
            </div>
          </div>
                <div className="mt-2">
            <p className="text-gray-600 font-bold">NOTA:</p>
            <textarea
              rows={2}
              maxLength={132}
              className="font-light mb-4 w-full border-0 focus:outline-none resize-none"
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
      <div className=" flex flex-col  p-10 ">
        <h1 className="text-2xl text-gray-700 font-bold">ESCUDRAS</h1>
        <div className="flex flex-col gap-2 bg-[#1b4965] w-60 p-10 text-white">
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
              id={escuadras.cueros.letra}
              type="radio"
              name="eleccionEscuadra"
              value={escuadras.cueros.letra}
              onChange={() => eleccionEscuadra(escuadras.cueros.letra)}
            />
            {escuadras.cueros.nombre}
          </label>
        </div>
        <button className="cursor-pointer bg-gray-800 text-white mt-10 h-10"  onClick={() => generarPDF()}>Generar PDF</button>
        <button className="cursor-pointer bg-gray-800 text-white mt-2 h-10"  onClick={() => {alert("Aun no se puede imprimir")}}>Imprimir</button>
      </div>
      
    </div>
  );
}
