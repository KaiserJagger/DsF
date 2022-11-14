                                        /   * Proyecto Final *     /
    
/* 
        Nombre: Nicolas Andreolli
*/
                                    
                                //$$$$$$$   Dinero Sin Fronteras    $$$$$$$$


 // Variables de ingreso
 const headerIngreso = document.getElementById("ingreso");
 const formularioDeIngreso = document.getElementById("formulario-de-ingreso");
 
 const cuentas = obtenerCuentas();
 
 const inputNombre = document.getElementById("nombre");
 const inputEmail = document.getElementById("email");
 const inputClave = document.getElementById("clave");
 const salirSesion = document.getElementById("botonSalir");
 
 // localStorage.clear()


   
                                //Funciones de ingreso de usuario 

function obtenerCuentas(){
    const cuentaLS = localStorage.getItem("cuentas");
    if(cuentaLS !== null){
        return JSON.parse(cuentaLS);
    }
    return [];
}

function usuarioExistente(email){
    return !cuentas.some((el) => {
        return el.email === email;
    });
}

function mostrarUsuario(nombre){
    // Limpiar el header
    headerIngreso.innerHTML = "Bienvenido " + nombre;
   
    const salir = document.createElement("button");
    salir.id = "botonSalir";
    salir.innerText = "Salir";
    salir.type = "button";
  
    headerIngreso.append(salir);

}

localStorage.clear()
                                /*      Evento de registro      */

 formularioDeIngreso.addEventListener("submit", (event) => {
 
         event.preventDefault();
     
     // Obtenemos los datos del input
     const nombre = inputNombre.value;
     const email = inputEmail.value;
     const clave = inputClave.value;
 
              
             //chequeo que el usuario no este registrado
         if(usuarioExistente(email)){
             
             //cargo los datos en el array
             cuentas.push({
                 nombre : nombre,
                 email: email,
                 clave: clave,
                 });
                      
          localStorage.setItem("cuentas", JSON.stringify(cuentas));
            
          alert("Ingreso correcto");
          mostrarUsuario(nombre);
 
         }else{
             alert("Usuario existente");
         } 
  
         //limpio los input
                 nombre.value = "";
                 email.value = "";
                 clave.value = "";    
            
 
     });

      //Evento de salir de sesion




                                    //Variables De Conversion

const Cambios = [
    "Pesos Argentinos", 
    "Dolares Estadounidenses",
];
const desc = 0.10; //Descuento por servicios


//Funcion de apagado
function dsf(){
    // Creo el select paises

        
        const selectCountrys = document.getElementById("selectCountrys");

        function selectCountry(listCountrys){
            //  Creo las opciones
            for (const paises of listCountrys){        
                const option = document.createElement("option");
                option.innerText = paises.pais;
        
                //Agrego opciones al select
                selectCountrys.append(option);
            }
        }
        //Agrego evento de change
        selectCountrys.addEventListener("change",(event) =>{
            const target = event.target;
            const valor = target.value;
            // console.log(valor)
        });


        const selectMoney = document.getElementById("selectMoney");
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
 const formularioConversion = document.createElement("form");
 formularioConversion.id= "conversion";
 const input = document.createElement("input");
 input.id = "amount";
 input.placeholder = "Monto";
 input.type = "number"; 
 const boton = document.createElement("button");
 boton.id = "boton-de-conversion";
 boton.innerText = "Convertir";
 boton.type = "submit";

 //Obtengo el id de convertidor
 const convertidor = document.getElementById("convertidor");
 convertidor.append(formularioConversion);
 formularioConversion.append(input, boton);
 
const salidaDeInfo = document.getElementById("salidaDeInfo")
//agrego el div salidaDeInfo al contenedor
contenedor.append(salidaDeInfo);

//Informe de conversion
const p = document.createElement("p");
p.id = "informe";
salidaDeInfo.append(p);




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

        
        let amount = enterAmount.value;
        //Hago la conversion y descuento el porcentaje
        let descTotal = amount * desc;

        let res = amount - descTotal;


        const paises = buscarPais(selectCountrys.value);
        const informe = document.getElementById("informe");        

        if(selectMoney.value === Cambios[0]){
            paises.convArg = (res * paises.convArg);
            informe.innerHTML = `<strong> Destino:</strong> ${paises.pais} 
            <br><strong>Monto $</strong> ${paises.convArg?.toFixed(2)}
            <br><strong>Moneda:</strong> ${paises.moneda}`
            paises.convArg = 0;
            console.log("La ganancia es: $"+ descTotal + " pesos");
        
        }else if(selectMoney.value === Cambios[1]){
            paises.convDolar = (res * paises.convDolar); 
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

        function buscarPais(pais){
            return listaPaises.find((el) =>{
            return el.pais === pais;
        });
        }


        let listaPaises;

            fetch("/paises.json")
            .then((response) => {
                return response.json();
            }).then((data) => {
                listaPaises = data;
                selectCountry(listaPaises);
                
                buscarPais(listaPaises)

            })
            // .catch(error)
            // console.log(error);

    }


   
dsf();
