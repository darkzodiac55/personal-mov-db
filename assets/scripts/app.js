let addBtn = document.querySelector('header button')
let mod1 = document.querySelector('#add-modal')
let modBtns = document.querySelector('.modal__actions')
let bg = document.querySelector('#backdrop')
let content = document.querySelector('.modal__content')
let movList = document.getElementById('movList')
let movAdderCounter = 1
let sortBtnH = document.getElementById('sortBtnH')
let sortBtnL = document.getElementById('sortBtnL')
let welcome = document.getElementById('entry-text')
let added = document.querySelector('.added')
let templates = document.querySelector('.filler')
let popup = document.querySelector('#readme')

let movListArr = []

/* if (movList.style.visibility == '') {
    movList.style.visibility = 'hidden'
} */

function toggleModal(modal) {
    return function (e) {
        console.log(e);

        modal.classList.toggle('visible')
        bg.classList.toggle('visible1')
    }
}

const toggleModal1 = toggleModal(mod1)

addBtn.addEventListener('click', toggleModal1)
/* addBtn.addEventListener() */

bg.addEventListener('click', toggleModal1)

function btnActions(e) {
    tgt = e.target

    tgtModParent = tgt.closest('.modal')

    if (tgt.tagName !== 'BUTTON') {
        return
    }

    if (tgt.classList.contains('btn--passive')) {
        tgtModParent.classList.toggle('visible')
        bg.classList.toggle('visible1')
    } else if (tgt.classList.contains('btn--success')) {
        added.classList.toggle('visible2')
        addConfirm()
        let vals = content.children
        /* console.log(vals.title.value);
        console.dir(vals) */
        let addMov = new usrMov(movAdderCounter, vals.title.value, vals.imageUrl.value, vals.rating.value, vals.year.value)
        movListArr.push(addMov)
        console.log(movListArr);
        createMov(addMov)
        hideTitle()
        vals.title.value = ''
        vals.imageUrl.value = ''
        vals.rating.value = ''
        movAdderCounter++
    }

}
modBtns.addEventListener('click', btnActions)

function usrMov(order, title, url, rating, year) {
    this.order = order
    this.title = title
    this.url = url
    this.rating = rating
    this.year = year
}

function addConfirm() {

    /* setTimeout(()=>added.classList.toggle('visible2'), 1.0*1000)  *///////this ignored 
    setTimeout(function () {
        added.classList.toggle('visible2')
    }, 1000)
}

function hideTitle() {
    if (welcome) {
        welcome.remove()
    }

}


function createMov(mov) {
    if (movList.style.visibility == 'hidden') { ////////add dataset attribute to html that is the title of the film, so I can access that easy to remove from arr
        movList.style.visibility = ''
    }
    let newLi = document.createElement('li')
    newLi.className = 'movItem'
    if (!mov.url) {
        mov.url = 'https://i.pinimg.com/originals/57/9c/17/579c17d2ce5a73eb63252be03c73cd45.jpg'
    }
    newLi.innerHTML = `<span class="movCont">
    <img src="${mov.url}" alt="urMov" class="movImg">
    </span>
    <div class="movCont2">
    <span class="movTitle">${mov.title} (${mov.year})</span>
    <span class="movScore">${mov.rating}</span>
    </div>
    <span class="closer">x</span>`

    movList.append(newLi)
}

let cec = document.querySelector('.magot')

cec.addEventListener('click', function (e) {
    /* if (movList.style.visibility == 'hidden') {
        movList.style.visibility = ''
    }
    let newLi = document.createElement('li')
    newLi.className = 'movItem'
    newLi.innerHTML = `<span class="movCont">
    <img src="assets/imgs/download.jpeg" alt="forGump" class="movImg">
    </span>
    <div class="movCont2">
    <span class="movTitle">Forrest Gump (1995)</span>
    <span class="movScore">5</span>
    </div>
    <span class="closer">x</span>`
    movList.append(newLi) */
    /* newLi.addEventListener('click', function (e) {  ///// solution 1 how to add event listener to every created newLi
        let tgt = e.target
        console.log(tgt);
        if (tgt.className !== 'closer') {
            return
        }
        tgt.parentElement.remove()
    }) */
    /* while (movList.childElementCount > 0) {
        for (const child of movList.children) {
            child.remove()


        }
    } */

    let curList = document.getElementsByTagName('li')
    let parList = document.getElementById('movList')
    while (movList.childElementCount > 0) {
        movList.removeChild(parList.firstChild)
    }
    if (movList.childElementCount == 0) {
        movList.style.visibility = 'hidden'
        movList.parentElement.prepend(welcome)
    }
    movListArr = []

})

movList.addEventListener('click', function (e) { ///////// solution 2 - event delegation
    let tgt = e.target
    console.log(tgt);
    if (tgt.className !== 'closer') {
        return
    }
    let toDel = tgt.parentElement.innerText
    movListArr.forEach(function (ele, index) {
        if (toDel.toLowerCase().includes(ele.title.toLowerCase())) {
            movListArr.splice(index, 1)
        }
    })
    console.log(movListArr);
    tgt.parentElement.remove()
    if (movList.childElementCount == 0) {
        movList.style.visibility = 'hidden'
        movList.parentElement.prepend(welcome)
    }

})

function sorter(direction) {
    let arr = movListArr
    let max1 = arr.length
    let compArr = []
    let sortedArr = []
    let dir
    for (let index = 0; index < max1; index++) {
        arr.forEach(ele => compArr.push(parseInt(ele.rating)))
        direction === 'high' ? dir = Math.max(...compArr) : dir = Math.min(...compArr)
        arr.forEach((ele, index) => {
            if (parseInt(ele.rating) === dir) {
                sortedArr.push(ele)
                arr.splice(index, 1)
            }
        });
        compArr = []
    }
    console.log(sortedArr);
    console.log(this);
    movListArr = [...sortedArr]
    redraw(sortedArr)
}

let miner = sorter.bind(this, 'low')
let maxer = sorter.bind(this, 'high')

sortBtnH.addEventListener('click', maxer)
sortBtnL.addEventListener('click', miner)

popup.children[0].addEventListener('click',(e)=>{
    popup.classList.add('hidden')
})

function redraw(arr) {
    /* while (movList.childElementCount > 0) {
        for (const child of movList.children) {
            child.remove()

        }
    } */
    let parList = document.getElementById('movList')
    let curList = document.getElementsByTagName('li') /// preco toto nefunguje stale??? to je "live" list
    while (movList.childElementCount > 0) {
        movList.removeChild(parList.firstChild)
    }
    /* for (const el of curList) {
        el.remove()
    } */
    for (const obj of arr) {
        createMov(obj)
    }
}

function createTemplates() {
    let tempArr = []
    tempArr.push({ order: 1, title: "Forrest Gump", url: "https://m.media-amazon.com/images/I/31M9F+VrAWL._AC_.jpg", rating: "4", year: "1994" },
        { order: 1, title: "The Big Lebowski", url: "https://i.pinimg.com/564x/94/c0/25/94c02573dec058d69b22512abd21f1ba.jpg", rating: "5", year: "1998" },
        { order: 1, title: "Ghost in the Shell", url: "https://d3tvwjfge35btc.cloudfront.net/Assets/39/608/L_p0151960839.jpg", rating: "3", year: "1995" }


    )
    const [forr, big, ghst] = tempArr
    createMov(forr)
    createMov(big)
    createMov(ghst)
    movListArr.push(forr, big, ghst)
    /* for (const obj of movListArr) {
        createMov(obj)
    } */
    hideTitle()
}
templates.addEventListener('click', createTemplates)
createTemplates()

/* movList.style.visibility = 'hidden' */


