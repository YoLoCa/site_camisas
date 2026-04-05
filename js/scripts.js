
// Objeto para pegar os preços e as fotos das camisetas

var camisetas = {
    'branca': {
        
        'gola_v': {
            'sem_estampa': {
                'preco_unit': 5.12,
                'foto': 'v-white.jpg' 
            },
            'com_estampa': {
                'preco_unit': 8.95,
                'foto': 'v-white-personalized.jpg' 
            }
        },
        
        'gola_normal': {
            'sem_estampa': {
                'preco_unit': 4.99,
                'foto': 'normal-white.jpg' 
            },
            'com_estampa': {
                'preco_unit': 8.77,
                'foto': 'normal-white-personalized.jpg' 
            }
        }
    },
    
    'colorida': {
        'gola_v': {
            'sem_estampa': {
                'preco_unit': 6.04,
                'foto': 'v-color.jpg' 
            },
            'com_estampa': {
                'preco_unit': 9.47,
                'foto': 'v-color-personalized.png' 
            }
        },
        
        'gola_normal': {
            'sem_estampa': {
                'preco_unit': 5.35,
                'foto': 'normal-color.jpg' 
            },
            'com_estampa': {
                'preco_unit': 9.28,
                'foto': 'normal-color-personalized.jpg' 
            }
        }
    }
}


// parâmetros da pesquisa

var parametros_pesquisa = {
    "quantidade": 10,
    "cor": "colorida",
    "gola": "gola_v",
    "qualidade": "q150",
    "estampa": "com_estampa",
    "embalagem": "bulk"
}


// Reglas adicionales para el presupuesto:

// 1. Compruebe en localStorage los parámetros del último presupuesto y si es así, cargue la página con ellos.

// 2. la camisa de alta calidad (190g/m2) debe incrementar el precio unitario en un 12%.

// 3 El embalaje unitario cuesta 0,15 por unidad.

// 4. Una vez calculado el precio, debe aplicarse un descuento por cantidad, como sigue: 
 // rango 1: más de 1.000 - 15% de descuento
 // rango 2: más de 500 - 10% de descuento
 // rango 3: más de 100 - 5% de descuento


// Resolução do desafio:  //ME HE QUEDADO POR EL VIDEO 62

$(function(){

    function actualizar_presupuesto(parametros){

        $('.refresh-loader').show();

        var cantidad = parametros.quantidade;
        var precio_unidad = camisetas[parametros.cor][parametros.gola][parametros.estampa].preco_unit;
        var foto = 'img/' + camisetas[parametros.cor][parametros.gola][parametros.estampa].foto;

        var valor_total = cantidad * precio_unidad;

        

        if (parametros.qualidade == 'q190'){
            valor_total *= 1.12;
        }

        if (parametros.embalagem == "unitaria"){
            valor_total += (cantidad * 0.15);
        }

        if (cantidad >= 1000){
            valor_total *= 0.85;

        }else if (cantidad >= 500){
            valor_total *= 0.90;

        }else if (cantidad >= 100){
            valor_total *= 0.95;
        }

        window.setTimeout(function(){

            var id_gola = "#" + parametros.gola;
            $("#result_gola").html($ (id_gola).html());

            var id_estampa = "option[value='"+ parametros.estampa + "']";
            $("#result_estampa").html($(id_estampa).html());

            var id_embalagem = "option[value='"+ parametros.embalagem + "']";
            $("#result_embalagem").html($(id_embalagem).html());

            var id_cor = "#" + parametros.cor;
            $("#result_cor").html($(id_cor).html());

            var id_qualidade = "#" + parametros.qualidade;
            $("#result_qualidade").html($(id_qualidade).html());

            $("#result_quantidade").html(cantidad);
            
            $("#valor-total").html(valor_total.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2}));

            $("#foto-produto").attr("src", foto);

            $('.refresh-loader').hide();

        },500)
    }

    function actualizar_campos(parametros){
        //cor
        $("#cor").children().removeClass("selected");
        var id_cor = "#" + parametros.cor;
        $(id_cor).addClass("selected");

        //gola
        $("#gola").children().removeClass("selected");
        var id_gola = "#" + parametros.gola;
        $(id_gola).addClass("selected");

        //calidad
        $("#qualidade").children().removeClass("selected");
        var id_qualidade = "#" + parametros.qualidade;
        $(id_qualidade).addClass("selected");

        //estampa
        $("#estampa").val(parametros.estampa);

        //embalagem
        $("#embalagem").val(parametros.embalagem);

        //quantidade
        $("#quantidade").val(parametros.quantidade);

    }

     function actualizar_localStorage(parametros){
        window.localStorage.setItem("quantidade", parametros.quantidade);
        window.localStorage.setItem("cor", parametros.cor);
        window.localStorage.setItem("gola", parametros.gola);
        window.localStorage.setItem("qualidade", parametros.qualidade);
        window.localStorage.setItem("estampa", parametros.estampa);
        window.localStorage.setItem("embalagem", parametros.embalagem);
     }

    $(".option-filter div").click(function(){
        $(this).parent().children("div").removeClass("selected");
        $(this).addClass("selected");

        var categoria = $(this).parent().attr("id");
        parametros_pesquisa[categoria] = $(this).attr("id");
        actualizar_localStorage(parametros_pesquisa);
        actualizar_presupuesto(parametros_pesquisa);
    });

    $("select").change(function(){
        var parametro_select = $(this).attr("id");
        parametros_pesquisa[parametro_select] = $(this).val();
        actualizar_localStorage(parametros_pesquisa);
        actualizar_presupuesto(parametros_pesquisa);
    });

    $("#quantidade").change(function(){
        var parametro_input = $(this).attr("id");
        parametros_pesquisa[parametro_input] = $(this).val();
        actualizar_localStorage(parametros_pesquisa);
        actualizar_presupuesto(parametros_pesquisa);
    });

   

    // Al recargar la página

    if(window.localStorage["quantidade"]){
        parametros_pesquisa.quantidade = parseInt(window.localStorage["quantidade"]);
    }
    if(window.localStorage["cor"]){
        parametros_pesquisa.cor = window.localStorage["cor"];
    }
    if(window.localStorage["gola"]){
        parametros_pesquisa.gola = window.localStorage["gola"];
    }
    if(window.localStorage["qualidade"]){
        parametros_pesquisa.qualidade = window.localStorage["qualidade"];
    }
    if(window.localStorage["estampa"]){
        parametros_pesquisa.estampa = window.localStorage["estampa"];
    }
    if(window.localStorage["embalagem"]){
        parametros_pesquisa.embalagem = window.localStorage["embalagem"];
    }


    //Verificar localStorage y actualizar la variable parametros_pesquisa
    actualizar_campos(parametros_pesquisa);
    actualizar_presupuesto(parametros_pesquisa);
});



// Pasos de resolución

    // 1. crear una función para calcular el precio en base a los parámetros de la variable "parametros_pesquisa" y soltar el valor 
    // en la consola para comprobar que es correcto.

    // 2. Crear eventos de clic y cambio para los filtros.
    
        // a. Crear el evento click para los filtros de tipo botón (.option-filter). Cada vez que haya un click, 
        // quita la clase "selected" de los botones del grupo y luego aplícala sólo al que fue clickado para que
        // se ponga azul.

        // b. Crear el evento de cambio para los filtros <select> y la cantidad <input>.

        // c. Cada vez que se produzca uno de los eventos anteriores, actualizar la variable "parametros_pesquisa" y ejecutar la función para 
        // calcular el precio.

    
    // 3. Cambiar la función de cálculo del precio. En lugar de soltar los valores en la consola, actualiza la información
        // en los elementos "result_", actualiza el precio en el elemento "value-total" y cambia el atributo "src" del elemento 
        // "photo-product" para cambiar la imagen mostrada (todas las imágenes están en la carpeta img).

    // 4. Añade la funcionalidad de ocultar y mostrar del spinner (elemento "refresh-loader") a la función de cálculo del precio. 
        // Como no estamos consultando datos externos, el cálculo acaba siendo demasiado rápido, así que utiliza un setTimeout 
        // para que aparezca durante al menos 2 segundos.

    // 5. crear la funcionalidad localStorage y cuando se cargue la página, consultar el localStorage, 
        // actualizar la variable "parametros_pesquisa" y ejecutar la función de cálculo del precio.