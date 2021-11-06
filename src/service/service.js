

class Service {
    _url = "http://localhost:5000/"

    async getAllProducts() {

        const res = await fetch(`${this._url}api/products`)

        if (!res.ok) {
            throw new Error(`could not fetch "/api/products" , received ${res.status}`)
        }
        
        return await res.json()
    }
    
    async getProductById(id) {

        const res = await fetch(`${this._url}${id}`)

        if (!res.ok) {
            throw new Error(`could not fetch /${id}, received ${res.status}`)
        }
        
        return await res.json()
    }

    async deleteById(id) {

        const res = await fetch(`${this._url}deteleById/${id}`)

        if (!res.ok) {
            throw new Error(`could not fetch "${this._url}deteleById/" , received ${res.status}`)
        }
        
        return await res.json()
    }

    async updateById(req) {

        const res = await fetch(`${this._url}updateById`, req)

        if (!res.ok) {
            throw new Error(`could not fetch "http://127.0.0.1:5000/updateById/" , received ${res.status}`)
        }
        
        return await res.json()
    }

    
}

const service = new Service()

export default service