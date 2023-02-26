const prevTimestamps = {
    "daily": "Yesterday",
    "weekly": "Last Week",
    "monthly": "Last Month"
}

function generateItemCardList(currentID) {
    fetch('./data.json')
    .then((response) => response.json())
    .then((json) => {
        const itemCardList = document.getElementsByClassName("item-card-list")[0];
        let genItemContent = "";

        json.forEach(item => {
            genItemContent += 
            `<div class="card item-card" style="background: ${item.accentColor}">
                <div class="item-icon">
                    <img src="${item.iconSource}" alt="Icon">
                </div>
        
                <div class="card item-card-content">
                    <p class="item-name">${item.title}</p>
                    <p class="item-time">${item.timeframes[currentID].current}hrs</p>
                    <img src="./images/icon-ellipsis.svg" alt="More Info">
                    <p class="prev-item-time">${prevTimestamps[currentID]} - ${item.timeframes[currentID].previous}hrs</p>
                </div>
            </div>`;
        });
    
        itemCardList.innerHTML = genItemContent;
    });
}

function changeActiveFilter(currentID) {
    const buttonListFilter = Array.from(document.querySelectorAll(".timestamps-filter-button"));

    buttonListFilter.forEach(button => {
        if (button.id !== currentID) {
            button.setAttribute('aria-selected', 'false')
        } else {
            button.setAttribute('aria-selected', 'true');
        }
    });

    generateItemCardList(currentID);
}

// Generated for Current Filter
generateItemCardList("weekly");

// Add Event Listener for Filter Changes
const buttonListFilter = Array.from(document.querySelectorAll(".timestamps-filter-button"));
buttonListFilter.forEach(button => button.addEventListener('click', (event) => {
    let currentID = event.target.id;

    changeActiveFilter(currentID);
}));