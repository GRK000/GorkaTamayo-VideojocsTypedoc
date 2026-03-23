import './App.css'
import CaixaVideojoc from "./components/CaixaVideojoc";
import {type JSX, useActionState, useState} from "react";

/**
 * Estat retornat per l'accio del formulari
 */
export type ActionState = {
  success: boolean
};

/**
 * Genera la funcio `action` del formulari per afegir videojocs a la llista.
 *
 * @param videojocs Llista actual de targetes de videojocs renderitzades.
 * @param setVideojocs Setter de React per actualitzar la llista.
 * @returns Funcio asyncrona compatible amb `useActionState`
 */
export function HandleForm(videojocs: JSX.Element[], setVideojocs: (array: JSX.Element[]) => void) {
  return async function(_prevState: ActionState, formdata: FormData): Promise<ActionState> {
    const nom = formdata.get("Nom");
    const preu = formdata.get("Preu");
    const desc = formdata.get("Descripcio");

    if (nom != null && preu != null && desc != null) {
      const nouvideojocs = [...videojocs,
        <CaixaVideojoc title={String(nom)} preu={Number(preu)} descripcio={String(desc)}/>
      ];
      setVideojocs(nouvideojocs);
      return { success: true };
    } else {
      return { success: false };
    }
  }
}

/**
 * Component principal de l'aplicacio.
 * Mostra el formulari i el llistat de videojocs creats dinamicamente.
 */
export function App() {
  // Guarda les targetes de videojocs que es mostren a pantalla.
  const [videojocs, setVideojocs] = useState<JSX.Element[]>([]);

  // Controla l'estat de l'ultima submissio del formulari.
  const [state, FormAction] = useActionState<ActionState, FormData>(HandleForm(videojocs, setVideojocs), {
    success: false
  })

  return (
    <>
      <div id={"LListatVideojocs"}>
        {state.success && videojocs}
      </div>
      <form action={FormAction}>
        <label>Nom videojoc<input name={"Nom"} type={"text"}/></label>
        <label>Preu videojoc<input name={"Preu"} type={"number"} min={0} max={1000}/></label>
        <label>Descripcio videojoc<textarea name={"Descripcio"}/></label>
        <button>Nou videojoc</button>
      </form>
    </>
  )
}

export default App
