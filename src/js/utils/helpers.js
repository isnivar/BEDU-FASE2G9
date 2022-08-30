export const createCard = (src, title, id) => {
    //created the container of the card.
    let card = document.createElement('div');
    card.className = 'card m-3';
    // here we create the card header
    let cardHeader = document.createElement('img');
    cardHeader.className = 'card-img-top';
    cardHeader.src = src
    card.appendChild(cardHeader);
    //here we create the body of the card
    let cardBody = document.createElement('div');
    cardBody.className = 'card-body';
    let cardTitle = document.createElement('h5');
    cardTitle.className = 'card-title'
    cardTitle.appendChild(document.createTextNode(title));
    cardBody.appendChild(cardTitle);
    
    card.appendChild(cardBody);

    return card;
}

export function buildUrl(endpoint, param) {
    const baseUrl = "https://www.themealdb.com/api/json/v1/1/";
    if(param == null || param == ""){
        return baseUrl + endpoint + ".php";
    }
    return baseUrl + endpoint + ".php?" + param + "=";
  }