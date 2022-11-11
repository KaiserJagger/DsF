

//Variables Globales

const Cambios = [
    "Pesos Argentinos", 
    "Dolares Estadounidenses",
];
const desc = 0.10; //Descuento por servicios


    // Creo el select paises
    function selectCountry(listCountrys){
        
        const selectCountry = document.getElementById("selectCountrys");
        //  Creo las opciones
        for (const paises of listCountrys){        
            const option = document.createElement("option");
            option.innerText = paises.pais;
    
            //Agrego opciones al select
            selectCountry.append(option);
        }
        
        //Evento de seleccion de pais a mandar 
        selectCountry.addEventListener("change",(event) =>{
            const target = event.target;
            const valor = target.value;
            // console.log(valor)
        });
    
    }

    function buscarPais(pais){
        return listCountrys.find((el) =>{
            return el.pais === pais;
        });
    }


   
    //Creo select de tipo de moneda
        const selectMoney = document.getElementById("tipo_conversion");
         //Creo las opciones
        for (const cambio of Cambios){
            const option = document.createElement("option");
            option.innerText = cambio;

             //Agrego opciones al select
           selectMoney.append(option);
        }
        
         //Evento de seleccion de tipo de moneda que se va a mandar
        selectMoney.addEventListener("change", (event) => {
            const target = event.target;
            const valor = target.value;
         });
    

        


   // Creo formulario de conversion

const contenedor = document.getElementById("contenedor");
const formulario = document.createElement("form");
formulario.id= "conversion";
const input = document.createElement("input");
const boton = document.createElement("button");
input.id = "amount"
input.placeholder = "Monto"
input.type = "number"; 
boton.innerText = "Convertir";
boton.type = "submit";
contenedor.append(formulario);
formulario.append(input, boton);

const conversion = document.getElementById("conversion");


    const enviarConversion = (event) => {
        event.preventDefault();
      

        //obtengo el monto a convertir
        const enterAmount = document.getElementById("amount");
        if (enterAmount.value.length === 0){
            // Toastify({
            //     text: "Ingrese un monto a mandar",
            //     duration: 1500
            // }).showToast();
        }
        
        console.log(enterAmount.value)

   
        // Toastify({
        //     text: "Ingrese un pais",
        //     duration: 1500
        // }).showToast();

        // Asigno el monto que ingreso por el input
        let amount = enterAmount.value;
        //Hago la conversion y descuento el porcentaje
        let descTotal = amount * desc;
        // Saco el descuento 
        let res = amount - descTotal;

        //Creo elemento de informe de conversion
        const p = document.createElement("p");
        p.id = "informe";
        contenedor.append(p);
        
        //Llamo a funcion buscar pais donde me dice si el pais seleccionado en selectCountry esta en el arreglo
        const paises = buscarPais(selectCountry.value);

        //recorro todo el arreglo
        listCountrys.forEach(paises=> {
            
        //consulto si el tipo de moneda elegido en el selectMoney son pesos argentinos
        if(selectMoney.value === Cambios[0]){
            //Hago la conversion del res (que es el monto menos el descuento) por la conversion de pesos arg segun el pais
            paises.convArg = (res * paises.convArg);
            
            //creo un elemento para mostrar la conversion 
            const informe = document.getElementById("informe");
            informe.innerHTML = `Se van a mandar a <strong>${paises.pais}</strong> la suma de: <strong>$${paises.convArg?.toFixed(2)}</strong> ${paises.moneda}`
            paises.convArg = 0;

            //muestro la ganancia
            console.log("La ganancia es: $"+ descTotal + " pesos");
         
            //consulto si el tipo de moneda elegido en el selectMoney son dolares
        }else if(selectMoney.value === Cambios[1]){
            paises.convDolar = (res * paises.convDolar); 
            
            //creo un elemento para mostrar la conversion 
            const informe = document.createElement("informe");
            informe.innerHTML = `Se van a mandar a <strong>${paises.pais}</strong> la suma de: <strong>$${paises.convDolar?.toFixed(2)}</strong> ${paises.moneda}`
            paises.convDolar = 0;
            console.log("La ganancia es: $"+ descTotal + " dolares");
        
        }else{
            // Toastify({
            //     text: "Ingrese un tipo de moneda",
            //     duration: 1000
            // }).showToast();
        }
    });
}
conversion.addEventListener("submit", enviarConversion); 


//declaro variable global para almacenar lo que traigo del json
  let listCountrys;

    const cargarDatos = async () => {
       try{
            const res = await fetch("/paises.json");
            const data = await res.json()
            selectCountry(data);
            
            listCountrys = data
             

        
       }catch(error){
            console.log(error);
       }
       }
       
    
       cargarDatos();
