function iniciarExtensao(){
    var mostrandoAtuais = JSON.parse(localStorage.getItem('mostrandoAtuais')) || false;

    const lista_materias = document.querySelectorAll('.content .unlist li');

    const materias_atuais = [];

    const btn_MostrarAtuais = document.createElement('button');
    btn_MostrarAtuais.innerText = "Cursos Atuais";
    btn_MostrarAtuais.setAttribute('title', 'Mostra apenas seus cursos atuais. Clique para ativar!');
    btn_MostrarAtuais.className = "geral";
    btn_MostrarAtuais.addEventListener('click', carregarMateriasAtuais);

    document.querySelector('.block_course_list.block.list_block.mb-3 .header').appendChild(btn_MostrarAtuais);
    
    function addMateria(id, materia, button){
        if(materias_atuais.length>0){
            for(let materia of materias_atuais){
                if(materia.id == id){
                    const index = materias_atuais.findIndex(materia => materia.id == id);

                    materias_atuais[index].button.className = "Adicionar";
                    materias_atuais[index].button.innerText = "Adicionar";
                    materias_atuais[index].button.setAttribute('title','Adicionar na lista de matérias atuais');

                    for(let i=index; i<materias_atuais.length; i++){
                        materias_atuais[i] = materias_atuais[i+1];
                    }

                    materias_atuais.pop();
                    if(materias_atuais.length == 0){
                        mostrarTodos();
                    }
                    return
                }
            }
        }

        const materia_atual = {
            id: id,
            elemento: materia,
            button: button
        }

        materia_atual.button.className = "Remover";
        materia_atual.button.innerText = "Remover";
        materia_atual.button.setAttribute('title','Remover da lista de matérias atuais');

        materias_atuais.push(materia_atual);
    }

    function carregarDados(){
        const ids = JSON.parse(localStorage.getItem('materias_atuais')) || [];

        if(ids.length>0){
            ids.forEach((id)=>{
                addMateria(id, lista_materias[id], lista_materias[id].children[1]);
            });
        }
    }

    function carregarMateriasAtuais(){
        if(materias_atuais.length>0){
            if(mostrandoAtuais == false){
                btn_MostrarAtuais.setAttribute('title', 'Mostra apenas seus cursos atuais. Clique para desativar!');
                btn_MostrarAtuais.className = "mostrandoAtuais";
                for(let materia of lista_materias){
                    var atual = false;
                    materias_atuais.forEach((materia_atual)=>{
                        if(materia == materia_atual.elemento){
                            atual = true;
                        }
                    });
        
                    if(!atual){
                        materia.style.display = 'none';
                    }
                }
            }
            else{
                mostrarTodos();
            }
            localStorage.setItem('mostrandoAtuais', JSON.stringify(mostrandoAtuais));
            mostrandoAtuais = !mostrandoAtuais;
        }
        else{
            alert("Por favor, adicione matérias!");
        }
        
    }

    function mostrarTodos(){
        btn_MostrarAtuais.setAttribute('title', 'Mostra apenas seus cursos atuais. Clique para ativar!');

        btn_MostrarAtuais.className = "geral";
        lista_materias.forEach(materia => materia.style.display = 'block');
    }

    function salvarDados(){
        var id_materias_atuais = [];
        materias_atuais.forEach((materia)=>{
            id_materias_atuais.push(materia.id);
        })

        localStorage.setItem('materias_atuais', JSON.stringify(id_materias_atuais));
    }

    function trocarBotoes(){
       materias_atuais.forEach((materiaAtual)=>{
           for(const materia of lista_materias){
               if(materia == materiaAtual.elemento){
                    materiaAtual.button.className = "Remover";
                    materiaAtual.button.innerText = "Remover";
               }
           }
       }) 
    }

    for(let i=0; i<lista_materias.length; i++){
        const btn_addMateria = document.createElement('button');
        btn_addMateria.className = "Adicionar";
        btn_addMateria.setAttribute('title','Adicionar na lista de matérias atuais');
        btn_addMateria.innerText = "Adicionar";

        btn_addMateria.addEventListener('click', ()=>{
            addMateria(i, lista_materias[i], btn_addMateria);
            salvarDados();
        });
        
        lista_materias[i].appendChild(btn_addMateria);
        lista_materias[i].style.borderBottom = '2px solid #dbdbdb';
        lista_materias[i].style.paddingBottom = '5px';
        
    }

    carregarDados();

    if(materias_atuais.length>0){
        carregarMateriasAtuais();
        trocarBotoes();
    }

}

iniciarExtensao();