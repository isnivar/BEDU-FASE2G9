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
    let expandMeal = document.createElement('a')
    expandMeal.className = 'btn btn-light';
    expandMeal.appendChild(document.createTextNode('See entire recipe'))
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(expandMeal);
    
    card.appendChild(cardBody);

    return card;
}