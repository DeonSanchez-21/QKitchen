
export const fetchData = async (url: string) => {
    const response = await fetch(url);
    const data = await response.json();

    return data;
}

export const postData = async (url: string, admin: {username: string, firstName: string, lastName: string, email: string}) => {
    
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(admin)
        });
        const data = await response.json();

        if( !response.ok){
            console.log(data.description);
            return
        }
        return data;
    } catch (error) {
        console.log(error)
    }
}

