function iniciarMenuMeusCursos(){
    const div = document.createElement('div');
    div.className = 'containerCursosAtuais';
    
    const btn_cursos = document.createElement('button')
    btn_cursos.innerText = "Meus Cursos";
    btn_cursos.innerHTML = "<i class='fa fa-briefcase fa-lg'></i>"
    btn_cursos.className = "btnCursos";
    
    const div_cursosAtuais = document.createElement('div');
    div_cursosAtuais.className = "cursosAtuais";
    
    div.appendChild(div_cursosAtuais);
    div.appendChild(btn_cursos);
    
    document.querySelector('body').appendChild(div);
    
    // Carregando cursos selecionados
    for(let i=0; i<materias_atuais.length; i++){
        const div_curso = document.createElement('a');
        div_curso.className = 'curso';
        div_curso.href =  materias_atuais[i].link;
        div_curso.innerText = materias_atuais[i].nomeMateria;
    
        div_cursosAtuais.appendChild(div_curso);
    }
    
    // Mostra apenas o icone no botão de Meus Cursos
    function apenasIcone(){
        setTimeout(()=>{
            btn_cursos.innerHTML = "<i class='fa fa-briefcase fa-lg'></i>";
        },100);
    }

    // Atualiza a lista de Meus Cursos no canto inferior direito
    function atualizarCursos(){
        
    }
    
    // Mostra texto e icone no botão de Meus Cursos
    function textoIcone(){
        setTimeout(()=>{
            btn_cursos.innerHTML = "<i class='fa fa-briefcase fa-lg'></i>Meus Cursos";
        },100);
    }
    
    // Apresenta todos os cursos selecionados
    function mostrarCursos(){
        btn_cursos.innerHTML = "<i class='fa fa-briefcase fa-lg'></i>Meus Cursos"
        div_cursosAtuais.style.display = 'flex';
        div.style.pointerEvents = 'all';
    
        setTimeout(()=>{
            div_cursosAtuais.style.width = "100%";
            div_cursosAtuais.style.height = "70%";
            btn_cursos.style.width = "100%";
            btn_cursos.style.borderRadius = "0px";
            btn_cursos.style.borderBottomRightRadius = "20px";
            btn_cursos.style.borderBottomLeftRadius = "20px";
        },100);
    
        btn_cursos.removeEventListener('mouseout', apenasIcone);
        btn_cursos.removeEventListener('mouseenter', textoIcone);
        btn_cursos.removeEventListener('click', mostrarCursos);
        btn_cursos.addEventListener('click', ocultarCursos);
    }
    
    // Oculta todos os cursos selecionados
    function ocultarCursos(){
        div_cursosAtuais.style.height = "0%";
        btn_cursos.style.width = "50px";
        btn_cursos.style.borderRadius = "20px";
        btn_cursos.style.pointerEvents = "all";
        div.style.pointerEvents = 'none';
    
        setTimeout(()=>{
            div_cursosAtuais.style.display = 'none';
        },100);
    
        btn_cursos.removeEventListener('click', ocultarCursos);
        btn_cursos.addEventListener('click', mostrarCursos);
        btn_cursos.addEventListener('mouseenter', textoIcone);
        btn_cursos.addEventListener('mouseout', apenasIcone);
    }
    
    btn_cursos.addEventListener('click', mostrarCursos);
    
    btn_cursos.addEventListener('mouseenter', textoIcone);
    
    btn_cursos.addEventListener('mouseout', apenasIcone);
}

iniciarMenuMeusCursos();
