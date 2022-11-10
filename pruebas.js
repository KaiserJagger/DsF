
//Variables Globales

const Cambios = [
    "Pesos Argentinos", 
    "Dolares Estadounidenses",
    "Euros",
];
const desc = 0.10; //Descuento por servicios

function main(){
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
        //Agrego evento de change
        selectCountry.addEventListener("change",(event) =>{
            const target = event.target;
            const valor = target.value;
            // console.log(valor)
        });
    
    }


        const selectMoney = document.getElementById("tipo_conversion");
         //Creo las opciones
        for (const cambio of Cambios){
            const option = document.createElement("option");
            option.innerText = cambio;
            //Add options to a select
           selectMoney.append(option);
        }
        
        //Agregamos evento de change
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

function convertidor(paises){
    const enviarConversion = (event) => {
        event.preventDefault();
      

        //obtengo el monto a convertir
        const enterAmount = document.getElementById("amount");
        if (enterAmount.value.length === 0){
            Toastify({
                text: "Ingrese un monto a mandar",
                duration: 1500
            }).showToast();
        }
        
        console.log(enterAmount.value)

   
        Toastify({
            text: "Ingrese un pais",
            duration: 1500
        }).showToast();

        let amount = enterAmount.value;
        //Hago la conversion y descuento el porcentaje
        let descTotal = amount * desc;

        let res = amount - descTotal;

        //Creo elemento de informe de conversion

        const p = document.createElement("p");
        p.id = "informe";
        contenedor.append(p);



        if(selectMoney.value === Cambios[0]){
            paises.convArg = (res * paises.convArg);
            const informe = document.getElementById("informe");
            informe.innerHTML = `Se van a mandar a <strong>${paises.pais}</strong> la suma de: <strong>$${paises.convArg?.toFixed(2)}</strong> ${paises.moneda}`
            paises.convArg = 0;
            console.log("La ganancia es: $"+ descTotal + " pesos");
        
        }else if(selectMoney.value === Cambios[1]){
            paises.convDolar = (res * paises.convDolar);
            const informe = document.createElement("informe");
            informe.innerHTML = `Se van a mandar a <strong>${paises.pais}</strong> la suma de: <strong>$${paises.convDolar?.toFixed(2)}</strong> ${paises.moneda}`
            paises.convDolar = 0;
            console.log("La ganancia es: $"+ descTotal + " dolares");
        
        }else{
            Toastify({
                text: "Ingrese un tipo de moneda",
                duration: 1000
            }).showToast();
    }
}
        
        conversion.addEventListener("submit", enviarConversion); 
}   




    const cargarDatos = async () => {
       try{
            const res = await fetch("/paises.json");
            const paises = await res.json()
            console.log(paises);
            const conv1 = await paises
            
            
            selectCountry(paises);

        
       }catch(error){
            console.log(error);
       }
       }
       
       
    
       cargarDatos();
}

      
main();
