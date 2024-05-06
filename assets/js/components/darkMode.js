let body = document.querySelector('body');
let header = document.querySelector('header');
let main = document.querySelector('main');


export function darkMode () {
    body.classList.add('darkMode');
    header.classList.add('darkMode');
    main.classList.add('darkMode');
    localStorage.setItem('darkModeEnabled', 'true');
}

export function clear () {
    body.classList.remove('darkMode');
    header.classList.remove('darkMode');
    main.classList.remove('darkMode');
    localStorage.setItem('darkModeEnabled', 'false');
}

