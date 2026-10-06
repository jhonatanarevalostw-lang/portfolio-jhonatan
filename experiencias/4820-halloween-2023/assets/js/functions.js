//import { inicio } from "./index.js";
//import { realizar_test } from "./realizar_test.js";

(function() {
    'use strict';

    const loader = document.querySelector('.loader');

    // Configuración inicial de la pantalla de carga
    gsap.set(loader, {
        scaleX: 0,
        xPercent: 130,
        yPercent: 0,
        transformOrigin: 'left center',
        autoAlpha: 1,
    });

    // Animación de entrada de la pantalla de carga
    function loaderIn() {
        return gsap.fromTo(
            loader,
            {
                scaleX: 1.3,
                xPercent: -200,
            },
            {
                duration: 0.7,
                xPercent: 0,
                scaleX: 1.3,
                ease: 'Power4.inOut',
                transformOrigin: 'top',
            }
        );
    }

    // Animación de salida de la pantalla de carga
    function loaderAway() {
        return gsap.to(loader, {
            duration: 0.7,
            scaleX: 1.3,
            xPercent: 130,
            transformOrigin: 'center',
            ease: 'Power4.inOut',
        });
    }

    // Función para realizar tareas antes de la transición de página
    function beforeTransition() {
        document.querySelector('html').classList.add('is-transitioning');
        barba.wrapper.classList.add('is-animating');
    }


    // Inicialización de Barba.js
    function initBarba() {
        barba.init({
            transitions: [
                {
                    async leave() {
                        await loaderIn();
                    },
                    beforeEnter(data) {
                        // update the menu based on user navigation
                        const currentNamespace = data.next.namespace;
                        
                        switch (currentNamespace) {
                            case 'home':                                                           
                                // Acciones específicas para la página de inicio
                                break;
                            case 'start':
                                realizar_test();                                
                                break;
                            case 'test':
                                realizar_test(); 
                                break;
                            case 'result':                                
                                ver_resultado();
                                break;

                        }
                    },
                    enter() {
                        loaderAway();
                    }
                },
            ],
        });
    }

    // Función principal que se ejecuta cuando la ventana se carga
    function onWindowLoad() {

        $(document).ready(function () {

            var didInit = false;

            function initMunchkin() {
                if (didInit === false) {
                    didInit = true;
                    Munchkin.init('493-TWM-137');
                }
            }
            
            var s = document.createElement('script');
            s.type = 'text/javascript';
                s.async = true;
            s.src = '//munchkin.marketo.net/munchkin.js';
            
            s.onreadystatechange = function() {
                if (this.readyState == 'complete' || this.readyState == 'loaded') {
                    initMunchkin();
                }
            };
            
            s.onload = initMunchkin;
            document.getElementsByTagName('head')[0].appendChild(s);            
           
            function addParam(params) {
                var querystring = '';
                //loop through the params to build the querystring
                for (var i in params) {
                    querystring += i + '=' + params[i] + '&';
                }
                //let's lose the final '&'
                querystring = querystring.substring(1, querystring.length - 1);
                // add the querystring to the current URL
                Munchkin.munchkinFunction('visitWebPage', {
                    url: document.location.path,
                    params: querystring
                });
            }

            //reesetear variables locales
            localStorage.clear();

            const queryString = window.location.search;
                    
            if(queryString){
                
                const urlParams = new URLSearchParams(queryString);        
                let dataurl = urlParams.get('u');  
                const utm_source = urlParams.get('utm_source');

                /*
                No siempre se envia la url desde mail, puede que se envie desde un codigo Qr, red social u otra landing
                por eso se valida si esta el parametro (u) en la url
                */
                
                if(dataurl){  // Si el envio es por email
                    dataurl = Base64.decode(dataurl);
                    dataurl = JSON.parse(dataurl);

                    console.log(dataurl);
                    
                    if(dataurl.email != ""){
                           
                        $("input[name='Email']").val();
                        localStorage.setItem("email",  dataurl.email );
                        localStorage.setItem("origen",  "mail" );
                    }                    
                }  
                //masivo  
                else {
                    localStorage.setItem("origen",  "masivo" );            
                }            
            } 
            else localStorage.setItem("origen",  "masivo" ); 

            $("#encuentre").click(function () {

                dataLayer.push({
                    'event': 'EventLanding113',
                    'EventoCategoria': '1. Experiencia',
                    'EventoTipo': 'Interaccion',
                    'EventoEtiqueta': '1.2 Encuentre el mejor disfraz',
                    'EventoLanding': '4820 - Halloween 2023'
                }); 
            }); 
        });
       
        //inicio();
        initBarba();
    }

    function realizar_test(){
        $(document).ready(function () {        
       
            //reesetear variables locales
            //localStorage.clear();

            var origen = localStorage.getItem("origen");

            //HOME
            $("input[name='segmentacion']").click(function () {
                
                /*dataLayer.push({
                    'event': '3781 - Riesgo Publico',
                    'EventoCategoria': '1. Menu',
                    'EventoTipo': 'Click',
                    'EventoEtiqueta': '1.1 Menu - ' +  $(this).text(),
                    'EventoLanding': '4820 - Halloween 2023'
                });*/
                
                if( $(this).val() == "hijos"){

                    $(".variants").removeClass("hide");            
                }
                else {

                    $(".variants").addClass("hide");            
                }
            });

            //inicio.html
            $("#iniciar_test").click(function () {

                
                if( $("input:radio[name='segmentacion']").is(":checked") ){


                    if( !$("input:radio[name='edades']").is(":checked") && $("input:radio[name='segmentacion']:checked").val() == "hijos" ){

                        $(".alert").removeClass("hide"); 
                        $(".alert").html("¡Debe seleccionar una opcion para la pregunta : Es para mis hijos!"); 
                        return false;
                    }
                    else {
                        
                        localStorage.setItem("saludo_inicial",  $("input:radio[name='segmentacion']:checked").val() ); 

                        dataLayer.push({
                            'event': 'EventLanding113',
                            'EventoCategoria': '1. Experiencia',
                            'EventoTipo': 'Interaccion',
                            'EventoEtiqueta': '1.4 Iniciar el Test',
                            'EventoLanding': '4820 - Halloween 2023'
                        });    

                        dataLayer.push({
                            'event': 'EventLanding113',
                            'EventoCategoria': '1. Experiencia',
                            'EventoTipo': 'Interaccion',
                            'EventoEtiqueta': '1.3 Para quien es el disfraz - ' + $("input:radio[name='segmentacion']:checked").val(),
                            'EventoLanding': '4820 - Halloween 2023'
                        });    
                        
                        //$("#loader").show(); 
                        //si viene de mail
                        if (origen != "masivo" && origen != "nuevo_test" ){

                            $("#Email").val(localStorage.getItem("email"));

                            if(  $("input:radio[name='segmentacion']:checked").val() == "hijos" ){
                                
                                if(  $("input:radio[name='edades']:checked").val() == "bebes" ){

                                    $("#sBCLBebes").val(1);
                                }

                                else if(  $("input:radio[name='edades']:checked").val() == "ninos" ){

                                    $("#sBCLNinos").val(1);
                                }

                                else if(  $("input:radio[name='edades']:checked").val() == "adolescentes" ){
                                   
                                    $("#sBCLAdolescentes").val(1);
                                }

                                else if(  $("input:radio[name='edades']:checked").val() == "mayores" ){

                                    $("#sBCLAdultos").val(1);
                                }

                                $("#sBCLTienehijos").val(1);                    
                            }

                            else if(  $("input:radio[name='segmentacion']:checked").val() == "pareja" ){
                              
                                $("#sBCLTienepareja").val(1);                   
                            }

                            else if(  $("input:radio[name='segmentacion']:checked").val() == "mascota" ){                        
                               
                                $("#sBCLTienemascotas").val(1);                    
                            }
                        }
                    }
                }
                else {

                   $(".alert").removeClass("hide");  
                   return false;
                }
            });

            //test.html
            $("#ver_resultado").click(function () {
                
                if( !$("input:radio[name='gustos']").is(":checked") ){
                    $(".alert").removeClass("hide"); 
                    $(".alert").html("¡Debe seleccionar una opcion para la pregunta : ¿Qué es lo que más le gusta de Halloween?!"); 
                    return false;

                }
                else if( !$("input:radio[name='disfraz']").is(":checked") ){
                    
                    $(".alert").removeClass("hide"); 
                    $(".alert").html("¡Debe seleccionar una opcion para la pregunta : Para su disfraz, ¿qué prefiere?!"); 
                    return false;           
                }
                else if( !$("input:radio[name='personajes']").is(":checked") ){
                    
                    $(".alert").removeClass("hide"); 
                    $(".alert").html("¡Debe seleccionar una opcion para la pregunta : Sus personajes favoritos son:!"); 
                    return false;           
                }
                else {
                    localStorage.setItem("gustos",  $("input:radio[name='gustos']:checked").val() );
                    localStorage.setItem("disfraz",  $("input:radio[name='disfraz']:checked").val() );
                    localStorage.setItem("personajes", $("input:radio[name='personajes']:checked").val() );


                    dataLayer.push({
                        'event': 'EventLanding113',
                        'EventoCategoria': '1. Experiencia',
                        'EventoTipo': 'Interaccion',
                        'EventoEtiqueta': '1.5 Ver Resultado',
                        'EventoLanding': '4820 - Halloween 2023'
                    });                   
                }

                if (origen != "masivo" && origen != "nuevo_test" ){

                    if ( $("input:radio[name='gustos']:checked").val() == "vehiculo"){                   
                        $("#sBCLCPMovilidad").val(1);
                    }

                    if ( $("input:radio[name='disfraz']:checked").val() == "healthy"){
                       $("#sBCLCPBienestar").val(1);
                    }

                    $("#loader").show(); 
                    setTimeout(()=>{
                        $(".mktoButton").click();
                    }, "1200")  
                }
            });

            if (origen == "mail"){
                MktoForms2.whenReady(function(form) {
                    
                    (function(){                               
                    })();

                    form.onSuccess(function () {

                        var formElement = form.getFormElem()[0];
                        // .reset() is a native javascript method.                            
                        //btn enviar Formulario    
                        console.log("success!");          
                        
                        jQuery('button.mktoButton').attr('disabled',false);
                        jQuery('button.mktoButton').text('Enviar mis respuestas');                    
                       
                        formElement.reset();    

                        setTimeout(() => {

                            Munchkin.munchkinFunction('visitWebPage', {
                                url: '/comunicaciones/4820-halloween-2023/test.html',
                                params: "resp=success"
                            });

                        }, 800);   


                        dataLayer.push({

                            'event': 'EventLanding113',
                            'EventoCategoria': '1. Experiencia',
                            'EventoTipo': 'Objetivo',
                            'EventoEtiqueta': '1.6 Ver Resultado',
                            'EventoLanding': '4820 - Halloween 2023'
                        });    

                              
                        return false;
                    });

                    // show or hide form fields according to the source
                    (function(){            

                    })();
                });
            }
            
            $("input").click(function () {

                $(".alert").addClass("hide"); 
            }); 

            $("#legales").click(function () {

                dataLayer.push({
                    'event': 'EventLanding113',
                    'EventoCategoria': 'Modal',
                    'EventoTipo': 'Interaccion',
                    'EventoEtiqueta': 'Aqui Descritas',
                    'EventoLanding': '4820 - Halloween 2023'
                });               
            }); 

            $("#correo_legal").click(function () {

                dataLayer.push({

                    'event': 'EventLanding113',
                    'EventoCategoria': 'Modal',
                    'EventoTipo': 'Interaccion',
                    'EventoEtiqueta': 'Correo',
                    'EventoLanding': '4820 - Halloween 2023'
                });               
            }); 
        });
    }


    function ver_resultado(){
        $(document).ready(function () {
    
            var quien_disfraz =  {
                "solo" : "Su disfraz ideal es",
                "hijos" : "El disfraz ideal para sus hijos es",
                "pareja" : "Su disfraz ideal en pareja es",
                "mascota" : "El disfraz ideal para su mascota es"
            }
                
            var inicial_saludo = localStorage.getItem("saludo_inicial");
            inicial_saludo = quien_disfraz[inicial_saludo];  
            $(".copy").find("h3").html(inicial_saludo);

            var gusta =  localStorage.getItem("gustos");
            var disfraz = localStorage.getItem("disfraz");
            var personaje = localStorage.getItem("personajes");

            $(".copy").find("h2").find("span").html(beneficios_producto[gusta][0][disfraz][personaje][0]);
            $(".copy").find("p").html(beneficios_producto[gusta][0][disfraz][personaje][1]);
            $(".box").addClass(beneficios_producto[gusta][0][disfraz][personaje][2]);
                          

            $("#repetir_test").click(function () {

                dataLayer.push({

                    'event': 'EventLanding113',
                    'EventoCategoria': '2. Fin Experiencia',
                    'EventoTipo': 'Interaccion',
                    'EventoEtiqueta': '2.1 Repetir',
                    'EventoLanding': '4820 - Halloween 2023'
                });   

                localStorage.setItem("origen",  "nuevo_test" );
            });

            $("#compartir_test").click(function () {
                
                let host = "https://www.segurosbolivar.com";
                let wts_utm = "utm_source=Whatsapp%26utm_medium=Redirected%26utm_campaign=HALLOWEEN_CONOCIMIENTO_FECHAS_ESPECIALES_2023%26utm_id=4820";
                let mesagge = "¡Hola!%20Te%20envío%20el%20test%20de%20Halloween%20para%20que%20descubras%20tu%20disfraz%20ideal%F0%9F%8E%83%F0%9F%91%BB%0A";
                $("#compartir_test").attr("href", "https://api.whatsapp.com/send?text="+ mesagge + host+"/comunicaciones/4820-halloween-2023/?"+ wts_utm);

                dataLayer.push({

                    'event': 'EventLanding113',
                    'EventoCategoria': '2. Fin Experiencia',
                    'EventoTipo': 'Interaccion',
                    'EventoEtiqueta': '2.2 Compartir Test',
                    'EventoLanding': '4820 - Halloween 2023'
                });  

            });            
        });
    }
 
    window.addEventListener('load', onWindowLoad);
})();