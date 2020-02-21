
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
    "embalagem": "unitaria"
}

$(function(){

    function atualizar_orcamento(parametros) {
        $('.refresh-loader').show();

        var quantidade = parametros.quantidade;
        var preco_unit = camisetas[parametros.cor][parametros.gola][parametros.estampa].preco_unit;
        var foto = "img/" + camisetas[parametros.cor][parametros.gola][parametros.estampa].foto;
        var valor_total = quantidade * preco_unit;

        if (parametros.qualidade == "q190") {
            valor_total *= 1.12;
        }

        if (parametros.embalagem == "unitaria") {
            valor_total += (quantidade * 0.15);
        }

        if (quantidade >= 1000) {
            valor_total *= 0.85;
        }else if (quantidade >= 500) {
            valor_total *= 0.90;
        }else if (quantidade >= 100) {
            valor_total *= 0.95;
        }

        console.log(valor_total);
        console.log(parametros_pesquisa);
        $('.refresh-loader').hide();
    }


    $(".option-filter div").click(function () {
        $(this).parent().children("div").removeClass("selected");
        $(this).addClass("selected");

        var categoria = $(this).parent().attr('id');
        parametros_pesquisa[categoria] = $(this).attr('id');
        atualizar_orcamento(parametros_pesquisa);
    });

    $("select").change(function(){
        var parametro_select = $(this).attr('id');
        parametros_pesquisa[parametro_select] = $(this).val();
        atualizar_orcamento(parametros_pesquisa);
    });

    $('#quantidade').change(function(){
        var parametro_input = $(this).attr('id');
        parametros_pesquisa[parametro_input] = $(this).val();
        atualizar_orcamento(parametros_pesquisa);
    });

});