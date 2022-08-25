export const getMealCategories = async () => {

    try {
        const url = 'https://www.themealdb.com/api/json/v1/1/categories.php';
        
        const response = await fetch(url);
        
        if(!response.ok || response.status !== 200){
            console.log(`status:${response.status}`);
            return null;
        }

        const { categories } = await response.json();
        console.log(categories)
        return categories;
    }catch(e){
        console.error(`Error: ${e}`);
        return null;
    }
}