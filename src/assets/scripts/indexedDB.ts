import { watch, nextTick, toRaw } from 'vue'

export class IndexedDB {
  constructor(
    public readonly name: string,
    public readonly alias?: string
  ) {}
  private DBList: [{ [name: string]: any }, string][] = []
  private hasDB = true
  db?: IDBDatabase

  private setWatch = (index: number) => {
    watch(this.DBList[index][0][this.DBList[index][1]], () => {
      nextTick(() => {
        this.updateDB(index)
      })
    })
  }

  private updateDB = (index: number) => {
    if (this.db) {
      this.db
        .transaction('data', 'readwrite')
        .objectStore('data')
        .put({
          id: index,
          data: JSON.parse(JSON.stringify(toRaw(this.DBList[index][0][this.DBList[index][1]])))
        })
    }
  }

  add = <T extends { [name: string]: any }, K extends keyof T & string>(obj: T, key: K) => {
    this.DBList.push([obj, key])
    return this
  }

  save = () => {
    return new Promise<void>((resolve, reject) => {
      try {
        console.log(`正在加${this.alias}数据库...`)
        const _db = window.indexedDB.open(this.name)
        _db.onsuccess = (event) => {
          this.db = (event.target as IDBOpenDBRequest).result
          if (this.hasDB) {
            for (const index in this.DBList) {
              this.db
                .transaction('data', 'readonly')
                .objectStore('data')
                .get(Number(index)).onsuccess = (e) => {
                try {
                  const data = (e.target as IDBRequest).result?.data
                  if (data) {
                    this.DBList[index][0][this.DBList[index][1]] = data
                  }
                } finally {
                  this.setWatch(Number(index))
                }
              }
            }
          } else {
            for (const index in this.DBList) {
              this.updateDB(Number(index))
              this.setWatch(Number(index))
            }
          }
          resolve()
        }

        _db.onupgradeneeded = (event) => {
          this.db = (event.target as IDBOpenDBRequest).result
          if (!this.db.objectStoreNames.contains('data')) {
            this.hasDB = false
            this.db.createObjectStore('data', { keyPath: 'id' })
          }
        }
      } catch (err) {
        reject(err)
      }
    })
  }
}
