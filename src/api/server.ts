import { json } from "stream/consumers";

let token = '5a9242a7ef76ff24d15627f2557d7478ab9575d29feddf78'


export const server_calls = {
    get: async () => {
        const response = await fetch(`https://whiskey-collection-app-js-ct.herokuapp.com/api/whiskies`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            }
        });
        if (!response.ok){
            throw new Error('Failed to fetch data from server')
        }
        return await response.json()
    },

    create: async(data: any= {}) => {
        const response = await fetch(`https://whiskey-collection-app-js-ct.herokuapp.com/api/whiskey`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        if(!response.ok){
            throw new Error('Failed to create new data on server')
        }
        return await response.json()
    },

    update: async (id:string, data:any = {}) => {
        const response = await fetch(`https://my-phonebook-codingtemple-js.herokuapp.com/api/contacts/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        return await response.json()
    },

    delete: async(id:string) => {
        const response = await fetch(`https://whiskey-collection-app-js-ct.herokuapp.com/api/whiskies/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            },
        });
        return await response.json()
    }
}
