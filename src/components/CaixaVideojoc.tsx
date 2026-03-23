import "./CaixaVideojoc.css";

/**
 * Propietats del component `CaixaVideojoc`
 */
export type prop = {
    title: string,
    preu: number,
    descripcio: string
};

/**
 * Mostra una targeta amb la informacio basica d'un videojoc
 *
 * @param prop Dades del videojoc a renderitzar.
 */
function CaixaVideojoc(prop: prop) {
    return (
        <div className={"CaixaVideojoc"}>
            <h2 className={"title"}>{prop.title}</h2>
            <p className={"preu"}>{prop.preu}</p>
            <p className={"descripcio"}>{prop.descripcio}</p>
        </div>
    )
}

export default CaixaVideojoc;