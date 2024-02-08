// 
let page = 1;
let isLoading = false


async function fetchData(page) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`)

    const data = await response.json()

    console.log(data)
    return data;

}

function renderData(data) {

    const container = document.getElementById('content')

    data.forEach((item) => {
        const div = document.createElement('div')
        div.innerText = `data number is ${item.id}  ${item.title}`
        div.classList.add('item');
        container.appendChild(div)

    })
}

function handleScroll() {
    const container = document.getElementById('container')
    if (container.scrollTop + container.clientHeight >= container.scrollHeight && !isLoading) {
        isLoading = true
        document.getElementById('loading').style.display = 'block';

        fetchData(page).then(data => {
            renderData(data)
            isLoading = false,
                document.getElementById('loading').style.display = 'none'
        }).catch(err=>{console.log(err)})

    }

}
document.getElementById('container').addEventListener('scroll', handleScroll)

//initial data load

fetchData(page).then(data => {
    renderData(data); // data display kr rha hai window pe
    page++
}).catch(err => console.log("kuch gadbad ho gyi hai", err))


// !scrollTop represents the vertical scroll position of an element.
// ! clientHeight represents the visible height of an element's content area, including padding but excluding scrollbars, borders, and margins.
// !scrollHeight represents the total height of an element's content, including content that is not visible due to scrolling.