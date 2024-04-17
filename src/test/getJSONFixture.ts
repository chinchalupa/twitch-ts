import fs from 'fs'

export function getJSONFixture(fp: string) {
    const fullPath = './fixtures/' + fp
    const data = fs.readFileSync(fullPath, 'utf8')
    return JSON.parse(data)
}
