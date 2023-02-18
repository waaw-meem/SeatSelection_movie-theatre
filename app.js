// Target DOM Element

const container = document.querySelector('.main_container');
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const selectMovie = document.getElementById('movie-selector');
const selectPrice = document.getElementById('movie-price-selector');
const count = document.getElementById('count');
const totalPrice = document.getElementById('total');

let totalAmount = +selectPrice.value

populateUI();

function updatedSelectCount(){
    const selectedSeats = document.querySelectorAll('.row .seat.select')
    const selectedSeatsCount = selectedSeats.length;
    // Spread Operator copy array element
    const seatIndex = [...selectedSeats].map((seat) =>{
        return [...seats].indexOf(seat)
    });
    // innerText get text from HTML element
    count.innerText = selectedSeatsCount;
    totalPrice.innerText = selectedSeatsCount * totalAmount;

    localStorage.setItem('selectedSeats', JSON.stringify(seatIndex))
}

function setMovieData(movieIndex,moviePrice){
    localStorage.setItem('sovieIndex',movieIndex)
    localStorage.setItem('moviePrice',moviePrice)
}

container.addEventListener('click',e => {
    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
        e.target.classList.toggle('select')

        updatedSelectCount();
    }
})

function populateUI(){
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    if(selectedSeats !== null && selectedSeats.length > -1){
        seats.forEach((seat,index) =>{
            if(selectedSeats.indexOf(index) > -1){
                seat.classList.add('selected')
            }
        })
    };
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    if(selectedMovieIndex !== null){
        selectPrice.selectedIndex = selectedMovieIndex
    }
}

// Onchange Event

selectPrice.addEventListener('change', e => {
    totalAmount = +e.target.value;
    setMovieData(e.target.selectedIndex,e.target.value)
    updatedSelectCount();
})

updatedSelectCount()