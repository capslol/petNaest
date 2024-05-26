const nominals = [50, 100, 200,500,1000,2000,5000]

const atm = (amount: number, nominals: number[]) => {
    const sortedNominals = nominals.sort((a, b) => b - a)
    const result: string[] = []
    let sum = amount
    for (const nominal of sortedNominals) {
        const count = Math.floor(sum / nominal)
        sum = sum % nominal
        if (count > 0) {
            result.push(`${nominal}x${count}`)
        }
    }
    console.log('spring'.split(''))
    return result
}