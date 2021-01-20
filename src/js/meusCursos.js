const materias_atuais = [];

function iniciarExtensao(){
    const links = ['https://ava.bambui.ifmg.edu.br/my/index.php', 'https://ava.bambui.ifmg.edu.br/my/'];
    if(document.URL == links[0] || document.URL == links[1]){
        const lista_materias = document.querySelectorAll('.content .unlist li');
        var mostrandoAtuais = JSON.parse(localStorage.getItem('mostrandoAtuais')) || false;
        
        const btn_MostrarAtuais = document.createElement('button');
        btn_MostrarAtuais.innerText = "Cursos Atuais";
        btn_MostrarAtuais.setAttribute('title', 'Mostra apenas seus cursos atuais. Clique para ativar!');
        btn_MostrarAtuais.className = "geral";
        btn_MostrarAtuais.addEventListener('click', carregarMateriasAtuais);

        document.querySelector('.block_course_list.block.list_block.mb-3 .header').appendChild(btn_MostrarAtuais);

        function verificarMateria(id){
            for(let materia of materias_atuais){

                // Remove a matéria
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

                    return true;
                }
            }

            return false;
        }
        
        function setMateria(id, materia, button){
            if(materias_atuais.length>0){
                // Retorna true se a matéria foi removida
                const materiaRemovida = verificarMateria(id);

                if(materiaRemovida) 
                    return
            }

            const materia_atual = {
                id: id,
                elemento: materia,
                nomeMateria: materia.children[0].children[0].innerText.split(' - ')[0],
                link: materia.children[0].children[0].href,
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
                    setMateria(id.id, lista_materias[id.id], lista_materias[id.id].children[1]);
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
            var materias = [];
            materias_atuais.forEach((materia)=>{
                const dados = {
                    id: materia.id,
                    nomeMateria: materia.nomeMateria,
                    link: materia.link
                }

                materias.push(dados);
            })

            localStorage.setItem('materias_atuais', JSON.stringify(materias));
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
                setMateria(i, lista_materias[i], btn_addMateria);
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
    else{
        function carregarDados(){
            const materias = JSON.parse(localStorage.getItem('materias_atuais')) || [];

            for(const materia of materias){
                console.log(materia);
                materias_atuais.push(materia);
            }
        }

        carregarDados();
    }
}

iniciarExtensao();