import { StringUtils } from "./string-utils"

describe('String utils tests', () => {
    it('Should return the number with commas', () => {
        const numberWithCommas = StringUtils.formatNumber(1000)
        expect(numberWithCommas).toBe('1,000')
    })
    
    it('Should return the number with commas', () => {
        const numberWithCommas = StringUtils.formatAmount(1000)
        expect(numberWithCommas).toBe('Q. 1,000')
    })
})