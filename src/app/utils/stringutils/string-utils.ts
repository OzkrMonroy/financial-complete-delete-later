
 export class StringUtils {

    public static  formatNumber(number: number|string): string {
        const internationalNumberFormat = new Intl.NumberFormat('en-US')
        return internationalNumberFormat.format(Number(number || 0))
        }

    public static  formatAmount(number: number): string {
            let ingreso = 'Q. '+this.formatNumber(number);
            return ingreso
          }

    
  
    }  