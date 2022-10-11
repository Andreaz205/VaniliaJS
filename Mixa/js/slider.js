let images = document.getElementsByClassName('images-ware')
let sliderFirstArrowLeft = document.getElementById('slider-first-arrow-left')
let sliderFirstArrowRight = document.getElementById('slider-first-arrow-right')

function moveRight() {
    if (images[0].style.left.split('px')[0] == '0') return
    images[0].style.left = +images[0].style.left.split('px')[0] + 150 + 'px' ;

}

function moveLeft() {
    if (images[0].style.left.split('px')[0] == '-600') return
    images[0].style.left = +images[0].style.left.split('px')[0] - 150 + 'px' ;

}

sliderFirstArrowRight.addEventListener('click', moveLeft)
sliderFirstArrowLeft.addEventListener('click', moveRight)

/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
//////////////SECOND SLIDER//////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////

let parent = document.getElementById('parent')
parent.addEventListener('mouseenter', throttle(animate, 1000))

function throttle(fn, delay) {
    let timer = null
    return function callback(...args){
        if (timer) return
        timer = setTimeout(() => {
            fn(...args)

            clearTimeout((timer))
            timer = null
        }, delay)
    }
}

let secondImage = document.getElementById('second-img')
let firstImage = document.getElementById('first-img')

let index = 3
function animate() {
    if(index == 5) {
        index = 0
    }
    slide()
}

function slide() {
    parent.classList.add('delete-translate')
    parent.classList.add('delete-animation')
    let newChild = document.createElement('img')
    newChild.src = secondSliderStorage[index]
    index += 1
    newChild.id = 'first-img'
    setTimeout(() => {
        secondImage = document.getElementById('second-img')
        firstImage = document.getElementById('first-img')
        parent.removeChild(secondImage)
        firstImage.id = 'second-img'
        parent.classList.remove('delete-animation')
        parent.prepend(newChild)
        secondImage = firstImage
        parent.classList.remove('delete-translate')
    }, 1000)
}

let secondSliderStorage = [
    'https://i.ibb.co/sVnS9fH/stiven-king-6.jpg',
    'https://i.ibb.co/1fXKvyj/i-7.webp',
    'https://i.ibb.co/KwKsfhn/2073791.jpg',
    'https://i.ibb.co/T4PL1V0/lermontov.jpg',
    'https://i.ibb.co/f0y72nq/cover.webp',

]
