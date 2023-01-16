const controladorPruductos = async () =>{
    const resp = await fetch('/javaScript/stock.json');
    const data = await resp.json();
    return data;
};
