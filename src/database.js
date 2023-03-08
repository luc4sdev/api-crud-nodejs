import fs from 'node:fs/promises'

const databhasePath = new URL('../db.json', import.meta.url)

export class Database {
    #database = {}  

    constructor() { 
        fs.readFile(databhasePath, 'utf-8').then(data => {
            this.#database = JSON.parse(data)
        })
        .catch(() => {
            this.#persist()
        })
    }

    #persist() {
        fs.writeFile(databhasePath, JSON.stringify(this.#database))
    }

    select(table, search) {
        let data = this.#database[table] ?? []

        if(search) {
            data = data.filter(row => {
                return Object.entries(search).some(([key, value]) => {
                    return row[key].toLowerCase().includes(value.toLowerCase())
                })
            })
        }

        return data;
    }

    insert(table, data) {
        if(Array.isArray(this.#database[table])) {
            this.#database[table].push(data)
        }
        else {
            this.#database[table] = [data]
        }

        this.#persist()

        return data;
    }

    update(table, id, data) {
        const rowIndex = this.#database[table].findIndex(row => row.id === id)

        if(rowIndex > -1) {
            for (const [key, value] of Object.entries(data)) {
                if (key in this.#database[table][rowIndex]) {
                    this.#database[table][rowIndex][key] = value;
                }
              }
            this.#persist()
        }
    }


    delete(table, id) {
        const rowIndex = this.#database[table].findIndex(row => row.id === id)

        if(rowIndex > -1) {
            this.#database[table].splice(rowIndex, 1)
            this.#persist()
        }
    }
}