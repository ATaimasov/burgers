/*
    Что реализовано:
    • каждая кнопка переводит на нужный блок
    • ссылки переводят на нужный блок
    • проверка полей формы при нажатии на кнопку и вывод сообщений "спасибо за заказ"
    • автоматическое переключение валют
 */

/* как нам получить элемент из html?
    используем специальную комбинацию вызова функций для получение всех элементов по определенному классу
    в данном случае нас интересует класс main-title
    элементов много а нам надо использовать первый. для этого в квадратных скобках используем 0.
*/

//теперь мы можем что-то сделать с тегом  <h1 class="main-title">Бургер чеддер</h1> -->
 // document.getElementsByClassName("main-title")[0].style.color = "red";

                                                        // ↑ например, поменять цвет. для этого пишем .style.color


/*
    событие это	какое-то действие на странице которое мы можем обработать
    чтобы обработать событие на него вешается специальная функция обработчик. код этой функции выполняется при возникновении события
 */


/*
сделаем чтобы при нажатии на кнопку смотреть меню  нас перекидывало на товары
 */

//       может быть только один  ↓                       ↓ обработка события по клику
document.getElementById(id="main-action-button").onclick= function (){
    //  используем также идентификатор для js, чтобы сделать действие только для одного объекта.
    //                              ↓ меню с товарами   ↓ скроллинг                 ↓ плавно
    document.getElementById("products").scrollIntoView({behavior: "smooth"});
}

// сделаем чтобы ссылки сверху тоже переводили на нужные разделы. для этого сделаем якоря посредством data-link
// создадим переменную в которую мы разместим все ссылки на которые можно нажать
// querySelectorAll позволяет найти все элементы по определенному селектору
// ".menu-item > a" - благодаря этому мы найдем все элементы а в menu-item
let links = document.querySelectorAll(".menu-item > a");
for (let i=0; i < links.length; i++){
    // благодаря for мы пройдемся по каждой ссылке которая у нас есть и выполним какое то действие для каждой этой ссылки
    // для каждый такой ссылки нам нужно повесить обработчик события чтобы при клике на нее пользователя переводили на другой блок
    // links[i] - специальная конструкция которая позволит к каждой ссылке обратиться
    links[i].onclick= function () {
        // при каждой итерации будет выполнение функции
        document.getElementById(links[i].getAttribute("data-link")).scrollIntoView({behavior: "smooth"});
    }
}

// сделаем чтобы при нажатии на кнопку заказать у каждого бургера нас переводило на форму заказа

let buttons = document.getElementsByClassName("product-button");
for (let i=0; i < buttons.length; i++){
    buttons[i].onclick= function () {
        document.getElementById("order").scrollIntoView({behavior: "smooth"});
    }
}


// сделаем валидацию
// для удобства поместим все в переменные чтобы не искать заново

let burger = document.getElementById(id="burger");
let name = document.getElementById(id="name");
let phone = document.getElementById(id="phone");

document.getElementById(id="order-action").onclick = function () {
    let hasError = false;
// forEach проверяет каждый импут и проверяет там данные
    // if (!item.value) проверяет есть ли значение
    [burger, name, phone].forEach(item => {
        if (!item.value) {
            item.parentElement.style.background = "red"; // изменим фон для родительского элемента (рамки)
            hasError = true;
        } else {
            item.parentElement.style.background = ""; // цвет рамки не меняется
        }
        });

    // следующий код выполнится только если не будет ошибки
    if (!hasError) {
        [burger, name, phone].forEach(item => {
            item.value = ""; // делает поле пустым если нет ошибки
        });
        alert("Спасибо за заказ! Мы скоро свяжемся с вами!");
    }
}

// сделаем переключение валют.
// нужно чтобы при нажатии на смену валют , блок с ценой нашелся и заменился
// для всех блоков с ценой вставим data-base-price="" с ценой



let prices = document.getElementsByClassName("products-item-price");

//добавим кнопку обработчик события

document.getElementById(id="change-currency").onclick = function (e) {
    let currentCurrency = e.target.innerText; // благодаря этой строчке мы получаем значение текущей валюты в строке и дальше мы с ним работаем

    let newCurrency = "$"; // переменная в которой мы содержим строку в которой будет находиться новая валюта на которую мы изменяем. по-умолчанию дооллары, но потом будем менять
    let coefficient = 1; // коэффициент для пересчета курса валют

    //проверяем какая текущая валюта. если текущая валюта доллар то мы будем ее менять
    if(currentCurrency === "$") {
    newCurrency = "₽";
    coefficient = 80; // используем курс валют
    } else if (currentCurrency === "₽") {
        newCurrency = "BYN";
        coefficient = 3; // используем курс валют
    }
    else if (currentCurrency === 'BYN') {
        newCurrency = '€';
        coefficient = 0.9;
    } else if (currentCurrency === '€') {
        newCurrency = '¥';
        coefficient = 6.9;
    }
    // мы только подготовили данные, нам нужно заменить их в блоке на который мы нажимаем и пересчитать значение для каждого блока в товаре
    e.target.innerText = newCurrency;

    for (let i= 0; i < prices.length; i++) {
        prices[i].innerText = +(prices[i].getAttribute("data-base-price") * coefficient).toFixed(1) + " " + newCurrency; // мы проходимся по каждому элементу и для внутреннего текста мы пересчитываем значение: умножаем коэффициент на то, что у нас есть по базовой цене и форматируем это и прибавляем сюда пустую строку с пробелом и строку с текущей валютой которая будет новой
    }

}
