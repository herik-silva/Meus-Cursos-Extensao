var courseList = [];
var selectedCourses = [];
var filterOn = false;

const saveData = () => {
    const storageData = {
        filter: filterOn,
        selectedCourses: selectedCourses
    }
    localStorage.setItem("selectedCourses", JSON.stringify(storageData));
}

const loadData = () => {
    const data = localStorage.getItem("selectedCourses");
    if(!data){
        return;
    }
    
    const jsonData = JSON.parse(data);
    [filterOn, selectedCourses] = [jsonData.filter, jsonData.selectedCourses];
}

const courseIsSelected = (course) => {
    if(selectedCourses){
        return selectedCourses.find(item => item.name == course.name);
    }
}

const courseFactory = (id, name, url) => {
    return {
        id,
        name,
        url
    };
}

const removeCourse = (courseToRemove) => {
    const indexToRemove = selectedCourses.findIndex(course => course.name == courseToRemove.name);
    selectedCourses.splice(indexToRemove, 1);
}

const addCourse = (course) => {
    if(courseIsSelected(course) === undefined){
        selectedCourses.push(course);
        changeButton(course.id, "-", "remover");
    }
    else{
        removeCourse(course);
        changeButton(course.id, "+", "adicionar");
    }

    saveData();
}

const getCourseHtmlList = (className) => {
    const HTMLCourseList = Array.from(document.querySelector(className).children);
    HTMLCourseList.forEach((element, index) => element.id = `curso${index}`);

    return HTMLCourseList;
}

const initExtension = () => {
    loadData();
    createFilterButton();

    const unlist = getCourseHtmlList(".unlist");

    unlist.forEach(element => {
        const course = courseFactory(element.id, element.innerText.split(' - ')[0], element.children[0].children[0].href);
        if(courseIsSelected(course) != undefined){
            element.appendChild(createButton("-", ()=>{
                addCourse(course);
            }, "remover"));
        }
        else{
            element.appendChild(createButton("+", ()=>{
                addCourse(course);
            }, "adicionar"));
        }
        
        courseList.push(course);
    });

    if(filterOn){
        const unlist = Array.from(document.querySelector(".unlist").children);
        changeFilter(unlist);
    }
}

const createButton = (text, action, className) => {
    const button = document.createElement('button');
        button.innerText = text;

        button.addEventListener("click", () => {
            action();
        });

        className ? button.className = className : button.className = "geral";

        return button;
}

const changeButton = (id, text, className) => {
    const button = document.querySelector(`#${id} button`);

    if(button){
        button.className = className;
        button.innerText = text;

        return;
    }

}

const createFilterButton = () => {
    const message = filterOn ? "Exibindo: Disciplinas Atuais" : "Exibindo: Todas as Disciplinas";
    const className = filterOn ? "adicionar" : "remover";

    const button = createButton(message, ()=>{
        filterCourses();

        if(filterOn){
            button.innerText = "Exibindo: Disciplinas Atuais";
            button.className = "adicionar";
        }
        else{
            button.innerText = "Exibindo: Todas as Disciplinas";
            button.className = "remover";
        }
    }, className);

    document.querySelector("#instance-38740-header").appendChild(button);
}

const changeFilter = (unlist) => {
    unlist.forEach(item => {
        for(let course of selectedCourses){
            if(course.id == item.id){
                return;
            }
        }
        filterOn ? item.classList.add("hidden") : item.classList.remove("hidden");
    });
}

const filterCourses = () => {
    if(selectedCourses.length === 0){
        alert("Precisa escolher pelo menos uma disciplina!");
        return;
    }

    const unlist = Array.from(document.querySelector(".unlist").children);
    filterOn = !filterOn;
    changeFilter(unlist);
    saveData();
}

initExtension();