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
      function mostrarUsuario(nombre){
        // Limpiar el header
        headerIngreso.innerHTML = "Bienvenido " + nombre;
       
        const salir = document.createElement("button");
        salir.id = "botonSalir";
        salir.innerText = "Salir";
        salir.type = "button";
      
        headerIngreso.append(salir);
        
        salir.addEventListener("click" ,(event) => {
        event.preventDefault();
        localStorage.clear();
        
        
      });
    
    }
    
      
    // localStorage.clear();


                                    //Variables De Conversion
//Arreglo de tipos de cambio
const Cambios = [
    "Pesos Argentinos", 
    "Dolares Estadounidenses",
];
//Descuento por servicios
const desc = 0.10; 

//Precio del dolar en relacion al peso argentino
const dolar = 162.13;

 //Arreglo donde voy almacenar las conversiones
 let historialConversiones = [];



//Funcion de control
function dsf(){

    // Creo el select paises
  const selectCountrys = document.getElementById("select_paises");

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


        const selectMoney = document.getElementById("select_moneda");
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

          //Busco si pais existe
        function buscarPais(pais){
            return listaPaises.find((el) =>{
            return el.pais === pais;
        });
        }
    
        
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
 
const salidaDeInfo = document.getElementById("salida_info")
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
            Toastify({
                text: "Ingrese un monto a mandar",
                duration: 1500
            }).showToast();
        }
    
        let amount = enterAmount.value;
        //Hago la conversion y descuento el porcentaje
        let descTotal = amount * desc;
        //Le resto el desceunto que se le aplica por los servicios
        let res = amount - descTotal;

       

        const paises = buscarPais(selectCountrys.value);
        const informe = document.getElementById("informe");        

        if(selectMoney.value === Cambios[0]){
            paises.convArg = (res * paises.convArg);
            informe.innerHTML = `<strong> Destino:</strong> ${paises.pais} 
            <br><strong>Monto $</strong> ${paises.convArg?.toFixed(2)}
            <br><strong>Moneda:</strong> ${paises.moneda}`
            //Agrego producto al array y luego al localStorage
            historialConversiones.push({
                Pais : paises.pais,
                Monto_en_pesos : parseInt(res) + " pesos Arg",
                Monto_convertido : paises.convArg,
                Moneda: paises.moneda,
            });

            localStorage.setItem("historial", JSON.stringify(historialConversiones));
            console.log("La ganancia es: $"+ descTotal + " pesos");


        }else if(selectMoney.value === Cambios[1]){
            paises.convDolar = (res * paises.convDolar); 
            informe.innerHTML = `<strong> Destino:</strong> ${paises.pais} 
            <br><strong>Monto $</strong> ${paises.convDolar?.toFixed(2)}
            <br><strong>Moneda:</strong> ${paises.moneda}`
            //Agrego producto al array y luego al localStorage
            historialConversiones.push({
                Pais : paises.pais,
                Monto_en_pesos : parseInt(res) + " dolares",
                Moneda: paises.moneda,
                Monto_convertido : paises.convDolar,
                
            });
            
            let convAPesos = descTotal * dolar;
            console.log("La ganancia es: $"+ convAPesos + " pesos") ;

            localStorage.setItem("historial", JSON.stringify(historialConversiones));
            

        }else{

            Toastify({
                text: "Ingrese pais y/o tipo de moneda ",
                duration: 1000
            }).showToast();
        
        }
 
        //limpio las conversiones
        paises.convArg = 0;
        paises.convDolar = 0;
    
    }
    conversion.addEventListener("submit", enviarConversion); 


    
        //Variable global de la consulta al json
        let listaPaises;

            fetch("/paises.json")
            .then((response) => {
                return response.json();
            }).then((data) => {
                listaPaises = data;
                selectCountry(listaPaises);
                
                buscarPais(listaPaises)

            })
        


            // --------------- Historial de Conversiones -----------------------

            //Verifico si tengo conversiones en el localStorage
            const conversionesStorage = localStorage.getItem("historial");

            if(conversionesStorage !== null){
               historialConversiones = JSON.parse(conversionesStorage);
            }

            

    function renderizarTabla(historialConversiones){
        const bodyTabla = document.getElementById("body_conversiones");
        // bodyTabla.innerHTML = "";

        //creo tabla
        const thead = document.getElementById("head_conversiones");
        const th1 = document.createElement("th");
        th1.innerText= "Pais";
        const th2 = document.createElement("th");
        th2.innerText= "Monto";
        const th3 = document.createElement("th");
        th3.innerText= "Monto convertido";
        const th4 = document.createElement("th");
        th4.innerText= "Moneda";
    
        thead.append(th1);
        thead.append(th2);
        thead.append(th3);
        thead.append(th4);

        for(const el of historialConversiones){
            const tr = document.createElement("tr");

            const td1 = document.createElement("td");
            td1.innerText = el.Pais;

            const td2 = document.createElement("td");
            td2.innerText = el.Monto_en_pesos;

            const td3 = document.createElement("td");
            td3.innerText = el.Monto_convertido;

            const td4 = document.createElement("td");
            td4.innerText = el.Moneda;

            //Agrego al tr
            tr.append(td1);
            tr.append(td2);
            tr.append(td3);
            tr.append(td4);

            //Agregar tr al body

            bodyTabla.append(tr);
        }

       }

        //renderizo conversiones por primera vez
        renderizarTabla(historialConversiones);

// localStorage.clear()
   
}
   
dsf();
